import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Play, Check, Target, MousePointerClick, Repeat, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaBanner } from "@/components/site/CtaBanner";
import { WaysToWork } from "@/components/site/WaysToWork";
import { VideoCard, Lightbox } from "@/components/site/VideoCard";
import { CaseVideoCard } from "@/components/site/CaseVideoCard";

import { ShopifyLogo, AmazonWordmark, KlaviyoLogo, MetaWordmark, GoogleLogo, WooCommerceWordmark } from "@/components/site/PlatformLogos";
import { BRAND, SERVICES, REFERENCES, PILLARS, REVIEWS } from "@/lib/site-content";
import { CASES } from "@/lib/case-assets";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jacob Growth | Ecommerce Sales Growth Expert" },
      { name: "description", content: "Jacob Growth helps ecommerce brands acquire, convert and retain customers through data-driven CRO, SEO, paid media and lifecycle marketing." },
      { property: "og:title", content: "Jacob Growth | Ecommerce Sales Growth Expert" },
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
    <section className="home-hero relative overflow-hidden pt-32 md:pt-40">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1200}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="home-hero-scrim pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
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
              and grow revenue, through CRO, SEO, paid media, email and analytics engineered for
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
            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
              {[
                { v: "1.5K+", k: "Projects Delivered" },
                { v: "260+", k: "Happy Customers" },
                { v: "6+", k: "Years of Experience" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-2xl px-3 py-4 text-center sm:px-5 sm:py-5">
                  <div className="gradient-text text-xl font-semibold sm:text-2xl md:text-3xl">{s.v}</div>
                  <div className="mt-1.5 text-[10px] leading-snug tracking-[0.14em] text-muted-foreground uppercase sm:text-xs">
                    {s.k}
                  </div>
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
              A senior growth partner, not another <span className="gradient-text">agency middleman.</span>
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
                opportunities, and build practical strategies around their specific goals, whether
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
  { name: "Shopify", Logo: ShopifyLogo, size: "h-11 w-11", color: "#7AB55C" },
  { name: "Amazon", Logo: AmazonWordmark, size: "h-11 w-24", color: "#F5F7FA" },
  { name: "Klaviyo", Logo: KlaviyoLogo, size: "h-10 w-28", color: "#101827", featured: true },
  { name: "Meta Ads", Logo: MetaWordmark, size: "h-11 w-28", color: "#F5F7FA" },
  { name: "Google Ads", Logo: GoogleLogo, size: "h-11 w-11", color: "#F5F7FA" },
  { name: "WooCommerce", Logo: WooCommerceWordmark, size: "h-10 w-32", color: "#F5F7FA" },
];

function Platforms() {
  return (
    <section className="py-[88px] md:py-28">
      <div className="container-lg">
        <Reveal>
          <h2 className="text-center text-[11px] font-normal uppercase tracking-[0.42em] text-muted-foreground md:text-[13px]">
            Trusted by Leading Platforms
          </h2>
        </Reveal>
        <div className="platform-strip mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6 lg:gap-2">
          {TRUST_PLATFORMS.map(({ name, Logo, size, color, featured }, i) => (
            <Reveal key={name} delay={i * 50}>
              <div className={`platform-item group flex min-h-32 flex-col items-center justify-center gap-4 rounded-lg border px-3 py-5 text-center ${featured ? "platform-item-featured" : "border-transparent"}`}>
                <div className="flex h-12 w-full items-center justify-center">
                  <Logo className={`${size} max-w-full`} style={{ color }} />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{name}</span>
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
    <section className="pillars-section section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Growth Pillars"
          title={<>A complete system for <span className="gradient-text">scaling ecommerce.</span></>}
          sub="Three integrated pillars working together to compound revenue, not siloed tactics."
        />
        <div className="pillars-grid mt-14 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <article key={p.t} className="pillar-card">
                <div className="pillar-icon glass grid h-12 w-12 place-items-center rounded-2xl">
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
  const preview = HOME_SERVICES.flatMap((title) => {
    const service = SERVICES.find((item) => item.title === title);
    return service ? [service] : [];
  });
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

/* ---------------- Featured Cases ---------------- */
function FeaturedCases() {
  const featured = CASES;
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Case Studies"
          title={<>Featured <span className="gradient-text">case studies.</span></>}
          sub="Real ecommerce brands, real stores, real results."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <CaseVideoCard
                poster={c.poster}
                website={c.website}
                industry={c.industry}
                slug={c.slug}
                onPlay={() => setActive(i)}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/case-studies" className="btn-primary">
            View All Case Studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {active !== null && (
          <Lightbox src={featured[active].video} poster={featured[active].poster} onClose={() => setActive(null)} />
        )}
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


/* ---------------- Client Reviews ---------------- */
function ClientReviews() {
  const [active, setActive] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

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

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const step = card.offsetWidth + 24;
    const next = ((i % REVIEWS.length) + REVIEWS.length) % REVIEWS.length;
    setIndex(next);
    track.scrollTo({ left: step * next, behavior: "smooth" });
  };

  useEffect(() => {
    if (active !== null) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((prev) => {
        const track = trackRef.current;
        const next = (prev + 1) % REVIEWS.length;
        if (track) {
          const card = track.children[0] as HTMLElement | undefined;
          if (card) track.scrollTo({ left: (card.offsetWidth + 24) * next, behavior: "smooth" });
        }
        return next;
      });
    }, 6000);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <section className="section-pad relative">
      <div className="container-lg">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase">
              <span className="text-gold">Verified Client Review</span>
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            </div>
            <h2 className="text-2xl md:text-4xl">
              Client <span className="gradient-text">Reviews</span>
            </h2>
            <p className="text-muted-foreground">
              Real, verified 5-star reviews from clients I've worked with. Tap any screenshot to view it larger.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" /> 5.0 average
              </span>
              <span className="opacity-40">/</span>
              <span>{REVIEWS.length} verified screenshots</span>
              <span className="opacity-40">/</span>
              <span>Global clients</span>
            </div>
          </div>
        </Reveal>

        <div
          className="mt-12"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onTouchStart={() => { pausedRef.current = true; }}
        >
          <div
            ref={trackRef}
            className="review-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {REVIEWS.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Open client review ${i + 1}`}
                className="group relative w-[85%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition hover:border-gold/40 sm:w-[46%] lg:w-[31.5%]"
              >
                <img
                  src={src}
                  alt={`Verified client review ${i + 1}`}
                  width={720}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous review"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex max-w-[60%] flex-wrap items-center justify-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-white/25"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next review"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/references"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-medium transition hover:bg-gold/10"
          >
            View Client References
          </Link>
        </div>
      </div>
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
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
            alt="Client review"
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
        sub="Book a free 30-minute strategy call, no obligation, just clarity."
        primaryLabel="Book a Free Consultation"
        secondaryLabel="View services"
        secondaryTo="/services"
      />
    </Shell>
  );
}
