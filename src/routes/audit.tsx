import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, CircleHelp, ExternalLink, LoaderCircle, ShieldCheck, Zap } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auditResponseSchema, type AuditResponse } from "@/lib/site-audit-contract";

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

function AuditPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ url }),
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

  const findingsByCategory = result?.findings.reduce<Record<string, AuditResponse["findings"]>>((groups, finding) => {
    (groups[finding.category] ??= []).push(finding);
    return groups;
  }, {});

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
                type="url"
                inputMode="url"
                autoComplete="url"
                maxLength={2048}
                required
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://yourstore.com"
                aria-describedby="audit-scope"
                className="h-12 min-w-0 rounded-xl border-input bg-background px-4 text-base"
              />
              <Button type="submit" size="lg" disabled={loading || !url.trim()} className="h-12 shrink-0 rounded-xl px-6">
                {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Checking pages…</> : <>Run free audit <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </div>
            <input name="websiteTrap" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[10000px] h-px w-px opacity-0" />
            <p id="audit-scope" className="mt-3 text-xs text-muted-foreground">Public pages only. No account access needed. The scan reads your homepage and up to two linked pages.</p>
          </form>

          {error && <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />{error}</p>}

          {loading && <div role="status" className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-sm text-muted-foreground"><LoaderCircle className="h-5 w-5 animate-spin text-primary" />Reading public pages and checking the site’s visible setup. This can take a few seconds.</div>}

          {result && (
            <div className="mt-10 space-y-8" aria-live="polite">
              <section className="grid gap-6 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:p-8">
                <div className="mx-auto grid h-44 w-44 place-items-center rounded-full border-[10px] border-primary/30 bg-background text-center">
                  <div><div className="text-5xl font-semibold text-foreground">{result.score}<span className="text-xl text-muted-foreground">/100</span></div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Website score</div></div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary">Audit complete</div>
                  <h2 className="mt-2 break-words text-2xl md:text-3xl">{result.summary}</h2>
                  <p className="mt-2 break-all text-sm text-muted-foreground">{result.host} · {result.pagesAudited} page{result.pagesAudited === 1 ? "" : "s"} inspected</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">This score reflects checks visible on the public pages we could read. It is not a Google ranking, private analytics report, or full speed/Core Web Vitals test.</p>
                  <p className="mt-2 text-xs text-muted-foreground">Checked {new Date(result.checkedAt).toLocaleString()}</p>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2"><h2 className="text-xl md:text-2xl">Findings</h2><span className="text-sm text-muted-foreground">{result.findings.filter((finding) => finding.status !== "good").length} opportunities to review</span></div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {Object.entries(findingsByCategory ?? {}).map(([category, findings]) => (
                    <section key={category} className="rounded-2xl border border-border bg-surface p-5">
                      <h3 className="mb-4 text-lg">{category}</h3>
                      <ul className="space-y-4">
                        {findings.map((finding) => (
                          <li key={finding.title} className="flex items-start gap-3">
                            {finding.status === "good" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" /> : <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-gold" />}
                            <div className="min-w-0"><p className="text-sm font-medium">{finding.title}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{finding.detail}</p>{finding.recommendation && <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">Next: {finding.recommendation}</p>}</div>
                          </li>
                        ))}
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
                      <div className="min-w-0"><p className="break-all text-sm font-medium">{page.title || new URL(page.url).pathname || result.host}</p><p className="break-all text-xs text-muted-foreground">{page.url}</p><p className="mt-1 text-xs text-muted-foreground">{page.imageCount} images · {page.imagesMissingAlt} missing alt · about {page.wordCount.toLocaleString()} words</p></div>
                      <a href={page.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 text-sm text-primary hover:underline">Open page <ExternalLink className="h-3.5 w-3.5" /></a>
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