import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, CircleAlert, CircleHelp, ExternalLink, ListChecks, LoaderCircle, Monitor, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auditResponseSchema, normalizeSiteInput, type AuditFinding, type AuditResponse } from "@/lib/site-audit-contract";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Free Website Audit | Jacob Growth" },
      { name: "description", content: "Get a free, evidence-based website audit covering visible SEO, technical setup, accessibility and security checks." },
      { property: "og:title", content: "Free Website Audit | Jacob Growth" },
      { property: "og:description", content: "Check your public website and get a clear score with practical findings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditPage,
});

function screenshotUrl(siteUrl: string, mobile: boolean): string {
  const params = new URLSearchParams({ url: siteUrl, screenshot: "true", meta: "false", embed: "screenshot.url" });
  if (mobile) {
    params.set("viewport.isMobile", "true");
    params.set("viewport.width", "390");
    params.set("viewport.height", "780");
    params.set("viewport.deviceScaleFactor", "2");
  } else {
    params.set("viewport.width", "1280");
    params.set("viewport.height", "800");
  }
  return `https://api.microlink.io/?${params.toString()}`;
}

function SiteScreenshot({ siteUrl, mobile }: { siteUrl: string; mobile: boolean }) {
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const Icon = mobile ? Smartphone : Monitor;
  return (
    <figure className={mobile ? "w-full max-w-[220px] shrink-0" : "min-w-0 flex-1"}>
      <div className={`relative overflow-hidden rounded-xl border border-border bg-background ${mobile ? "aspect-[1/2]" : "aspect-[16/10]"}`}>
        {state !== "failed" && (
          <img
            src={screenshotUrl(siteUrl, mobile)}
            alt={`${mobile ? "Phone" : "Desktop"} screenshot of ${siteUrl} captured during the audit`}
            loading="lazy"
            onLoad={() => setState("ready")}
            onError={() => setState("failed")}
            className={`h-full w-full object-cover object-top transition-opacity ${state === "ready" ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {state === "loading" && <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground"><LoaderCircle className="h-5 w-5 animate-spin text-primary" />Capturing screen…</div>}
        {state === "failed" && <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-muted-foreground">Screenshot unavailable right now. The checks below were still run on the live page.</div>}
      </div>
      <figcaption className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" />{mobile ? "How it looks on a phone" : "How it looks on desktop"}</figcaption>
    </figure>
  );
}

function StatusIcon({ status }: { status: AuditFinding["status"] }) {
  if (status === "good") return <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" aria-label="Passed" />;
  if (status === "warning") return <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-label="Needs improvement" />;
  return <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-label="Weak point" />;
}

function FindingItem({ finding }: { finding: AuditFinding }) {
  return (
    <li>
      <details className="group rounded-xl border border-border bg-background/40" open={finding.status === "issue"}>
        <summary className="flex min-h-11 cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <StatusIcon status={finding.status} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-sm font-medium">{finding.title}</p>
              {finding.pointsLost > 0 && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">-{finding.pointsLost} pts</span>}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{finding.detail}</p>
          </div>
          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-3 border-t border-border px-4 pb-4 pt-3">
          {finding.evidence.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">What we found on your site</p>
              <ul className="mt-2 space-y-1.5">
                {finding.evidence.map((item) => (
                  <li key={item} className="break-words rounded-lg bg-surface px-3 py-2 font-mono text-xs leading-relaxed text-foreground/90">{item}</li>
                ))}
              </ul>
            </div>
          )}
          {finding.why && <p className="text-sm leading-relaxed text-muted-foreground"><span className="font-medium text-foreground">Why it matters: </span>{finding.why}</p>}
          {finding.recommendation && <p className="text-sm leading-relaxed text-foreground/90"><span className="font-medium">How to fix: </span>{finding.recommendation}</p>}
        </div>
      </details>
    </li>
  );
}

function AuditPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = normalizeSiteInput(url);
    setUrl(target);
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message = typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
          ? data.error
          : "We couldn't inspect that website. Please check the address and try again.";
        throw new Error(message);
      }
      const parsed = auditResponseSchema.safeParse(data);
      if (!parsed.success) throw new Error("The audit result could not be read. Please try again.");
      setResult(parsed.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The scan did not finish. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const findingsByCategory = result?.findings.reduce<Record<string, AuditFinding[]>>((groups, finding) => {
    (groups[finding.category] ??= []).push(finding);
    return groups;
  }, {});
  const weakPoints = result?.findings.filter((finding) => finding.status !== "good").sort((a, b) => b.pointsLost - a.pointsLost) ?? [];

  return (
    <Shell>
      <PageHero
        eyebrow="Free Website Audit"
        title={<>Know what your website <span className="gradient-text">needs next.</span></>}
        sub="Scan public pages for real, visible SEO, technical, accessibility and security signals. Get a clear score and practical next steps — free."
      />
      <section className="pb-24">
        <div className="container-lg mx-auto max-w-5xl">
          <form onSubmit={submitAudit} className="rounded-3xl border border-border bg-surface p-5 md:p-8">
            <label htmlFor="audit-url" className="mb-2 block text-sm font-medium">Your website address</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="audit-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                maxLength={2048}
                required
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="yourstore.com"
                aria-describedby="audit-scope"
                className="h-12 min-w-0 rounded-xl border-input bg-background px-4 text-base"
              />
              <Button type="submit" size="lg" disabled={loading || !url.trim()} className="h-12 shrink-0 rounded-xl px-6">
                {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Checking pages…</> : <>Run free audit <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </div>
            <input name="websiteTrap" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[10000px] h-px w-px opacity-0" />
            <p id="audit-scope" className="mt-3 text-xs text-muted-foreground">No need to type https:// — just your domain. Public pages only. The scan reads your homepage and up to two linked pages.</p>
          </form>

          {error && <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />{error}</p>}

          {loading && <div role="status" className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-sm text-muted-foreground"><LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-primary" />Downloading the live pages, reading the code, and running 18 checks. This can take up to 20 seconds.</div>}

          {result && (
            <div className="mt-10 space-y-8" aria-live="polite">
              <section className="grid gap-6 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:p-8">
                <div className="mx-auto grid h-44 w-44 place-items-center rounded-full border-[10px] border-primary/30 bg-background text-center">
                  <div><div className="text-5xl font-semibold text-foreground">{result.score}<span className="text-xl text-muted-foreground">/100</span></div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Website score</div></div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary">Audit complete</div>
                  <h2 className="mt-2 break-words text-2xl md:text-3xl">{result.summary}</h2>
                  <p className="mt-2 break-all text-sm text-muted-foreground">{result.host} · {result.pagesAudited} page{result.pagesAudited === 1 ? "" : "s"} inspected · {weakPoints.length} weak point{weakPoints.length === 1 ? "" : "s"}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">This score reflects checks visible on the public pages we could read. It is not a Google ranking, private analytics report, or full speed/Core Web Vitals test.</p>
                  <p className="mt-2 text-xs text-muted-foreground">Checked {new Date(result.checkedAt).toLocaleString()}</p>
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-surface p-5 md:p-6">
                <h2 className="text-xl">What we saw</h2>
                <p className="mt-1 text-sm text-muted-foreground">Live captures of {result.host} taken for this audit.</p>
                <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                  <SiteScreenshot siteUrl={result.finalUrl} mobile />
                  <SiteScreenshot siteUrl={result.finalUrl} mobile={false} />
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-surface p-5 md:p-6">
                <h2 className="flex items-center gap-2 text-xl"><ListChecks className="h-5 w-5 text-primary" />How we researched your site</h2>
                <ol className="mt-4 space-y-2.5">
                  {result.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{index + 1}</span>
                      <span className="min-w-0 break-words text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {weakPoints.length > 0 && (
                <section>
                  <h2 className="text-xl md:text-2xl">Biggest weak points</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Ranked by how many points each one costs you. Tap any item to see the proof.</p>
                  <ul className="mt-4 space-y-3">
                    {weakPoints.slice(0, 5).map((finding) => <FindingItem key={finding.title} finding={finding} />)}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="mb-4 text-xl md:text-2xl">All checks</h2>
                <div className="grid gap-5 lg:grid-cols-2">
                  {Object.entries(findingsByCategory ?? {}).map(([category, findings]) => (
                    <section key={category} className="rounded-2xl border border-border bg-surface p-4 md:p-5">
                      <h3 className="mb-3 text-lg">{category}</h3>
                      <ul className="space-y-3">
                        {findings.map((finding) => <FindingItem key={finding.title} finding={finding} />)}
                      </ul>
                    </section>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                <h2 className="text-xl">Pages checked</h2>
                <ul className="mt-4 divide-y divide-border">
                  {result.pages.map((page) => (
                    <li key={page.url} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0"><p className="break-all text-sm font-medium">{page.title || new URL(page.url).pathname || result.host}</p><p className="break-all text-xs text-muted-foreground">{page.url}</p><p className="mt-1 text-xs text-muted-foreground">{page.sizeKb.toLocaleString()} KB · {page.imageCount} images · {page.imagesMissingAlt} missing alt · about {page.wordCount.toLocaleString()} words</p></div>
                      <a href={page.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm text-primary hover:underline">Open page <ExternalLink className="h-3.5 w-3.5" /></a>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="flex items-start gap-3 rounded-2xl border border-border p-4 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p>This free snapshot checks public page content and response headers. It does not access your admin, checkout, analytics, search rankings, or every page on a large site.</p></div>
              <div className="text-center"><a href="/contact" className="btn-primary">Want help fixing these? Talk to Jacob <Zap className="h-4 w-4" /></a></div>
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}
