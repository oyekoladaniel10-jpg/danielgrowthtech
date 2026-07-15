import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/portrait.jpg";
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BarChart3 } from "lucide-react";
import { WHY, PROCESS } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SigmaConsultantFair.pro" },
      { name: "description", content: "12+ years scaling ecommerce brands across four continents — a senior operator for ambitious DTC, marketplace and B2B stores." },
      { property: "og:title", content: "About — SigmaConsultantFair.pro" },
      { property: "og:description", content: "Meet the senior operator behind the growth work." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Shell>
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container-lg grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-brand/30 to-gold/20 blur-2xl" />
              <img
                src={portrait}
                alt="Founder portrait"
                width={900}
                height={1100}
                loading="eager"
                className="relative w-full rounded-3xl border border-white/10 object-cover"
              />
              <div className="glass-strong absolute -bottom-6 right-4 w-56 rounded-2xl p-4">
                <div className="text-2xl gradient-text">12+ yrs</div>
                <div className="text-xs tracking-widest text-muted-foreground uppercase">Ecommerce growth</div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="text-xs tracking-[0.25em] text-gold uppercase">About</div>
              <h1 className="mt-3 text-4xl md:text-6xl">
                A senior operator for <span className="gradient-text">ambitious ecommerce brands.</span>
              </h1>
              <p className="mt-5 text-muted-foreground">
                I partner with founders and CMOs to build durable, profitable growth systems.
                After 12+ years scaling DTC, marketplace and B2B brands across four continents,
                my work is defined by clarity, commercial rigour and quiet execution.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Mission", d: "Turn ecommerce brands into category leaders through data-driven growth." },
                { t: "Values", d: "Rigour, transparency, craft, and long-term partnership." },
                { t: "Why us", d: "Senior specialists, commercial thinking, and full-funnel execution." },
                { t: "Industries", d: "Fashion, beauty, home, luxury, B2B and everything in between." },
              ].map((b) => (
                <div key={b.t} className="card-lux">
                  <div className="text-sm tracking-widest text-gold uppercase">{b.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lg">
          <SectionHeader eyebrow="Why Choose Us" title={<>Eight reasons brands <span className="gradient-text">stay for years.</span></>} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 60}>
                <div className="card-lux h-full">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-gold">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">{w.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lg">
          <SectionHeader eyebrow="Process" title={<>An <span className="gradient-text">eight-step</span> operating rhythm.</>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <div className="card-lux flex gap-5">
                  <div className="text-4xl font-display gradient-text">{p.n}</div>
                  <div>
                    <h3 className="text-xl">{p.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={<>Ready to <span className="gradient-text">work together?</span></>}
        sub="Let's talk about your brand, goals and next milestone."
      />
    </Shell>
  );
}
