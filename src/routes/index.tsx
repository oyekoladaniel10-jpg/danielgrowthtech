import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Play, Check, Target, MousePointerClick, Repeat, Mail, Phone, MessageCircle, Star, X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import portraitAsset from "@/assets/portrait-jacob.jpg.asset.json";
import { Shell } from "@/components/site/Shell";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { VideoCard, Lightbox } from "@/components/site/VideoCard";
import { FiverrIcon } from "@/components/site/social-icons";
import { BRAND, SERVICES, REFERENCES, PLATFORMS, PILLARS, MINI_PROCESS, REVIEWS, WHATSAPP_URL } from "@/lib/site-content";
import { CASES } from "@/lib/case-assets";

const portrait = portraitAsset.url;

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
    links: [{ rel: "preload", as: "image", href: heroBg, fetchpriority: "high" } as any],
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
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />

      <div className="container-lg relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <Reveal>
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Ecommerce growth · trusted worldwide
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Scale your store with a <span className="gradient-text">proven ecommerce growth partner.</span>
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                I help ambitious ecommerce brands increase qualified traffic, lift conversion rates
                and grow revenue — through CRO, SEO, paid media, email and analytics engineered for
                compounding profit.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-primary">
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={BRAND.socials.fiverr}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1DBF73] px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-[#19a866]"
                >
                  <FiverrIcon className="h-4 w-4" /> Hire Me on Fiverr
                </a>
                <Link to="/case-studies" className="btn-ghost">View case studies</Link>
              </div>
            </Reveal>
            <Reveal delay={420}>
              <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
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

          <Reveal delay={200}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 to-white/5 blur-2xl" />
              <img
                src={portrait}
                alt="Jacob — founder of Jacob Growth"
                width={800}
                height={1000}
                loading="eager"
                className="relative aspect-[4/5] w-full rounded-[2rem] border border-white/10 object-cover object-top shadow-2xl"
              />
              <div className="glass-strong absolute -bottom-5 -left-4 rounded-2xl px-4 py-3">
                <div className="text-sm font-medium">Jacob</div>
                <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Founder · {BRAND.name}</div>
              </div>
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
            <div className="text-xs tracking-[0.25em] text-gold uppercase">About {BRAND.name}</div>
            <h2 className="mt-3 text-3xl md:text-5xl">
              A senior growth partner — not another <span className="gradient-text">agency middleman.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              {BRAND.name} is a specialist ecommerce growth practice helping DTC and marketplace
              brands increase revenue through data-driven strategy and hands-on execution. Every
              engagement is led personally — no junior handoffs, no vanity metrics, just measurable
              growth built on transparent reporting and long-term partnership.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Trusted Platforms ---------------- */
function Platforms() {
  return (
    <section className="pb-16">
      <div className="container-lg">
        <Reveal>
          <div className="text-center text-xs tracking-[0.25em] text-muted-foreground uppercase">
            Trusted Platforms
          </div>
        </Reveal>
        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p} delay={i * 40}>
              <div className="glass grid h-14 place-items-center rounded-2xl px-4 text-sm tracking-wide">
                {p}
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
function FeaturedServices() {
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

/* ---------------- Featured Cases ---------------- */
function FeaturedCases() {
  const featured = CASES.slice(0, 4);
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Case Studies"
          title={<>Selected <span className="gradient-text">client wins.</span></>}
          sub="Real ecommerce brands, real dashboards, real revenue."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <article className="group card-lux flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
                  <img
                    src={c.img}
                    alt={c.client}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-widest text-gold uppercase">
                    {c.industry}
                  </span>
                  <h3 className="mt-4 text-xl md:text-2xl">{c.client}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.challenge}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      to="/case-studies/$slug"
                      params={{ slug: c.slug }}
                      className="btn-ghost w-full justify-center transition group-hover:border-gold/50 group-hover:text-gold"
                    >
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/case-studies" className="btn-ghost">All case studies <ArrowRight className="h-4 w-4" /></Link>
        </div>
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

/* ---------------- 3-step process ---------------- */
function Process() {
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="How We Work"
          title={<>A simple <span className="gradient-text">three-step</span> engagement.</>}
          sub="Clear scope, clear timeline, clear outcomes."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {MINI_PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <article className="card-lux flex h-full flex-col">
                <div className="text-xs tracking-[0.25em] text-gold uppercase">Step {s.n}</div>
                <h3 className="mt-3 text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
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
            <h2 className="text-3xl md:text-5xl">
              Client <span className="gradient-text">Reviews</span>
            </h2>
            <p className="text-muted-foreground">
              Real, verified 5-star reviews from clients on my Fiverr profile — tap any screenshot to view it larger.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((src, i) => (
            <Reveal key={i} delay={i * 40}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition hover:-translate-y-1 hover:border-gold/40"
              >
                <img
                  src={src}
                  alt={`Fiverr review ${i + 1}`}
                  loading="lazy"
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
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

/* ---------------- Contact preview ---------------- */
function ContactPreview() {
  return (
    <section className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's talk <span className="gradient-text">growth.</span></>}
          sub="Prefer a quick chat first? Reach out on any channel — I reply within one business day."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          <a href={`mailto:${BRAND.email}`} className="card-lux flex items-center gap-3 transition hover:border-gold/40">
            <Mail className="h-5 w-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Email</div>
              <div className="truncate text-sm">{BRAND.email}</div>
            </div>
          </a>
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="card-lux flex items-center gap-3 transition hover:border-gold/40">
            <Phone className="h-5 w-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Phone</div>
              <div className="truncate text-sm">{BRAND.phone}</div>
            </div>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="card-lux flex items-center gap-3 transition hover:border-gold/40">
            <MessageCircle className="h-5 w-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">WhatsApp</div>
              <div className="truncate text-sm">{BRAND.whatsapp}</div>
            </div>
          </a>
        </div>
        <div className="mt-10 text-center">
          <Link to="/contact" className="btn-primary">
            Contact <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
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
      <Process />
      <ContactPreview />
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
