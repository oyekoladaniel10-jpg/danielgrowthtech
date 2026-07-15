import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaBanner({
  title,
  sub,
  primaryLabel = "Book a Free Consultation",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}: {
  title: React.ReactNode;
  sub?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="section-pad">
      <div className="container-lg">
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 100%, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)",
            }}
          />
          <h2 className="mx-auto max-w-3xl text-balance text-3xl md:text-5xl">{title}</h2>
          {sub && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={primaryTo} className="btn-primary">
              {primaryLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="btn-ghost">{secondaryLabel}</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
