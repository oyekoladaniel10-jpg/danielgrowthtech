import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero, Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { INDUSTRIES } from "@/lib/site-content";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries | Danielgrowth" },
      { name: "description", content: "Category-specific ecommerce playbooks for fashion, beauty, health, home, luxury, B2B and more." },
      { property: "og:title", content: "Industries | Danielgrowth" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Deep, category-specific ecommerce playbooks." },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Industries"
        title={<>Trusted across <span className="gradient-text">high-consideration categories.</span></>}
        sub="Deep, category-specific playbooks refined from hundreds of engagements."
      />
      <section className="pb-24">
        <div className="container-lg">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((i, idx) => (
              <Reveal key={i} delay={idx * 30}>
                <div className="glass group flex h-full items-center justify-between rounded-2xl px-5 py-5 transition hover:border-gold/40">
                  <span className="font-medium">{i}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-gold" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        title={<>Your category, <span className="gradient-text">deeply understood.</span></>}
        sub="Book a call and we'll share the playbook for your niche."
      />
    </Shell>
  );
}
