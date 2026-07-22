import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/site/Shell";
import { PageHero, Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { CASES } from "@/lib/case-assets";
import { CaseVideoCard } from "@/components/site/CaseVideoCard";
import { Lightbox } from "@/components/site/VideoCard";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Jacob Growth" },
      { name: "description", content: "Real ecommerce brands, real revenue. Selected video case studies across fashion and automotive." },
      { property: "og:title", content: "Case Studies — Jacob Growth" },
      { property: "og:description", content: "Selected client wins across DTC and Shopify brands." },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <Shell>
      <PageHero
        eyebrow="Case Studies"
        title={<>Selected <span className="gradient-text">client wins.</span></>}
        sub="A premium portfolio of ecommerce growth engagements — real stores, real results."
      />
      <section className="pb-24">
        <div className="container-lg">
          <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
            {CASES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <CaseVideoCard
                  video={c.video}
                  website={c.website}
                  industry={c.industry}
                  slug={c.slug}
                  onPlay={() => setActive(i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
        {active !== null && (
          <Lightbox src={CASES[active].video} onClose={() => setActive(null)} />
        )}
      </section>
      <CtaBanner
        title={<>Want to be the <span className="gradient-text">next case study?</span></>}
        secondaryLabel="See references"
        secondaryTo="/references"
      />
    </Shell>
  );
}
