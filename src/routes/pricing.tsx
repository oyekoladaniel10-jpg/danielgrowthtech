import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Handshake } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero, Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PRICING, PARTNERSHIP, FAQS } from "@/lib/site-content";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Jacob Growth" },
      { name: "description", content: "Simple, transparent pricing — Basic, Standard and Premium plans plus a performance-based partnership option." },
      { property: "og:title", content: "Pricing — Jacob Growth" },
      { property: "og:description", content: "Three plans plus a commission-based growth partnership." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Shell>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple, transparent <span className="gradient-text">growth plans.</span></>}
        sub="Three plans plus a performance-based partnership. Every engagement starts with a call and a scoped proposal."
      />
      <section className="pb-16">
        <div className="container-lg">
          <div className="grid gap-6 md:grid-cols-3">
            {PRICING.map((p, i) => (
              <Reveal key={p.tier} delay={i * 80}>
                <article
                  className={`card-lux relative flex h-full flex-col ${
                    p.highlight ? "border-emerald-brand/50 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--emerald-brand)_45%,transparent)]" : ""
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-brand to-gold px-3 py-1 text-[10px] tracking-widest text-primary-foreground uppercase">
                      Most popular
                    </span>
                  )}
                  <div className="text-xs tracking-widest text-gold uppercase">{p.tier}</div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <div className="text-3xl gradient-text md:text-4xl">{p.price}</div>
                    <div className="text-xs text-muted-foreground">/ {p.cadence}</div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-foreground/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`${p.highlight ? "btn-primary" : "btn-ghost"} mt-8 w-full`}>
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lg">
          <Reveal>
            <article className="glass-strong relative overflow-hidden rounded-[2rem] p-8 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-60"
                style={{
                  background:
                    "radial-gradient(50% 60% at 100% 0%, color-mix(in oklab, var(--gold) 25%, transparent), transparent 70%)",
                }}
              />
              <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-widest text-gold uppercase">
                    <Handshake className="h-3.5 w-3.5" />
                    {PARTNERSHIP.eyebrow}
                  </div>
                  <h2 className="mt-4 text-3xl md:text-5xl">
                    {PARTNERSHIP.tier}
                  </h2>
                  <p className="mt-4 max-w-xl text-muted-foreground">{PARTNERSHIP.desc}</p>
                  <Link to="/contact" className="btn-primary mt-6">
                    {PARTNERSHIP.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <ul className="grid gap-2.5 text-sm">
                  {PARTNERSHIP.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lg">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs tracking-[0.25em] text-gold uppercase">FAQ</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Answers to <span className="gradient-text">common questions.</span></h2>
          </div>
          <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-medium">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className="grid overflow-hidden px-6 text-sm text-muted-foreground transition-all"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      paddingBottom: isOpen ? "1.25rem" : "0",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">{f.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner title={<>Have a specific <span className="gradient-text">brief?</span></>} sub="Share your scope and I'll come back with a tailored proposal." />
    </Shell>
  );
}
