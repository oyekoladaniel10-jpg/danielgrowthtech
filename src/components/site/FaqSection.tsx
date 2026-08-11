import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GENERAL_FAQS } from "@/lib/site-content";
import { Reveal } from "./ui";

export function FaqSection() {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].slice(-2),
    );

  return (
    <section className="section-pad" id="faq">
      <div className="container-lg">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs tracking-[0.25em] text-gold uppercase">FAQ</div>
          <h2 className="mt-3 text-3xl md:text-5xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10 md:mt-14">
          {GENERAL_FAQS.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                >
                  <span className="text-sm font-medium md:text-base">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="grid overflow-hidden px-5 text-sm text-muted-foreground transition-all duration-300 ease-out md:px-6"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    paddingBottom: isOpen ? "1.25rem" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="min-h-0 overflow-hidden leading-relaxed">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center md:p-10">
            <h3 className="text-2xl md:text-3xl">Have more questions?</h3>
            <p className="mt-3 text-muted-foreground">
              Let's discuss your ecommerce growth goals.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/contact" className="btn-primary">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
