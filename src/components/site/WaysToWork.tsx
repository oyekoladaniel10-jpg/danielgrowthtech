import { Link } from "@tanstack/react-router";
import { ArrowRight, Handshake } from "lucide-react";
import { Reveal } from "@/components/site/ui";
import { WAYS_TO_WORK } from "@/lib/site-content";

export function WaysToWork() {
  return (
    <section className="pb-24">
      <div className="container-lg">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-widest text-gold uppercase">
              <Handshake className="h-3.5 w-3.5" />
              Working Together
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl">
              Flexible ways to <span className="gradient-text">work together.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose the payment structure that best fits your business, budget, and growth goals. Every engagement is
              tailored to your needs, with clear expectations and transparent terms agreed before work begins.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {WAYS_TO_WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <article className="card-lux flex h-full flex-col">
                <div className="text-xs tracking-[0.25em] text-gold uppercase">Option {i + 1}</div>
                <h3 className="mt-3 text-2xl">{w.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{w.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
            Every engagement is tailored to the client's needs. Payment structure, scope of work, deliverables, and any
            performance-based terms are agreed in writing before work begins.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/contact" className="btn-primary">
              Discuss Your Options <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
