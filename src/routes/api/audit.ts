import { createFileRoute } from "@tanstack/react-router";
import { auditRequestSchema, type AuditResponse } from "@/lib/site-audit-contract";

const MAX_BODY_BYTES = 4096;
const MAX_HTML_BYTES = 500_000;
const MAX_REDIRECTS = 3;
const REQUEST_TIMEOUT_MS = 6500;

type HtmlPage = {
  url: URL;
  status: number;
  headers: Headers;
  html: string;
};

type Check = {
  category: "SEO" | "Technical" | "Accessibility" | "Security";
  title: string;
  detail: string;
  recommendation?: string;
  points: number;
  quality: number;
};

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

async function readBoundedText(response: Response, maxBytes: number): Promise<string> {
  const length = Number(response.headers.get("content-length"));
  if (Number.isFinite(length) && length > maxBytes) throw new Error("The website page is larger than this free scan can inspect.");
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    while (size <= maxBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new Error("The website page is larger than this free scan can inspect.");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return text;
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
    const response = await fetch(current, {
      redirect: "manual",
      headers: { Accept: "text/html,application/xhtml+xml;q=0.9" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location || redirects === MAX_REDIRECTS) throw new Error("The website redirected too many times to scan.");
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(`The website returned status ${response.status} and could not be inspected.`);
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
      await response.body?.cancel();
      throw new Error("That address did not return a readable web page. Enter the public homepage URL.");
    }
    const html = await readBoundedText(response, MAX_HTML_BYTES);
    return { url: current, status: response.status, headers: response.headers, html };
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
  const images = page.html.match(/<img\b[^>]*>/gi) ?? [];
  const imagesMissingAlt = images.filter((tag) => !/\balt\s*=/.test(tag)).length;
  const headings = Array.from(page.html.matchAll(/<h([1-6])\b[^>]*>/gi), (match) => Number(match[1]));
  const skippedHeadingLevels = headings.some((level, index) => index > 0 && level > (headings[index - 1] ?? level) + 1);
  const unlabeledControls = [
    ...(page.html.match(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi) ?? []),
    ...(page.html.match(/<button\b[^>]*>[\s\S]*?<\/button\s*>/gi) ?? []),
  ].filter((tag) => !attr(tag, "aria-label") && !attr(tag, "title") && !textContent(tag).trim()).length;
  const canonicalTag = (page.html.match(/<link\b[^>]*\brel\s*=\s*(?:"canonical"|'canonical'|canonical)[^>]*>/i) ?? [""])[0];
  const canonical = attr(canonicalTag, "href");
  const imagesWithAlt = images.length - imagesMissingAlt;
  const description = firstMeta(page.html, "name", "description");
  const wordCount = textContent(page.html).split(/\s+/).filter(Boolean).length;
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
    images: images.length,
    imagesWithAlt,
    imagesMissingAlt,
    wordCount,
    lang: attr(page.html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang"),
    viewport: Boolean(firstMeta(page.html, "name", "viewport")),
    canonical,
    canonicalIsSameHost: canonical ? (() => { try { return new URL(canonical, page.url).host === page.url.host; } catch { return false; } })() : false,
    hasOpenGraph: Boolean(firstMeta(page.html, "property", "og:title") && firstMeta(page.html, "property", "og:description")),
    isNoindex: /\bnoindex\b/i.test(firstMeta(page.html, "name", "robots")),
    hasMain: /<main\b/i.test(page.html) || /\brole\s*=\s*["']main["']/i.test(page.html),
    skippedHeadingLevels,
    unlabeledControls,
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
  const hsts = first.headers.has("strict-transport-security");
  const csp = first.headers.has("content-security-policy");
  const frameProtection = first.headers.has("x-frame-options") || csp;
  const nosniff = (first.headers.get("x-content-type-options") ?? "").toLowerCase() === "nosniff";
  const referrerPolicy = first.headers.has("referrer-policy");
  const permissionsPolicy = first.headers.has("permissions-policy");
  const all = infos.length;
  const titleCoverage = infos.filter((info) => info.title.length >= 15 && info.title.length <= 70).length;
  const descriptionCoverage = infos.filter((info) => info.description.length >= 50 && info.description.length <= 170).length;
  const titleSet = infos.map((info) => info.title.toLowerCase()).filter(Boolean);
  const noDuplicateTitles = new Set(titleSet).size === titleSet.length;
  const checks: Check[] = [
    { category: "SEO", title: "Page titles", detail: `${titleCoverage} of ${all} inspected pages have a descriptive title between 15 and 70 characters.${noDuplicateTitles ? " No duplicate titles were found in the sample." : " Similar page titles were found in the sample."}`, recommendation: "Give every important page a unique title that describes its topic and brand.", points: 9, quality: ratio(titleCoverage / Math.max(all, 1)) * (noDuplicateTitles ? 1 : 0.7) },
    { category: "SEO", title: "Meta descriptions", detail: `${descriptionCoverage} of ${all} inspected pages have a meta description in a useful length range.`, recommendation: "Write a distinct, accurate summary for each key page.", points: 8, quality: ratio(descriptionCoverage / Math.max(all, 1)) },
    { category: "SEO", title: "Main page heading", detail: `${firstInfo.h1Count === 1 ? "The homepage has one" : `The homepage has ${firstInfo.h1Count}`} H1 heading${firstInfo.h1Count === 1 ? "" : "s"}.`, recommendation: "Use one clear H1 for the main subject of each page.", points: 6, quality: firstInfo.h1Count === 1 ? 1 : firstInfo.h1Count === 0 ? 0 : 0.5 },
    { category: "SEO", title: "Canonical links", detail: `${infos.filter((info) => info.canonical && info.canonicalIsSameHost).length} of ${all} inspected pages declare a canonical URL on this website.`, recommendation: "Add a self-referencing canonical link to each indexable page.", points: 4, quality: ratio(infos.filter((info) => info.canonical && info.canonicalIsSameHost).length / Math.max(all, 1)) },
    { category: "SEO", title: "Social sharing details", detail: firstInfo.hasOpenGraph ? "The homepage declares Open Graph title and description tags." : "One or both core Open Graph tags are missing on the homepage.", recommendation: "Add og:title and og:description so shared links have useful previews.", points: 4, quality: firstInfo.hasOpenGraph ? 1 : 0 },
    { category: "SEO", title: "Indexing directives", detail: firstInfo.isNoindex ? "The homepage asks search engines not to index it." : "No homepage noindex directive was found in the HTML.", recommendation: firstInfo.isNoindex ? "Remove noindex only if this page is intended to appear in search." : undefined, points: 4, quality: firstInfo.isNoindex ? 0 : 1 },
    { category: "SEO", title: "Sitemap and crawl guide", detail: `robots.txt: ${robotsFound ? "reachable" : "not found"}; sitemap.xml: ${sitemapFound ? "reachable" : "not found"}.`, recommendation: "Publish a robots.txt and an XML sitemap that lists your public pages.", points: 5, quality: (Number(robotsFound) + Number(sitemapFound)) / 2 },
    { category: "Technical", title: "Secure connection", detail: first.url.protocol === "https:" ? "The inspected homepage loads over HTTPS." : "The inspected homepage is not using HTTPS.", recommendation: "Serve every page over HTTPS and redirect HTTP traffic to it.", points: 8, quality: first.url.protocol === "https:" ? 1 : 0 },
    { category: "Technical", title: "Mobile viewport", detail: firstInfo.viewport ? "The homepage declares a mobile viewport." : "No mobile viewport declaration was found on the homepage.", recommendation: "Add a responsive viewport meta tag so pages fit mobile screens.", points: 6, quality: firstInfo.viewport ? 1 : 0 },
    { category: "Technical", title: "HTML response and encoding", detail: `The page returned HTML successfully${/charset\s*=\s*utf-?8/i.test(first.headers.get("content-type") ?? "") || /<meta\b[^>]*charset\s*=\s*["']?utf-8/i.test(first.html) ? " with UTF-8 declared" : "; UTF-8 was not explicitly detected"}.`, recommendation: "Keep a valid HTML response and declare UTF-8 character encoding.", points: 5, quality: /charset\s*=\s*utf-?8/i.test(first.headers.get("content-type") ?? "") || /<meta\b[^>]*charset\s*=\s*["']?utf-8/i.test(first.html) ? 1 : 0.5 },
    { category: "Technical", title: "Useful page content", detail: `The homepage contains approximately ${firstInfo.wordCount.toLocaleString()} visible words.`, recommendation: "Make sure the page clearly explains its purpose and answers visitors' main questions.", points: 4, quality: firstInfo.wordCount >= 100 ? 1 : firstInfo.wordCount >= 40 ? 0.5 : 0 },
    { category: "Accessibility", title: "Language declaration", detail: firstInfo.lang ? `The document declares its language (${firstInfo.lang}).` : "The homepage does not declare a document language.", recommendation: "Set the correct lang attribute on the document's html element.", points: 4, quality: firstInfo.lang ? 1 : 0 },
    { category: "Accessibility", title: "Alternative text for images", detail: firstInfo.images ? `${firstInfo.imagesWithAlt} of ${firstInfo.images} homepage images include an alt attribute.` : "No images were detected in the homepage HTML.", recommendation: "Describe meaningful images with alt text; use empty alt text for decorative images.", points: 8, quality: firstInfo.images ? ratio(firstInfo.imagesWithAlt / firstInfo.images) : 0.5 },
    { category: "Accessibility", title: "Main content landmark", detail: firstInfo.hasMain ? "A main content landmark was detected." : "No main content landmark was detected in the homepage HTML.", recommendation: "Wrap the primary page content in a main element or role=main.", points: 4, quality: firstInfo.hasMain ? 1 : 0 },
    { category: "Accessibility", title: "Heading and control clarity", detail: `${infos.filter((info) => !info.skippedHeadingLevels).length} of ${all} sampled pages have no detected skipped heading levels; ${firstInfo.unlabeledControls} homepage links or buttons appear to lack a text or accessible label.`, recommendation: "Keep headings in order and give every link and button an accessible name.", points: 4, quality: ratio(infos.filter((info) => !info.skippedHeadingLevels).length / Math.max(all, 1)) * (firstInfo.unlabeledControls === 0 ? 1 : 0.5) },
    { category: "Security", title: "Transport security policy", detail: `Strict-Transport-Security ${hsts ? "is present" : "was not detected"}.`, recommendation: "Add a carefully configured Strict-Transport-Security header after confirming all subdomains support HTTPS.", points: 4, quality: hsts ? 1 : 0 },
    { category: "Security", title: "Content and frame protection", detail: `Content-Security-Policy ${csp ? "is present" : "was not detected"}; clickjacking protection ${frameProtection ? "is present" : "was not detected"}.`, recommendation: "Add an appropriate Content-Security-Policy and frame protection header.", points: 4, quality: (Number(csp) + Number(frameProtection)) / 2 },
    { category: "Security", title: "Response hardening", detail: `X-Content-Type-Options: nosniff ${nosniff ? "is present" : "was not detected"}; Referrer-Policy ${referrerPolicy ? "is present" : "was not detected"}; Permissions-Policy ${permissionsPolicy ? "is present" : "was not detected"}.`, recommendation: "Review nosniff, Referrer-Policy, and Permissions-Policy response headers.", points: 3, quality: (Number(nosniff) + Number(referrerPolicy) + Number(permissionsPolicy)) / 3 },
  ];
  const score = Math.max(0, Math.min(100, Math.round(checks.reduce((sum, check) => sum + check.points * check.quality, 0))));
  const findings = checks.map(({ category, title, detail, recommendation, quality }) => ({
    category,
    status: quality >= 0.9 ? "good" as const : quality >= 0.5 ? "warning" as const : "issue" as const,
    title,
    detail,
    ...(quality < 0.9 && recommendation ? { recommendation } : {}),
  }));
  const summary = score >= 90 ? "Strong public-page foundations" : score >= 75 ? "A solid start with room to improve" : score >= 50 ? "Several improvements could help" : "Important foundations need attention";
  return {
    score,
    summary,
    host: first.url.host,
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
        const target = validSiteUrl(parsed.data.url);
        if (!target) {
          return Response.json({ error: "Enter a public http or https website address without a custom port, login, or private network address." }, { status: 400 });
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