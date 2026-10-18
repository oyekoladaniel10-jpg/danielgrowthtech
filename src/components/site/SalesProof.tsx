import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined } from "lucide-react";
import { LATEST_SALES_RECORDING, SALES_PROOFS, SALES_VIDEOS, type SalesProof } from "@/lib/sales-proof";
import { Reveal, SectionHeader } from "./ui";

function ProofMetrics({ proof }: { proof: SalesProof }) {
  const metrics = [
    { label: "Gross sales", value: proof.grossSales },
    { label: "Returning customers", value: proof.returningCustomers },
    { label: "Orders", value: proof.orders },
    { label: "Fulfilled", value: proof.fulfilled },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="border-t border-border pt-3">
          <dt className="text-xs text-muted-foreground">{metric.label}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FeaturedSalesProof() {
  const latestProofs = SALES_PROOFS.slice(0, 4);
  const featured = latestProofs[0];

  return (
    <section className="section-pad pb-0">
      <div className="container-lg">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
            <ChartNoAxesCombined className="h-4 w-4" /> Latest sales proof · {LATEST_SALES_RECORDING.date}
          </div>
        </Reveal>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {SALES_VIDEOS.map((v) => (
            <Reveal key={v.src}>
              <figure className="overflow-hidden rounded-xl border border-border bg-card">
                <video src={v.src} poster={v.poster} controls playsInline preload="none" className="aspect-video w-full bg-muted object-contain" />
                <figcaption className="p-4 text-sm font-medium">{v.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestProofs.map((proof, index) => (
            <Reveal key={proof.id} delay={index * 60}>
              <SalesProofCard proof={proof} featured={proof.id === featured.id} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/sales-proof" className="btn-ghost">
            All sales proof <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SalesProofCard({ proof, featured = false }: { proof: SalesProof; featured?: boolean }) {
  return (
    <article className={`overflow-hidden rounded-xl border border-border bg-card ${featured ? "sm:col-span-2 lg:col-span-1" : ""}`}>
      <img
        src={proof.image}
        alt={proof.alt}
        width={822}
        height={600}
        loading={featured ? "eager" : "lazy"}
        decoding="async"
        className="aspect-[4/3] w-full bg-muted object-contain"
      />
      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{proof.label}</p>
            <h2 className="mt-2 text-lg font-medium">{proof.period}</h2>
          </div>
          <p className="text-xl font-semibold text-foreground">{proof.totalSales}</p>
        </div>
        <ProofMetrics proof={proof} />
      </div>
    </article>
  );
}

export function SalesProofArchive() {
  return (
    <section className="pb-24">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Store Analytics"
          title={<>Sales <span className="gradient-text">proof.</span></>}
          sub="A record of the analytics screenshots shared for this portfolio. Values and currencies are shown as they appear in the original captures."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SALES_PROOFS.map((proof, index) => (
            <Reveal key={proof.id} delay={index * 50}>
              <SalesProofCard proof={proof} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-border bg-card p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-medium">Latest recording · {LATEST_SALES_RECORDING.date}</p>
            <p className="mt-1 text-sm text-muted-foreground">Open the Shopify walkthrough shared in Google Drive.</p>
          </div>
          <a href={LATEST_SALES_RECORDING.url} target="_blank" rel="noreferrer" className="btn-ghost mt-4 shrink-0 sm:mt-0">
            Open recording <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}