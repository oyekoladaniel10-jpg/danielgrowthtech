import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Play, Check, Target, MousePointerClick, Repeat, Star, X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaBanner } from "@/components/site/CtaBanner";
import { WaysToWork } from "@/components/site/WaysToWork";
import { VideoCard, Lightbox } from "@/components/site/VideoCard";
import { FiverrIcon } from "@/components/site/social-icons";
import { ShopifyLogo, AmazonLogo, KlaviyoLogo, MetaLogo, GoogleAdsLogo, WooCommerceLogo } from "@/components/site/PlatformLogos";
import { BRAND, SERVICES, REFERENCES, PILLARS, MINI_PROCESS, REVIEWS } from "@/lib/site-content";
import { CASES } from "@/lib/case-assets";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jacob Growth — Ecommerce Sales Growth Expert" },
      { name: "description", content: "Jacob Growth helps ecommerce brands acquire, convert and retain customers through data-driven CRO, SEO, paid media and lifecycle marketing." },
      { property: "og:title", content: "Jacob Growth — Ecommerce Sales Growth Expert" },
      { property: "og:description", content: "Data-driven ecommerce growth partner for ambitious DTC and marketplace brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroBg, fetchPriority: "high" } as any],
  }),
  component: Home,
});

/* ---------------- Hero + About intro ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1200}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)",
        }}
      />

      <div className="container-lg relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Ecommerce growth · trusted worldwide
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-3xl leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl">
              Scale your store with a <span className="gradient-text">proven ecommerce growth partner.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              I help ambitious ecommerce brands increase qualified traffic, lift conversion rates
              and grow revenue — through CRO, SEO, paid media, email and analytics engineered for
              compounding profit.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/case-studies" className="btn-ghost">View case studies</Link>
              <Link to="/about" className="btn-ghost">About Me <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3">
              {[
                { k: "Revenue lift", v: "+312%" },
                { k: "Conv. lift", v: "+168%" },
                { k: "Retention", v: "94%" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-2xl px-3 py-3 text-center">
                  <div className="text-lg gradient-text md:text-xl">{s.v}</div>
                  <div className="mt-0.5 text-[10px] tracking-widest text-muted-foreground uppercase">{s.k}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Intro ---------------- */
function Intro() {
  return (
    <section className="section-pad">
      <div className="container-lg">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs tracking-[0.25em] text-gold uppercase">About Jacob</div>
            <h2 className="mt-3 text-2xl md:text-4xl">
              A senior growth partner — not another <span className="gradient-text">agency middleman.</span>
            </h2>
            <div className="mt-5 space-y-4 text-left text-muted-foreground md:text-center">
              <p>
                I'm Jacob, an eCommerce growth specialist with 6+ years of experience helping online
                businesses improve their visibility, attract qualified customers, increase conversions,
                and grow revenue.
              </p>
              <p>
                Based in the United Kingdom, I work remotely with eCommerce businesses across the UK,
                US, Canada, Australia, and other countries, so no matter where you're located, we can
                work together smoothly.
              </p>
              <p>
                I work closely with each client to understand their business, identify growth
                opportunities, and build practical strategies around their specific goals — whether
                that's improving their store, increasing qualified traffic, optimising conversion
                rates, or scaling their marketing channels.
              </p>
              <p>
                My approach is focused on clear strategy, measurable results, and sustainable growth.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Trusted Platforms ---------------- */
const TRUST_PLATFORMS = [
  { name: "Shopify", Logo: ShopifyLogo },
  { name: "Amazon", Logo: AmazonLogo },
  { name: "Klaviyo", Logo: KlaviyoLogo },
  { name: "Meta Ads", Logo: MetaLogo },
  { name: "Google Ads", Logo: GoogleAdsLogo },
  { name: "WooCommerce", Logo: WooCommerceLogo },
];

function Platforms() {
  return (
    <section className="pb-20">
      <div className="container-lg">
        <Reveal>
          <div className="text-center text-[11px] tracking-[0.3em] text-muted-foreground uppercase md:text-xs">
            Trusted by Leading Platforms
          </div>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-12 sm:gap-x-16">
          {TRUST_PLATFORMS.map(({ name, Logo }, i) => (
            <Reveal key={name} delay={i * 60}>
              <div className="group flex flex-col items-center gap-3 text-center transition duration-300 hover:scale-[1.04]">
                <Logo className="h-12 w-12 opacity-80 transition duration-300 group-hover:opacity-100 md:h-14 md:w-14" />
                <span className="text-sm tracking-wide text-muted-foreground transition group-hover:text-foreground md:text-base">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3 Growth Pillars ---------------- */
const PILLAR_ICONS = [Target, MousePointerClick, Repeat];
function Pillars() {
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Growth Pillars"
          title={<>A complete system for <span className="gradient-text">scaling ecommerce.</span></>}
          sub="Three integrated pillars working together to compound revenue — not siloed tactics."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <Reveal key={p.t} delay={i * 80}>
                <article className="card-lux flex h-full flex-col">
                  <div className="glass grid h-12 w-12 place-items-center rounded-2xl">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-6 text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
                  <ul className="mt-5 space-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured Services ---------------- */
const HOME_SERVICES = [
  "AI Search Visibility",
  "Google Ads Management",
  "Meta Ads",
  "TikTok Ads",
  "Website Speed Optimisation",
  "Amazon Marketplace Growth",
];

function FeaturedServices() {
  const preview = HOME_SERVICES.map((t) => SERVICES.find((s) => s.title === t)!).filter(Boolean);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Services"
          title={<>A full growth stack under <span className="gradient-text">one roof.</span></>}
          sub="Twelve specialised practices, orchestrated as one performance system."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <article className="card-lux group flex h-full flex-col overflow-hidden !p-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy" decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-[color-mix(in_oklab,var(--background)_82%,white_6%)] px-2.5 py-1 text-[10px] tracking-widest text-gold uppercase">
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl md:text-2xl">{s.title}</h3>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                </div>
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

/* ---------------- Featured Case ---------------- */
function FeaturedCases() {
  const featured = CASES[0];
  const [open, setOpen] = useState(false);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Case Studies"
          title={<>Featured <span className="gradient-text">case study.</span></>}
          sub="Real ecommerce brands, real stores, real results."
        />
        <div className="mt-14 mx-auto max-w-4xl">
          <Reveal>
            <article className="group card-lux flex h-full flex-col overflow-hidden p-0">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Play ${featured.website} case study video`}
                className="relative block w-full overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
              >
                <video
                  src={featured.video}
                  preload="none"
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/0">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white/95 shadow-2xl transition group-hover:scale-110 md:h-24 md:w-24">
                    <Play className="ml-1 h-8 w-8 fill-background text-background md:h-10 md:w-10" />
                  </div>
                </div>
              </button>
              <div className="flex flex-1 flex-col gap-2 p-6 md:p-8">
                <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-widest text-gold uppercase">
                  {featured.industry}
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl">{featured.website}</h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: featured.slug }}
                    className="btn-ghost transition group-hover:border-gold/50 group-hover:text-gold"
                  >
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/case-studies" className="btn-primary">
                    View All Case Studies <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
        {open && <Lightbox src={featured.video} onClose={() => setOpen(false)} />}
      </div>
    </section>
  );
}


/* ---------------- Featured References ---------------- */
function FeaturedReferences() {
  const [active, setActive] = useState<number | null>(null);
  const featured = REFERENCES.slice(0, 3);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Client References"
          title={<>Hear it from <span className="gradient-text">the founders.</span></>}
          sub="Authentic video stories from ecommerce brands we've partnered with."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {featured.map((r, i) => (
            <VideoCard key={i} data={r} onOpen={() => setActive(i)} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/references" className="btn-ghost">
            <Play className="h-4 w-4" /> View all references
          </Link>
        </div>
        {active !== null && <Lightbox src={featured[active].src} onClose={() => setActive(null)} />}
      </div>
    </section>
  );
}


/* ---------------- Client Reviews (Fiverr screenshots) ---------------- */
function ClientReviews() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase">
              <FiverrIcon className="h-4 w-4 text-[#1DBF73]" />
              <span className="text-[#1DBF73]">Verified Fiverr Review</span>
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            </div>
            <h2 className="text-2xl md:text-4xl">
              Client <span className="gradient-text">Reviews</span>
            </h2>
            <p className="text-muted-foreground">
              Real, verified 5-star reviews from clients on my Fiverr profile — tap any screenshot to view it larger.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.slice(0, 3).map((src, i) => (
            <Reveal key={i} delay={i * 40}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition hover:-translate-y-1 hover:border-gold/40"
              >
                <img
                  src={src}
                  alt={`Fiverr review ${i + 1}`}
                  loading="lazy" decoding="async"
                  className="h-full w-full object-contain"
                />
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={BRAND.socials.fiverr}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1DBF73] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#19a866]"
          >
            <FiverrIcon className="h-4 w-4" /> View My Fiverr Profile <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={REVIEWS[active]}
            alt="Fiverr review"
            className="max-h-[90vh] max-w-full rounded-xl bg-white object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function Home() {
  return (
    <Shell>
      <Hero />
      <Intro />
      <Platforms />
      <Pillars />
      <FeaturedServices />
      <FeaturedCases />
      <FeaturedReferences />
      <ClientReviews />
      <WaysToWork />
      <FaqSection />
      <CtaBanner
        title={<>Let's build your <span className="gradient-text">next growth chapter.</span></>}
        sub="Book a free 30-minute strategy call — no obligation, just clarity."
        primaryLabel="Book a Free Consultation"
        secondaryLabel="View services"
        secondaryTo="/services"
      />
    </Shell>
  );
}
