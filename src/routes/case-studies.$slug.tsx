import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { CASES } from "@/lib/case-assets";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const c = CASES.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case Study — Jacob Growth" }, { name: "robots", content: "noindex" }] };
    }
    const { c } = loaderData;
    return {
      meta: [
        { title: `${c.client} — Case Study | Jacob Growth` },
        { name: "description", content: c.challenge },
        { property: "og:title", content: `${c.client} — Case Study` },
        { property: "og:description", content: c.challenge },
        { property: "og:image", content: c.img },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyDetail,
  notFoundComponent: () => (
    <Shell>
      <div className="container-lg pt-40 pb-24 text-center">
        <h1 className="text-4xl">Case study not found</h1>
        <Link to="/case-studies" className="btn-ghost mt-8 inline-flex">Back to case studies</Link>
      </div>
    </Shell>
  ),
});

function CaseStudyDetail() {
  const { c } = Route.useLoaderData();
  return (
    <Shell>
      <section className="relative overflow-hidden pt-36 pb-10 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
          }}
        />
        <div className="container-lg">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
            <Reveal>
              <div className="text-xs tracking-[0.25em] text-gold uppercase">{c.industry}</div>
              <h1 className="mt-3 text-4xl md:text-6xl leading-[1.05]">
                {c.client}
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">{c.challenge}</p>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                {c.results.map((r: { k: string; v: string }) => (
                  <div key={r.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <div className="text-xl gradient-text md:text-2xl">{r.v}</div>
                    <div className="mt-1 text-[10px] tracking-widest text-muted-foreground uppercase">{r.k}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/25 to-white/5 blur-2xl" />
                <img
                  src={c.img}
                  alt={c.client}
                  loading="eager"
                  className="relative w-full rounded-3xl border border-white/10 object-cover object-top shadow-2xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lg grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-lux h-full">
              <div className="text-xs tracking-widest text-gold uppercase">The Challenge</div>
              <p className="mt-3 text-muted-foreground">{c.challenge}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card-lux h-full">
              <div className="text-xs tracking-widest text-gold uppercase">Our Strategy</div>
              <p className="mt-3 text-muted-foreground">{c.strategy}</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="card-lux h-full md:col-span-2">
              <div className="text-xs tracking-widest text-gold uppercase">Work Delivered</div>
              <p className="mt-3 text-muted-foreground">{c.work}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {c.work.split(",").map((w: string) => (
                  <li key={w} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{w.trim().replace(/^./, (m: string) => m.toUpperCase())}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={<>Want results like <span className="gradient-text">{c.client}?</span></>}
        sub="Book a free 30-minute strategy call — no obligation, just clarity."
        secondaryLabel="View all case studies"
        secondaryTo="/case-studies"
      />
    </Shell>
  );
}
