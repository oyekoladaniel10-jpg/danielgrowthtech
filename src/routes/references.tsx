import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { VideoCard, Lightbox } from "@/components/site/VideoCard";
import { REFERENCES } from "@/lib/site-content";

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: [
      { title: "Client References | Danielgrowth" },
      { name: "description", content: "Watch real video testimonials from ecommerce brands Danielgrowth has helped scale. DTC founders sharing their growth stories." },
      { property: "og:title", content: "Client References | Danielgrowth" },
      { property: "og:description", content: "Authentic video references from ecommerce clients we've partnered with." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReferencesPage,
});

function ReferencesPage() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <Shell>
      <PageHero
        eyebrow="Real Clients · Real Results"
        title={<>Client <span className="gradient-text">References</span></>}
        sub="Honest, unscripted video stories from ecommerce founders we've partnered with, sharing the strategy, the work, and the growth that followed."
      />
      <section className="pb-24">
        <div className="container-lg">
          <h2 className="sr-only">Client video references</h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {REFERENCES.map((r, i) => (
              <VideoCard key={`${r.name}-${i}`} data={r} onOpen={() => setActive(i)} />
            ))}
          </div>
          {active !== null && (
            <Lightbox src={REFERENCES[active].src} poster={REFERENCES[active].poster} captions={REFERENCES[active].captions} onClose={() => setActive(null)} />
          )}
        </div>
      </section>
      <CtaBanner
        title={<>Ready to become our next <span className="gradient-text">success story?</span></>}
        sub="Let's map a growth plan tailored to your store, no obligation, just clarity."
      />
    </Shell>
  );
}
