import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BarChart3, Check, X } from "lucide-react";
import { useState } from "react";
import { WHY, VALUES, INDUSTRIES, BRAND } from "@/lib/site-content";
import portraitAsset from "@/assets/owner-certificate.jpg.asset.json";

const portrait = portraitAsset.url;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Danielgrowth" },
      { name: "description", content: "Meet Oyekola Daniel Gafar, founder of Danielgrowth. Partnering with ecommerce brands to increase qualified traffic, conversions and long-term profitability." },
      { property: "og:title", content: "About | Danielgrowth" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Ecommerce Sales Growth Expert, helping ambitious brands scale sustainably." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [zoom, setZoom] = useState(false);
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
              <button
                type="button"
                onClick={() => setZoom(true)}
                aria-label="View profile photo full size"
                className="relative block w-full cursor-zoom-in"
              >
                <img
                  src={portrait}
                  alt="Portrait of Oyekola Daniel Gafar, founder of Danielgrowth"
                  width={960}
                  height={1280}
                  loading="eager"
                  className="relative w-full rounded-3xl border border-white/10 object-cover object-top"
                />
              </button>
              <div className="glass-strong pointer-events-none absolute -bottom-4 right-3 rounded-xl px-3 py-2">
                <div className="text-sm gradient-text">Oyekola Daniel Gafar</div>
                <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Founder · Tap to enlarge</div>
              </div>
              {zoom && (
                <div
                  role="dialog"
                  aria-label="Profile photo full size"
                  onClick={() => setZoom(false)}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4"
                >
                  <button
                    type="button"
                    aria-label="Close"
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img src={portrait} alt="Portrait of Oyekola Daniel Gafar" className="max-h-full max-w-full rounded-xl object-contain" />
                </div>
              )}
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="text-xs tracking-[0.25em] text-gold uppercase">About</div>
              <h1 className="mt-3 text-4xl md:text-6xl">
                Helping ambitious ecommerce brands achieve <span className="gradient-text">sustainable, profitable growth.</span>
              </h1>
              <p className="mt-5 text-muted-foreground">
                I'm Oyekola Daniel Gafar, an eCommerce growth specialist with 6+ years of experience helping online
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
