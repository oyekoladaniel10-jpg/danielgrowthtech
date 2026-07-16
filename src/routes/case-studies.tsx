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
      { name: "description", content: "Real ecommerce brands, real revenue. Selected case studies across beauty, fashion and home." },
      { property: "og:title", content: "Case Studies — Jacob Growth" },
      { property: "og:description", content: "Selected client wins across DTC, Shopify Plus and WooCommerce." },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Case Studies"
        title={<>Selected <span className="gradient-text">client wins.</span></>}
        sub="Real brands. Real revenue. Placeholder content — swap in your live case studies anytime."
      />
      <section className="pb-24">
        <div className="container-lg space-y-8">
          {CASES.map((c, i) => (
            <Reveal key={c.client} delay={i * 80}>
              <article className="glass-strong grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-2">
                <div className={`relative aspect-[4/3] lg:aspect-auto ${i % 2 ? "lg:order-2" : ""}`}>
                  <img src={c.img} alt={c.client} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-8 md:p-10">
                  <div className="text-xs tracking-widest text-gold uppercase">{c.industry}</div>
                  <h3 className="mt-2 text-3xl">{c.client}</h3>
                  <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    <p><span className="text-foreground">Challenge —</span> {c.challenge}</p>
                    <p><span className="text-foreground">Strategy —</span> {c.strategy}</p>
                    <p><span className="text-foreground">Work —</span> {c.work}</p>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {c.results.map((r) => (
                      <div key={r.k} className="rounded-2xl border border-white/10 p-4 text-center">
                        <div className="text-2xl gradient-text">{r.v}</div>
                        <div className="text-[10px] tracking-widest text-muted-foreground uppercase">{r.k}</div>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:underline">
                    Discuss a similar engagement <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
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
