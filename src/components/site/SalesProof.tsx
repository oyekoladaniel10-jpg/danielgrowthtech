import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined } from "lucide-react";
import { LATEST_SALES_RECORDING, SALES_PROOFS, type SalesProof } from "@/lib/sales-proof";
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
  const proof = SALES_PROOFS[0];

  return (
    <section className="section-pad pb-0">
      <div className="container-lg">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
            <ChartNoAxesCombined className="h-4 w-4" /> Latest sales proof · {LATEST_SALES_RECORDING.date}
          </div>
          <article className="grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[1.2fr_0.8fr]">
            <img
              src={proof.image}
              alt={proof.alt}
              width={822}
              height={600}
              fetchPriority="high"
              decoding="async"
              className="h-full min-h-64 w-full object-cover object-top md:min-h-0"
            />
            <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-sm text-muted-foreground">{proof.period}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">{proof.totalSales}</p>
                <p className="mt-2 text-sm text-muted-foreground">Total sales shown in the supplied analytics screenshot.</p>
              </div>
              <ProofMetrics proof={proof} />
              <div className="flex flex-wrap gap-3">
                <a
                  href={LATEST_SALES_RECORDING.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Open latest recording <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link to="/sales-proof" className="btn-ghost">
                  All sales proof <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function SalesProofCard({ proof }: { proof: SalesProof }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <img
        src={proof.image}
        alt={proof.alt}
        width={822}
        height={600}
        loading="lazy"
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
          <a
            href={LATEST_SALES_RECORDING.url}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-4 shrink-0 sm:mt-0"
          >
            Open recording <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}