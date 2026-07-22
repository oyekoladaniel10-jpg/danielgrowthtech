import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Lightbox } from "@/components/site/VideoCard";
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
        { title: `${c.website} — Case Study | Jacob Growth` },
        { name: "description", content: `${c.industry} case study for ${c.website}.` },
        { property: "og:title", content: `${c.website} — Case Study` },
        { property: "og:description", content: `${c.industry} case study for ${c.website}.` },
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
  const [open, setOpen] = useState(false);

  const sections: { title: string; body: string }[] = [
    { title: "Project Overview", body: c.overview },
    { title: "Challenge", body: c.challenge },
    { title: "Strategy", body: c.strategy },
    { title: "Results", body: c.results },
    { title: "Tools Used", body: c.tools },
    { title: "Key Outcome", body: c.outcome },
  ];

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
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <Reveal>
              <div className="text-xs tracking-[0.25em] text-gold uppercase">{c.industry}</div>
              <h1 className="mt-3 text-4xl md:text-6xl leading-[1.05]">{c.website}</h1>
              <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
                Watch the full case study video and explore the strategy, tools, and outcomes behind the project.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Play ${c.website} case study video`}
                className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl"
                style={{ aspectRatio: "16 / 9" }}
              >
                <video
                  src={c.video}
                  preload="metadata"
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/0">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white/95 shadow-2xl transition group-hover:scale-110 md:h-24 md:w-24">
                    <Play className="ml-1 h-8 w-8 fill-background text-background md:h-10 md:w-10" />
                  </div>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lg grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card-lux h-full">
                <div className="text-xs tracking-widest text-gold uppercase">{s.title}</div>
                <p className="mt-3 whitespace-pre-line text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {open && <Lightbox src={c.video} onClose={() => setOpen(false)} />}

      <CtaBanner
        title={<>Want results like <span className="gradient-text">{c.website}?</span></>}
        sub="Book a free 30-minute strategy call — no obligation, just clarity."
        secondaryLabel="View all case studies"
        secondaryTo="/case-studies"
      />
    </Shell>
  );
}
