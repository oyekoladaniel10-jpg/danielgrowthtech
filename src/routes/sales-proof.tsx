import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { SalesProofArchive } from "@/components/site/SalesProof";

export const Route = createFileRoute("/sales-proof")({
  head: () => ({
    meta: [
      { title: "Sales Proof | Danielgrowth" },
      { name: "description", content: "View the Shopify analytics screenshots and sales evidence shared with Danielgrowth." },
      { property: "og:title", content: "Sales Proof | Danielgrowth" },
      { property: "og:description", content: "A transparent record of the store analytics screenshots shared with Danielgrowth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesProofPage,
});

function SalesProofPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Sales Proof"
        title={<>Recent store <span className="gradient-text">performance.</span></>}
        sub="Browse the original sales analytics captures and the latest shared walkthrough."
      />
      <SalesProofArchive />
    </Shell>
  );
}