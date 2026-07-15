import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { VideoCard, Lightbox } from "@/components/site/VideoCard";
import { BRAND, SERVICES, INDUSTRIES, REFERENCES, STATS } from "@/lib/site-content";
import { CASES } from "@/lib/case-assets";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SigmaConsultantFair.pro — Ecommerce Sales Growth Expert" },
      { name: "description", content: "Data-driven ecommerce growth partner: CRO, SEO, paid media, email and analytics for ambitious DTC and marketplace brands." },
      { property: "og:title", content: "SigmaConsultantFair.pro — Ecommerce Sales Growth Expert" },
      { property: "og:description", content: "Data-driven ecommerce growth partner: CRO, SEO, paid media, email and analytics for ambitious DTC and marketplace brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroBg, fetchpriority: "high" } as any],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1200}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-brand/20 blur-[120px]" />
      <div className="container-lg relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Ecommerce growth · trusted worldwide
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-4xl leading-[1.05] sm:text-6xl md:text-7xl">
              <span className="gradient-text">Ecommerce Sales</span>
              <br />
              <span className="text-foreground">Growth Expert</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {BRAND.sub} From Shopify to Amazon — CRO, SEO, paid media, email and analytics engineered for compounding profit.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Book a strategy call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/case-studies" className="btn-ghost">View case studies</Link>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {["Shopify Plus", "Klaviyo", "Google Ads", "Meta Business"].map((t) => (
                <div key={t} className="glass rounded-2xl px-4 py-3 text-center text-xs tracking-widest text-muted-foreground uppercase">
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-3 sm:grid-cols-3">
          {[
            { k: "Avg. revenue lift", v: "+312%" },
            { k: "Avg. conversion lift", v: "+168%" },
            { k: "Client retention", v: "94%" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 120}>
              <div className="card-lux text-center">
                <div className="text-3xl gradient-text md:text-4xl">{s.v}</div>
                <div className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">{s.k}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const preview = SERVICES.slice(0, 6);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Services"
          title={<>A full growth stack under <span className="gradient-text">one roof.</span></>}
          sub="Sixteen specialised practices, orchestrated as one performance system."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <article className="card-lux group flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-widest text-gold uppercase">{s.tag}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="btn-ghost">View all services <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function IndustriesPreview() {
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Industries"
          title={<>Trusted across <span className="gradient-text">high-consideration categories.</span></>}
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.slice(0, 8).map((i, idx) => (
            <Reveal key={i} delay={idx * 30}>
              <div className="glass flex items-center justify-between rounded-2xl px-5 py-5">
                <span className="font-medium">{i}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/industries" className="btn-ghost">All industries <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function CasesPreview() {
  const featured = CASES[0];
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Case Studies"
          title={<>Selected <span className="gradient-text">client wins.</span></>}
        />
        <Reveal>
          <article className="glass-strong mt-14 grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <img src={featured.img} alt={featured.client} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-8 md:p-10">
              <div className="text-xs tracking-widest text-gold uppercase">{featured.industry}</div>
              <h3 className="mt-2 text-3xl">{featured.client}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{featured.challenge}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {featured.results.map((r) => (
                  <div key={r.k} className="rounded-2xl border border-white/10 p-4 text-center">
                    <div className="text-2xl gradient-text">{r.v}</div>
                    <div className="text-[10px] tracking-widest text-muted-foreground uppercase">{r.k}</div>
                  </div>
                ))}
              </div>
              <Link to="/case-studies" className="mt-8 inline-flex items-center gap-2 text-sm text-gold hover:underline">
                See all case studies <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function ResultsStrip() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-brand/10 via-transparent to-transparent" />
      <div className="container-lg relative">
        <SectionHeader eyebrow="Results" title={<>Numbers that <span className="gradient-text">compound.</span></>} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="card-lux text-center">
                <div className="text-3xl gradient-text md:text-4xl">
                  {s.prefix ?? ""}{s.end.toLocaleString()}{s.suffix ?? ""}
                </div>
                <div className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedReference() {
  const [open, setOpen] = useState(false);
  const featured = REFERENCES[0];
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Client References"
          title={<>Hear it from <span className="gradient-text">the founders.</span></>}
          sub="Authentic video stories from ecommerce brands we've partnered with."
        />
        <div className="mx-auto mt-14 max-w-3xl">
          <VideoCard data={featured} onOpen={() => setOpen(true)} />
        </div>
        <div className="mt-10 text-center">
          <Link to="/references" className="btn-primary">
            <Play className="h-4 w-4" /> View all Client References
          </Link>
        </div>
        {open && <Lightbox src={featured.src} onClose={() => setOpen(false)} />}
      </div>
    </section>
  );
}

function Home() {
  return (
    <Shell>
      <Hero />
      <ServicesPreview />
      <IndustriesPreview />
      <CasesPreview />
      <ResultsStrip />
      <FeaturedReference />
      <CtaBanner
        title={<>Let's build your <span className="gradient-text">next growth chapter.</span></>}
        sub="Book a free 30-minute strategy call — no obligation, just clarity."
        secondaryLabel="View services"
        secondaryTo="/services"
      />
    </Shell>
  );
}
