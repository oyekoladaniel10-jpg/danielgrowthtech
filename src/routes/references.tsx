import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { VideoCard } from "@/components/site/VideoCard";
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
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden">
            {REFERENCES.map((r, i) => (
              <div
                key={i}
                className="flex shrink-0 basis-[calc(100%-2.25rem)] snap-start md:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-4rem)/3)]"
              >
                <VideoCard data={r} portrait />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        title={<>Ready to become our next <span className="gradient-text">success story?</span></>}
        sub="Let's map a growth plan tailored to your store, no obligation, just clarity."
      />
    </Shell>
  );
}
