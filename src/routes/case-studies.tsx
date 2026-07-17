import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero, Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { CASES } from "@/lib/case-assets";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Jacob Growth" },
      { name: "description", content: "Real ecommerce brands, real revenue. Selected case studies across marketing, analytics, attribution and lifecycle." },
      { property: "og:title", content: "Case Studies — Jacob Growth" },
      { property: "og:description", content: "Selected client wins across DTC and Shopify brands." },
    ],
  }),
  component: CaseStudiesPage,
});

const TITLES: Record<string, string> = {
  "marketing-growth": "Marketing Growth Transformation",
  "analytics-scaling": "Analytics & Revenue Scaling",
  "channels-attribution": "Multi-Channel Attribution Strategy",
  "customer-expansion": "Customer Base Expansion",
};

function CaseStudiesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Case Studies"
        title={<>Selected <span className="gradient-text">client wins.</span></>}
        sub="A premium portfolio of ecommerce growth engagements — real dashboards, real results."
      />
      <section className="pb-24">
        <div className="container-lg">
          <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
            {CASES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <article className="group card-lux flex h-full flex-col overflow-hidden p-0 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-30px_color-mix(in_oklab,var(--emerald-brand)_35%,transparent)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
                    <img
                      src={c.img}
                      alt={TITLES[c.slug] ?? c.client}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-widest text-gold uppercase">
                      {c.industry}
                    </span>
                    <h3 className="mt-4 text-xl md:text-2xl">{TITLES[c.slug] ?? c.client}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{c.challenge}</p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {c.results.map((r) => (
                        <div key={r.k} className="rounded-xl border border-white/10 p-3 text-center">
                          <div className="text-base gradient-text md:text-lg">{r.v}</div>
                          <div className="mt-0.5 text-[9px] tracking-widest text-muted-foreground uppercase">{r.k}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-6">
                      <Link
                        to="/contact"
                        className="btn-ghost w-full justify-center transition group-hover:border-gold/50 group-hover:text-gold"
                      >
                        View Case Study <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        title={<>Want to be the <span className="gradient-text">next case study?</span></>}
        secondaryLabel="See references"
        secondaryTo="/references"
      />
    </Shell>
  );
}
