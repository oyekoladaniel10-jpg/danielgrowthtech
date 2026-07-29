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
              <div
                key={f.q}
                className={`relative transition-colors duration-300 ${isOpen ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 top-3 bottom-3 w-px origin-center bg-gold transition-transform duration-500 ease-out ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-300 md:px-6"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-300 md:text-base ${isOpen ? "text-gold" : "text-foreground"}`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-gold/40 bg-gold/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 text-gold transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                  </span>
                </button>
                <div
                  className="grid px-5 text-sm text-muted-foreground md:px-6"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    paddingBottom: isOpen ? "1.25rem" : "0",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows .45s cubic-bezier(0.22,1,0.36,1), padding-bottom .45s cubic-bezier(0.22,1,0.36,1), opacity .35s ease",
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className="max-w-prose leading-relaxed transition-transform duration-500"
                      style={{
                        transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur md:p-10">
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
