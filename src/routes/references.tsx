import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";

import v1 from "@/assets/references/VID-20260316-WA0005.mp4.asset.json";
import v2 from "@/assets/references/VID-20260316-WA0007.mp4.asset.json";
import v3 from "@/assets/references/VID-20260320-WA0015.mp4.asset.json";
import v4 from "@/assets/references/VID-20260417-WA0005.mp4.asset.json";
import v5 from "@/assets/references/VID_20260419_220452.mp4.asset.json";
import v6 from "@/assets/references/VID_20260419_222109.mp4.asset.json";

// ============================================================
// EDITABLE: Replace with your real client details & video URLs
// ============================================================
const REFERENCES = [
  {
    src: v1.url,
    name: "Aarav Mehta",
    business: "Lumen Apparel Co.",
    industry: "Fashion & Apparel",
    service: "Shopify CRO + Paid Social Scaling",
  },
  {
    src: v2.url,
    name: "Priya Sharma",
    business: "Bloom Beauty Studio",
    industry: "Beauty & Skincare",
    service: "Email Retention & Klaviyo Automation",
  },
  {
    src: v3.url,
    name: "Daniel Okafor",
    business: "NorthPeak Outdoors",
    industry: "Outdoor & Sports",
    service: "Google Ads + Performance Max",
  },
  {
    src: v4.url,
    name: "Sofia Rossi",
    business: "Casa Verde Home",
    industry: "Home & Living",
    service: "Full-Funnel Growth Strategy",
  },
  {
    src: v5.url,
    name: "Marcus Bennett",
    business: "Forge & Steel Watches",
    industry: "Luxury Accessories",
    service: "SEO + Conversion Redesign",
  },
  {
    src: v6.url,
    name: "Elena Vasquez",
    business: "Herbal Roots Wellness",
    industry: "Health & Wellness",
    service: "Amazon Growth & DTC Expansion",
  },
];

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: [
      { title: "Client References — SigmaConsultantFair.pro" },
      {
        name: "description",
        content:
          "Watch real video testimonials from ecommerce brands we've helped scale — DTC founders sharing their growth stories.",
      },
      { property: "og:title", content: "Client References — SigmaConsultantFair.pro" },
      {
        property: "og:description",
        content: "Authentic video references from ecommerce clients we've partnered with.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReferencesPage,
});

function ReferencesPage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40 py-5">
        <div className="container-lg">
          <div className="glass-strong flex items-center justify-between rounded-full px-4 py-2.5 md:px-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-brand to-gold font-display text-lg text-primary-foreground">
                Σ
              </div>
              <span className="hidden text-sm font-medium tracking-wide sm:inline">
                SigmaConsultantFair.pro
              </span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                to="/"
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to="/references"
                className="rounded-full px-3 py-1.5 text-sm text-foreground"
              >
                Client References
              </Link>
            </nav>
            <Link to="/" hash="contact" className="btn-primary text-sm">
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="section-pad relative overflow-hidden pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--emerald-brand) 25%, transparent), transparent 70%)",
          }}
        />
        <div className="container-lg text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-brand" />
            Real Clients · Real Results
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Client <span className="gradient-text">References</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            Honest, unscripted video stories from ecommerce founders we've partnered
            with — sharing the strategy, the work, and the growth that followed.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="container-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {REFERENCES.map((r, i) => (
              <VideoCard key={i} data={r} onOpen={() => setActive(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-lg">
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-60"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 100%, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)",
              }}
            />
            <h2 className="mx-auto max-w-3xl text-balance text-4xl md:text-5xl">
              Ready to become our next <span className="gradient-text">success story</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let's map a growth plan tailored to your store — no obligation, just clarity.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" hash="contact" className="btn-primary">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="btn-ghost">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="container-lg text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SigmaConsultantFair.pro — All rights reserved.
        </div>
      </footer>

      {/* Lightbox */}
      {active !== null && (
        <Lightbox src={REFERENCES[active].src} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

function VideoCard({
  data,
  onOpen,
}: {
  data: (typeof REFERENCES)[number];
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={containerRef}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.02] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition duration-500 hover:-translate-y-1 hover:border-emerald-brand/40 hover:shadow-[0_30px_60px_-25px_color-mix(in_oklab,var(--emerald-brand)_45%,transparent)]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Play video from ${data.name}`}
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        {inView ? (
          <video
            ref={videoRef}
            src={data.src}
            preload="metadata"
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-surface" />
        )}
        {/* Subtle tint only — keeps thumbnail crisp */}
        <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/5" />
        {/* Play button */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-2xl backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:bg-white md:h-20 md:w-20">
            <Play className="ml-1 h-6 w-6 fill-background text-background md:h-8 md:w-8" />
          </div>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-6 md:p-7">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-brand">
          {data.industry}
        </div>
        <h3 className="text-2xl leading-tight">{data.name}</h3>
        <div className="text-sm text-muted-foreground">{data.business}</div>
        <div className="mt-3 border-t border-white/5 pt-3 text-sm text-foreground/80">
          <span className="text-muted-foreground">Project: </span>
          {data.service}
        </div>
      </div>
    </article>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        style={{ aspectRatio: "16 / 9" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
