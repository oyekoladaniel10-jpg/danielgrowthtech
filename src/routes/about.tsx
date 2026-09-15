import { createFileRoute } from "@tanstack/react-router";
import portraitAsset from "@/assets/portrait-jacob-2.jpg.asset.json";
const portrait = portraitAsset.url;
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BarChart3, Check } from "lucide-react";
import { WHY, PROCESS, VALUES, INDUSTRIES, BRAND } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Jacob Growth" },
      { name: "description", content: "Meet Jacob, founder of Jacob Growth. Partnering with ecommerce brands to increase qualified traffic, conversions and long-term profitability." },
      { property: "og:title", content: "About | Jacob Growth" },
      { property: "og:description", content: "Ecommerce Sales Growth Expert, helping ambitious brands scale sustainably." },
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
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(60% 60% at 30% 20%, color-mix(in oklab, var(--emerald-brand) 22%, transparent), transparent 70%)",
                }}
              />
              <img
                src={portrait}
                alt="Jacob, founder of Jacob Growth"
                width={900}
                height={1100}
                loading="eager"
                className="relative w-full rounded-3xl border border-white/10 object-cover object-top"
              />
              <div className="glass-strong absolute -bottom-6 right-4 w-56 rounded-2xl p-4">
                <div className="text-2xl gradient-text">Jacob</div>
                <div className="text-xs tracking-widest text-muted-foreground uppercase">Founder</div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="text-xs tracking-[0.25em] text-gold uppercase">About</div>
              <h1 className="mt-3 text-4xl md:text-6xl">
                Helping ambitious ecommerce brands achieve <span className="gradient-text">sustainable, profitable growth.</span>
              </h1>
              <p className="mt-5 text-muted-foreground">
                I'm Jacob, an eCommerce growth specialist with 6+ years of experience helping online
                businesses improve their visibility, attract qualified customers, increase conversions,
                and grow revenue. From Western Africa and based in the United Kingdom, I work remotely
                with eCommerce businesses across the UK, US, Canada, Australia, and other countries, so
                no matter where you're located, we can work together smoothly. My approach is focused
                on clear strategy, measurable results, and sustainable growth.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card-lux">
                <div className="text-sm tracking-widest text-gold uppercase">Mission</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  To help ecommerce businesses grow with proven strategies that increase traffic,
                  conversions and long-term profitability.
                </p>
              </div>
              <div className="card-lux">
                <div className="text-sm tracking-widest text-gold uppercase">Values</div>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {VALUES.map((v) => (
                    <li key={v} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-brand" /> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-lg">
          <SectionHeader eyebrow="Why Work With Me" title={<>Six reasons brands <span className="gradient-text">stay for years.</span></>} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <SectionHeader eyebrow="Industries" title={<>Categories I <span className="gradient-text">work with.</span></>} />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((i, idx) => (
              <Reveal key={i} delay={idx * 30}>
                <div className="glass flex h-full items-center justify-between rounded-2xl px-5 py-4">
                  <span className="font-medium">{i}</span>
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
