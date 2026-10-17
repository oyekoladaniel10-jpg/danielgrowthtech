import { createFileRoute } from "@tanstack/react-router";
import { auditRequestSchema, normalizeSiteInput, type AuditResponse } from "@/lib/site-audit-contract";

const MAX_BODY_BYTES = 4096;
const MAX_HTML_BYTES = 3_000_000;
const MAX_REDIRECTS = 4;
const REQUEST_TIMEOUT_MS = 9000;
const SCANNER_HEADERS = {
  Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
  "Accept-Language": "en;q=0.9",
  "User-Agent": "Mozilla/5.0 (compatible; DanielgrowthAudit/1.0; +https://danielgrowth.tech/audit)",
};

type HtmlPage = {
  url: URL;
  status: number;
  headers: Headers;
  html: string;
  bytes: number;
  truncated: boolean;
};

type Check = {
  category: "SEO" | "Technical" | "Accessibility" | "Security";
  title: string;
  detail: string;
  why?: string;
  recommendation?: string;
  evidence: string[];
  points: number;
  quality: number;
};

function short(value: string, max = 140): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function fileName(src: string): string {
  if (!src) return "(image with no src)";
  if (src.startsWith("data:")) return "(inline data image)";
  try {
    const path = new URL(src, "https://x.invalid").pathname;
    return short(decodeURIComponent(path.split("/").filter(Boolean).pop() ?? src), 90);
  } catch {
    return short(src, 90);
  }
}

function publicIpv4(address: string): boolean {
  const parts = address.split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) return false;
  const octets = parts.map(Number);
  if (octets.some((part) => part < 0 || part > 255)) return false;
  const [a, b, c] = octets;
  if (a === undefined || b === undefined || c === undefined) return false;
  if (a === 0 || a === 10 || a === 127 || a >= 224) return false;
  if (a === 100 && b !== undefined && b >= 64 && b <= 127) return false;
  if (a === 169 && b === 254) return false;
  if (a === 172 && b >= 16 && b <= 31) return false;
  if (a === 192 && (b === 168 || (b === 0 && c === 0) || (b === 0 && c === 2))) return false;
  if (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) return false;
  if (a === 203 && b === 0 && c === 113) return false;
  return true;
}

function publicIpv6(address: string): boolean {
  const value = address.toLowerCase().split("%")[0];
  if (!value || !value.includes(":")) return false;
  if (value.startsWith("::ffff:")) {
    const mapped = value.slice(7);
    return mapped.includes(".") ? publicIpv4(mapped) : false;
  }
  // Only globally allocated unicast space; deny unspecified, loopback,
  // unique-local, link-local, multicast, documentation, and transition ranges.
  const first = Number.parseInt(value.split(":")[0] ?? "", 16);
  if (!Number.isFinite(first) || first < 0x2000 || first > 0x3fff) return false;
  if (value.startsWith("2001:db8:") || value.startsWith("2002:")) return false;
  return true;
}

function isPublicAddress(address: string): boolean {
  const value = address.trim().replace(/^\[|\]$/g, "");
  return value.includes(":") ? publicIpv6(value) : publicIpv4(value);
}

function validSiteUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (!(["http:", "https:"].includes(url.protocol))) return null;
    if (url.username || url.password || url.port) return null;
    if (!hostname.includes(".") || hostname.length > 253) return null;
    if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local") || hostname.endsWith(".internal")) return null;
    // Do not permit literal IPs (including non-canonical numeric forms).
    if (/^[0-9.]+$/.test(hostname) || hostname.includes(":")) return null;
    if (hostname.split(".").some((label) => !label || label.length > 63 || label.startsWith("-") || label.endsWith("-"))) return null;
    return url;
  } catch {
    return null;
  }
}

async function hostnameResolvesPublicly(hostname: string): Promise<boolean> {
  try {
    const answers = await Promise.all(["A", "AAAA"].map(async (type) => {
      const dnsUrl = new URL("https://cloudflare-dns.com/dns-query");
      dnsUrl.searchParams.set("name", hostname);
      dnsUrl.searchParams.set("type", type);
      const response = await fetch(dnsUrl, {
        headers: { Accept: "application/dns-json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error("DNS lookup unavailable");
      const result = (await response.json()) as { Answer?: Array<{ data?: string }> };
      return (result.Answer ?? []).map((answer) => answer.data).filter((item): item is string => Boolean(item));
    }));
    const addresses = answers.flat();
    return addresses.length > 0 && addresses.every(isPublicAddress);
  } catch {
    return false;
  }
}

// Very large pages are read up to the cap and analysed from what was read, rather than rejected.
async function readBoundedText(response: Response, maxBytes: number): Promise<{ text: string; bytes: number; truncated: boolean }> {
  if (!response.body) return { text: "", bytes: 0, truncated: false };
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  let truncated = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const remaining = maxBytes - size;
      if (value.byteLength >= remaining) {
        text += decoder.decode(value.subarray(0, remaining), { stream: true });
        size = maxBytes;
        truncated = true;
        await reader.cancel().catch(() => undefined);
        break;
      }
      size += value.byteLength;
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return { text, bytes: size, truncated };
  } finally {
    reader.releaseLock();
  }
}

async function fetchPublicPage(input: URL, expectedOrigin: string): Promise<HtmlPage> {
  let current = new URL(input);
  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    if (current.origin !== expectedOrigin || !validSiteUrl(current.toString())) {
      throw new Error("This website redirects outside its own domain. Enter its final public URL and try again.");
    }
    if (!(await hostnameResolvesPublicly(current.hostname))) {
      throw new Error("This domain did not resolve to a public website, so it cannot be scanned safely.");
    }
    let response: Response;
    try {
      response = await fetch(current, {
        redirect: "manual",
        headers: SCANNER_HEADERS,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch {
      throw new Error("The website took too long to respond or refused the connection. Please try again in a minute.");
    }
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location || redirects === MAX_REDIRECTS) throw new Error("The website redirected too many times to scan.");
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) {
      await response.body?.cancel();
      if ([401, 403, 429, 503].includes(response.status)) {
        throw new Error(`This website's firewall blocked our scanner (status ${response.status}). Wait a minute and try again, or ask Daniel for a manual audit.`);
      }
      throw new Error(`The website returned status ${response.status} and could not be inspected.`);
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
      await response.body?.cancel();
      throw new Error("That address did not return a readable web page. Enter the public homepage URL.");
    }
    const { text, bytes, truncated } = await readBoundedText(response, MAX_HTML_BYTES);
    return { url: current, status: response.status, headers: response.headers, html: text, bytes, truncated };
  }
  throw new Error("The website could not be reached safely.");
}

function decodeEntities(text: string): string {
  return text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (match, entity: string) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return ({ amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" } as Record<string, string>)[entity.toLowerCase()] ?? match;
  });
}

function attr(tag: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(new RegExp(`\\b${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return decodeEntities(match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim();
}

function textContent(html: string): string {
  return decodeEntities(html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " "));
}

function firstMeta(html: string, key: "name" | "property", value: string): string {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (attr(tag, key).toLowerCase() === value.toLowerCase()) return attr(tag, "content");
  }
  return "";
}

function pageInfo(page: HtmlPage) {
  const title = decodeEntities(page.html.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] ?? "").replace(/<[^>]*>/g, " ").trim();
  const h1Count = (page.html.match(/<h1\b[^>]*>/gi) ?? []).length;
  const h1Texts = Array.from(page.html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi), (match) => short(textContent(match[1] ?? ""), 120)).filter(Boolean);
  const images = page.html.match(/<img\b[^>]*>/gi) ?? [];
  const missingAltTags = images.filter((tag) => !/\balt\s*=/.test(tag));
  const imagesMissingAlt = missingAltTags.length;
  const missingAltFiles = missingAltTags.map((tag) => fileName(attr(tag, "src") || attr(tag, "data-src")));
  const headingList = Array.from(page.html.matchAll(/<h([1-6])\b[^>]*>/gi), (match) => Number(match[1]));
  const skippedHeadingLevels = headingList.some((level, index) => index > 0 && level > (headingList[index - 1] ?? level) + 1);
  const unlabeledTags = [
    ...(page.html.match(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi) ?? []),
    ...(page.html.match(/<button\b[^>]*>[\s\S]*?<\/button\s*>/gi) ?? []),
  ].filter((tag) => !attr(tag, "aria-label") && !attr(tag, "title") && !/<img\b[^>]*\balt\s*=\s*["'][^"']+/i.test(tag) && !textContent(tag).trim());
  const unlabeledControls = unlabeledTags.length;
  const unlabeledExamples = unlabeledTags.map((tag) => {
    const opening = tag.match(/^<(a|button)\b[^>]*>/i)?.[0] ?? "";
    const href = attr(opening, "href");
    return /^<a/i.test(tag) ? `Link with no text → ${short(href || "(no href)", 90)}` : `Button with no text${attr(opening, "class") ? ` (class "${short(attr(opening, "class"), 50)}")` : ""}`;
  });
  const visibleText = textContent(page.html).trim();
  const canonicalTag = (page.html.match(/<link\b[^>]*\brel\s*=\s*(?:"canonical"|'canonical'|canonical)[^>]*>/i) ?? [""])[0];
  const canonical = attr(canonicalTag, "href");
  const imagesWithAlt = images.length - imagesMissingAlt;
  const description = firstMeta(page.html, "name", "description");
  const wordCount = visibleText.split(/\s+/).filter(Boolean).length;
  const links: URL[] = [];
  for (const tag of page.html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = attr(tag, "href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^javascript:/i.test(href)) continue;
    try {
      const link = new URL(href, page.url);
      if (link.origin === page.url.origin && validSiteUrl(link.origin + link.pathname) && ["http:", "https:"].includes(link.protocol)) {
        link.hash = "";
        link.search = "";
        if (!/\.(?:pdf|jpe?g|png|gif|webp|svg|css|js|xml|zip|mp4|webm)$/i.test(link.pathname)) links.push(link);
      }
    } catch { /* Ignore malformed page links. */ }
  }
  return {
    title,
    description,
    h1Count,
    h1Texts,
    images: images.length,
    imagesWithAlt,
    imagesMissingAlt,
    missingAltFiles,
    wordCount,
    textSample: short(visibleText, 220),
    lang: attr(page.html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang"),
    viewport: Boolean(firstMeta(page.html, "name", "viewport")),
    viewportContent: firstMeta(page.html, "name", "viewport"),
    canonical,
    canonicalIsSameHost: canonical ? (() => { try { return new URL(canonical, page.url).host === page.url.host; } catch { return false; } })() : false,
    ogTitle: firstMeta(page.html, "property", "og:title"),
    ogDescription: firstMeta(page.html, "property", "og:description"),
    hasOpenGraph: Boolean(firstMeta(page.html, "property", "og:title") && firstMeta(page.html, "property", "og:description")),
    robotsMeta: firstMeta(page.html, "name", "robots"),
    isNoindex: /\bnoindex\b/i.test(firstMeta(page.html, "name", "robots")),
    hasMain: /<main\b/i.test(page.html) || /\brole\s*=\s*["']main["']/i.test(page.html),
    headingOutline: headingList.slice(0, 12).map((level) => `H${level}`).join(" → "),
    skippedHeadingLevels,
    unlabeledControls,
    unlabeledExamples,
    links,
  };
}

function ratio(value: number): number {
  return Math.max(0, Math.min(1, value));
}

async function endpointAvailable(url: URL): Promise<boolean> {
  try {
    const page = await fetchPublicPage(url, url.origin);
    return page.status >= 200 && page.status < 300;
  } catch {
    return false;
  }
}

async function inspectSite(startUrl: URL): Promise<AuditResponse> {
  const first = await fetchPublicPage(startUrl, startUrl.origin);
  const firstInfo = pageInfo(first);
  const paths = firstInfo.links
    .filter((url, index, items) => items.findIndex((item) => item.pathname === url.pathname) === index)
    .sort((a, b) => {
      const preferred = (path: string) => /about|service|product|shop|contact|pricing|collection/i.test(path) ? 0 : 1;
      return preferred(a.pathname) - preferred(b.pathname);
    });
  const sampleUrls = paths.slice(0, 2);
  const sampled = await Promise.all(sampleUrls.map(async (url) => {
    try { return await fetchPublicPage(url, first.url.origin); } catch { return null; }
  }));
  const pages = [first, ...sampled.filter((page): page is HtmlPage => Boolean(page))];
  const infos = pages.map(pageInfo);
  const robotUrl = new URL("/robots.txt", first.url.origin);
  const sitemapUrl = new URL("/sitemap.xml", first.url.origin);
  const [robotsFound, sitemapFound] = await Promise.all([
    endpointAvailable(robotUrl), endpointAvailable(sitemapUrl),
  ]);
  const header = (name: string) => first.headers.get(name);
  const headerEvidence = (name: string) => `${name}: ${header(name) ? short(header(name) ?? "", 160) : "not sent"}`;
  const hsts = first.headers.has("strict-transport-security");
  const csp = first.headers.has("content-security-policy");
  const frameProtection = first.headers.has("x-frame-options") || csp;
  const nosniff = (header("x-content-type-options") ?? "").toLowerCase() === "nosniff";
  const referrerPolicy = first.headers.has("referrer-policy");
  const permissionsPolicy = first.headers.has("permissions-policy");
  const all = infos.length;
  const label = (index: number) => index === 0 ? "Homepage" : (pages[index]?.url.pathname ?? `Page ${index + 1}`);
  const titleCoverage = infos.filter((info) => info.title.length >= 15 && info.title.length <= 70).length;
  const descriptionCoverage = infos.filter((info) => info.description.length >= 50 && info.description.length <= 170).length;
  const titleSet = infos.map((info) => info.title.toLowerCase()).filter(Boolean);
  const noDuplicateTitles = new Set(titleSet).size === titleSet.length;
  const canonicalCount = infos.filter((info) => info.canonical && info.canonicalIsSameHost).length;
  const contentType = header("content-type") ?? "";
  const utf8 = /charset\s*=\s*utf-?8/i.test(contentType) || /<meta\b[^>]*charset\s*=\s*["']?utf-8/i.test(first.html);
  const cleanHeadingPages = infos.filter((info) => !info.skippedHeadingLevels).length;

  const checks: Check[] = [
    {
      category: "SEO", title: "Page titles", points: 9,
      quality: ratio(titleCoverage / Math.max(all, 1)) * (noDuplicateTitles ? 1 : 0.7),
      detail: `${titleCoverage} of ${all} inspected pages have a descriptive title between 15 and 70 characters.${noDuplicateTitles ? " No duplicate titles were found." : " Duplicate titles were found."}`,
      why: "The title is the blue headline people click in Google. Weak or repeated titles lose clicks to competitors.",
      recommendation: "Give every important page a unique title that names the product or service and your brand.",
      evidence: infos.map((info, index) => `${label(index)}: ${info.title ? `"${short(info.title, 110)}" (${info.title.length} characters)` : "no <title> found"}`),
    },
    {
      category: "SEO", title: "Meta descriptions", points: 8,
      quality: ratio(descriptionCoverage / Math.max(all, 1)),
      detail: `${descriptionCoverage} of ${all} inspected pages have a meta description in a useful length range (50–170 characters).`,
      why: "This is the grey text under your Google result. Without it, Google picks random text from the page.",
      recommendation: "Write a distinct, persuasive summary for each key page.",
      evidence: infos.map((info, index) => `${label(index)}: ${info.description ? `"${short(info.description, 150)}" (${info.description.length} characters)` : "no meta description found"}`),
    },
    {
      category: "SEO", title: "Main page heading", points: 6,
      quality: firstInfo.h1Count === 1 ? 1 : firstInfo.h1Count === 0 ? 0 : 0.5,
      detail: `${firstInfo.h1Count === 1 ? "The homepage has one" : `The homepage has ${firstInfo.h1Count}`} H1 heading${firstInfo.h1Count === 1 ? "" : "s"}.`,
      why: "The H1 tells search engines and visitors what the page is about. Zero or several H1s blur that message.",
      recommendation: "Use one clear H1 for the main subject of each page.",
      evidence: firstInfo.h1Texts.length ? firstInfo.h1Texts.slice(0, 6).map((text, index) => `H1 #${index + 1}: "${text}"`) : ["No <h1> tag was found in the homepage HTML."],
    },
    {
      category: "SEO", title: "Canonical links", points: 4,
      quality: ratio(canonicalCount / Math.max(all, 1)),
      detail: `${canonicalCount} of ${all} inspected pages declare a canonical URL on this website.`,
      why: "Without a canonical link, Google can split ranking power between duplicate versions of the same page.",
      recommendation: "Add a self-referencing canonical link to each indexable page.",
      evidence: infos.map((info, index) => `${label(index)}: ${info.canonical ? short(info.canonical, 140) : "no canonical tag"}`),
    },
    {
      category: "SEO", title: "Social sharing details", points: 4,
      quality: firstInfo.hasOpenGraph ? 1 : 0,
      detail: firstInfo.hasOpenGraph ? "The homepage declares Open Graph title and description tags." : "One or both core Open Graph tags are missing on the homepage.",
      why: "When your link is shared on WhatsApp, Facebook or LinkedIn, these tags control the preview people see.",
      recommendation: "Add og:title, og:description and og:image so shared links look professional.",
      evidence: [`og:title: ${firstInfo.ogTitle ? `"${short(firstInfo.ogTitle, 120)}"` : "missing"}`, `og:description: ${firstInfo.ogDescription ? `"${short(firstInfo.ogDescription, 140)}"` : "missing"}`],
    },
    {
      category: "SEO", title: "Indexing directives", points: 4,
      quality: firstInfo.isNoindex ? 0 : 1,
      detail: firstInfo.isNoindex ? "The homepage asks search engines not to index it." : "No homepage noindex directive was found in the HTML.",
      why: "A noindex tag hides the page from Google completely.",
      recommendation: firstInfo.isNoindex ? "Remove noindex if this page should appear in search." : undefined,
      evidence: [`<meta name="robots">: ${firstInfo.robotsMeta ? `"${short(firstInfo.robotsMeta, 100)}"` : "not set (search engines may index)"}`],
    },
    {
      category: "SEO", title: "Sitemap and crawl guide", points: 5,
      quality: (Number(robotsFound) + Number(sitemapFound)) / 2,
      detail: `robots.txt: ${robotsFound ? "reachable" : "not found"}; sitemap.xml: ${sitemapFound ? "reachable" : "not found"}.`,
      why: "A sitemap helps Google discover all your products and pages faster.",
      recommendation: "Publish a robots.txt and an XML sitemap that lists your public pages.",
      evidence: [`${robotUrl.toString()} → ${robotsFound ? "found" : "not found"}`, `${sitemapUrl.toString()} → ${sitemapFound ? "found" : "not found"}`],
    },
    {
      category: "Technical", title: "Secure connection", points: 8,
      quality: first.url.protocol === "https:" ? 1 : 0,
      detail: first.url.protocol === "https:" ? "The inspected homepage loads over HTTPS." : "The inspected homepage is not using HTTPS.",
      why: "Browsers show a 'Not secure' warning on HTTP sites, which scares away buyers.",
      recommendation: "Serve every page over HTTPS and redirect HTTP traffic to it.",
      evidence: [`Final address loaded: ${short(first.url.toString(), 160)}`],
    },
    {
      category: "Technical", title: "Mobile viewport", points: 6,
      quality: firstInfo.viewport ? 1 : 0,
      detail: firstInfo.viewport ? "The homepage declares a mobile viewport." : "No mobile viewport declaration was found on the homepage.",
      why: "Most shoppers browse on phones. Without this tag the page looks tiny and zoomed-out on mobile.",
      recommendation: "Add a responsive viewport meta tag so pages fit mobile screens.",
      evidence: [`<meta name="viewport">: ${firstInfo.viewportContent ? `"${short(firstInfo.viewportContent, 120)}"` : "missing"}`],
    },
    {
      category: "Technical", title: "Page weight and encoding", points: 5,
      quality: (utf8 ? 0.5 : 0.25) + (first.bytes <= 1_000_000 ? 0.5 : first.bytes <= 2_000_000 ? 0.25 : 0),
      detail: `The homepage HTML is about ${Math.round(first.bytes / 1024).toLocaleString()} KB${first.truncated ? " or more (very heavy)" : ""}${utf8 ? " with UTF-8 declared" : "; UTF-8 was not explicitly detected"}.`,
      why: "Heavy HTML slows the first load on mobile data, and slow pages lose visitors before they see anything.",
      recommendation: "Trim inline scripts, apps and page-builder code so the HTML stays under about 1 MB.",
      evidence: [`HTML downloaded: ${Math.round(first.bytes / 1024).toLocaleString()} KB${first.truncated ? " (stopped reading at the 3 MB limit)" : ""}`, `Content-Type header: ${contentType ? short(contentType, 120) : "not sent"}`],
    },
    {
      category: "Technical", title: "Useful page content", points: 4,
      quality: firstInfo.wordCount >= 100 ? 1 : firstInfo.wordCount >= 40 ? 0.5 : 0,
      detail: `The homepage contains approximately ${firstInfo.wordCount.toLocaleString()} visible words.`,
      why: "Search engines rank pages by what they say. Very little text gives them little to rank you for.",
      recommendation: "Make sure the page clearly explains what you sell, who it is for, and why to choose you.",
      evidence: firstInfo.textSample ? [`First visible text: "${firstInfo.textSample}"`] : ["No readable text was found in the HTML."],
    },
    {
      category: "Accessibility", title: "Language declaration", points: 4,
      quality: firstInfo.lang ? 1 : 0,
      detail: firstInfo.lang ? `The document declares its language (${firstInfo.lang}).` : "The homepage does not declare a document language.",
      why: "Screen readers and translation tools use this to read the page correctly.",
      recommendation: "Set the correct lang attribute on the page's html element.",
      evidence: [firstInfo.lang ? `<html lang="${short(firstInfo.lang, 20)}">` : "<html> tag has no lang attribute"],
    },
    {
      category: "Accessibility", title: "Alternative text for images", points: 8,
      quality: firstInfo.images ? ratio(firstInfo.imagesWithAlt / firstInfo.images) : 0.5,
      detail: firstInfo.images ? `${firstInfo.imagesWithAlt} of ${firstInfo.images} homepage images include an alt attribute.` : "No images were detected in the homepage HTML.",
      why: "Google Images and blind visitors rely on alt text. Missing alt text means lost image search traffic.",
      recommendation: "Describe meaningful images (especially products) with alt text; use empty alt for decorative ones.",
      evidence: firstInfo.missingAltFiles.length
        ? [...firstInfo.missingAltFiles.slice(0, 6).map((file) => `No alt text: ${file}`), ...(firstInfo.missingAltFiles.length > 6 ? [`…and ${firstInfo.missingAltFiles.length - 6} more images`] : [])]
        : [firstInfo.images ? "Every homepage image has an alt attribute." : "No <img> tags found."],
    },
    {
      category: "Accessibility", title: "Main content landmark", points: 4,
      quality: firstInfo.hasMain ? 1 : 0,
      detail: firstInfo.hasMain ? "A main content landmark was detected." : "No main content landmark was detected in the homepage HTML.",
      why: "It lets keyboard and screen-reader users jump straight to your content.",
      recommendation: "Wrap the primary page content in a main element.",
      evidence: [firstInfo.hasMain ? "Found <main> (or role=\"main\") in the HTML." : "Searched the HTML for <main> and role=\"main\" — neither found."],
    },
    {
      category: "Accessibility", title: "Heading and control clarity", points: 4,
      quality: ratio(cleanHeadingPages / Math.max(all, 1)) * (firstInfo.unlabeledControls === 0 ? 1 : 0.5),
      detail: `${cleanHeadingPages} of ${all} sampled pages have headings in order; ${firstInfo.unlabeledControls} homepage links or buttons have no readable label.`,
      why: "Icon-only buttons with no label are invisible to screen readers and to Google.",
      recommendation: "Keep headings in order and give every link and button a text or aria-label.",
      evidence: [
        ...(firstInfo.headingOutline ? [`Homepage heading order: ${firstInfo.headingOutline}`] : []),
        ...firstInfo.unlabeledExamples.slice(0, 5),
      ],
    },
    {
      category: "Security", title: "Transport security policy", points: 4,
      quality: hsts ? 1 : 0,
      detail: `Strict-Transport-Security ${hsts ? "is present" : "was not detected"}.`,
      why: "It forces browsers to always use the secure version of your site.",
      recommendation: "Add a Strict-Transport-Security header after confirming all subdomains support HTTPS.",
      evidence: [headerEvidence("strict-transport-security")],
    },
    {
      category: "Security", title: "Content and frame protection", points: 4,
      quality: (Number(csp) + Number(frameProtection)) / 2,
      detail: `Content-Security-Policy ${csp ? "is present" : "was not detected"}; clickjacking protection ${frameProtection ? "is present" : "was not detected"}.`,
      why: "These headers block injected scripts and stop other sites from secretly framing your checkout.",
      recommendation: "Add an appropriate Content-Security-Policy and frame protection header.",
      evidence: [headerEvidence("content-security-policy"), headerEvidence("x-frame-options")],
    },
    {
      category: "Security", title: "Response hardening", points: 3,
      quality: (Number(nosniff) + Number(referrerPolicy) + Number(permissionsPolicy)) / 3,
      detail: `X-Content-Type-Options: nosniff ${nosniff ? "is present" : "was not detected"}; Referrer-Policy ${referrerPolicy ? "is present" : "was not detected"}; Permissions-Policy ${permissionsPolicy ? "is present" : "was not detected"}.`,
      why: "Small headers that close common browser attack routes.",
      recommendation: "Add nosniff, Referrer-Policy, and Permissions-Policy response headers.",
      evidence: [headerEvidence("x-content-type-options"), headerEvidence("referrer-policy"), headerEvidence("permissions-policy")],
    },
  ];
  const score = Math.max(0, Math.min(100, Math.round(checks.reduce((sum, check) => sum + check.points * check.quality, 0))));
  const findings = checks.map(({ category, title, detail, why, recommendation, evidence, points, quality }) => ({
    category,
    status: quality >= 0.9 ? "good" as const : quality >= 0.5 ? "warning" as const : "issue" as const,
    title,
    detail,
    evidence: evidence.slice(0, 8).map((item) => short(item, 290)),
    pointsLost: Math.round(points * (1 - quality) * 10) / 10,
    ...(quality < 0.9 && why ? { why } : {}),
    ...(quality < 0.9 && recommendation ? { recommendation } : {}),
  }));
  const openedSamples = sampled.filter(Boolean).length;
  const steps = [
    ...(first.url.toString() !== startUrl.toString() ? [`Followed redirect from ${short(startUrl.toString(), 100)} to ${short(first.url.toString(), 100)}`] : []),
    ...pages.map((page, index) => `Downloaded ${index === 0 ? "homepage" : label(index)} — status ${page.status}, ${Math.round(page.bytes / 1024).toLocaleString()} KB of HTML${page.truncated ? " (read first 3 MB)" : ""}`),
    ...(sampleUrls.length > openedSamples ? [`${sampleUrls.length - openedSamples} linked page(s) could not be opened`] : []),
    `Checked robots.txt (${robotsFound ? "found" : "not found"}) and sitemap.xml (${sitemapFound ? "found" : "not found"})`,
    `Read ${[...first.headers.keys()].length} response headers from the homepage`,
    `Counted ${infos.reduce((sum, info) => sum + info.images, 0)} images, ${infos.reduce((sum, info) => sum + info.h1Count, 0)} H1 headings and ${infos.reduce((sum, info) => sum + info.wordCount, 0).toLocaleString()} words across ${pages.length} page${pages.length === 1 ? "" : "s"}`,
    `Ran ${checks.length} checks across SEO, technical, accessibility and security`,
  ];
  const summary = score >= 90 ? "Strong public-page foundations" : score >= 75 ? "A solid start with room to improve" : score >= 50 ? "Several improvements could help" : "Important foundations need attention";
  return {
    score,
    summary,
    host: first.url.host,
    finalUrl: first.url.toString(),
    steps,
    pagesAudited: pages.length,
    checkedAt: new Date().toISOString(),
    findings,
    pages: pages.map((page, index) => ({
      url: page.url.toString(),
      status: page.status,
      title: infos[index]?.title ?? "",
      description: infos[index]?.description ?? "",
      h1Count: infos[index]?.h1Count ?? 0,
      imageCount: infos[index]?.images ?? 0,
      imagesMissingAlt: infos[index]?.imagesMissingAlt ?? 0,
      wordCount: infos[index]?.wordCount ?? 0,
      sizeKb: Math.round(page.bytes / 1024),
    })),
  } satisfies AuditResponse;
}

export const Route = createFileRoute("/api/audit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length"));
        if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
          return Response.json({ error: "That request is too large. Please submit one website URL." }, { status: 413 });
        }
        const rawBody = await request.text();
        if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
          return Response.json({ error: "That request is too large. Please submit one website URL." }, { status: 413 });
        }
        let body: unknown;
        try { body = JSON.parse(rawBody); } catch {
          return Response.json({ error: "Please enter a valid website URL." }, { status: 400 });
        }
        const parsed = auditRequestSchema.safeParse(body);
        if (!parsed.success) return Response.json({ error: "Please enter a valid website URL." }, { status: 400 });
        if (parsed.data.websiteTrap) return Response.json({ error: "Please submit a website URL." }, { status: 400 });
        const target = validSiteUrl(normalizeSiteInput(parsed.data.url));
        if (!target) {
          return Response.json({ error: "Please enter a valid public website address, for example yourstore.com" }, { status: 400 });
        }
        try {
          const result = await inspectSite(target);
          return Response.json(result, {
            headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
          });
        } catch (error) {
          const safeMessage = error instanceof Error && error.message
            ? error.message
            : "We couldn't read that website right now. Check the URL and try again.";
          return Response.json({ error: safeMessage }, { status: 422, headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});
