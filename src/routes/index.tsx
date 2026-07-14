import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import portrait from "@/assets/portrait.jpg";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

/* ---------- Editable content ---------- */
const BRAND = {
  name: "SigmaConsultantFair.pro",
  short: "Sigma",
  tagline: "Ecommerce Sales Growth Expert",
  sub: "Helping ecommerce brands increase traffic, conversions and revenue through data-driven growth strategies.",
  email: "hello@sigmaconsultantfair.pro",
  phone: "+44 20 4525 8890",
  whatsapp: "+44 7000 000 000",
  website: "sigmaconsultantfair.pro",
  offices: ["London, UK", "Dubai, UAE", "Singapore"],
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#cases" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { title: "Conversion Rate Optimisation", tag: "CRO", desc: "Systematic experimentation to lift add-to-cart, checkout and repeat purchase rates." },
  { title: "Ecommerce SEO", tag: "Organic", desc: "Technical, content and PDP-level SEO built for durable category dominance." },
  { title: "AI Search Visibility", tag: "GEO", desc: "Optimise for ChatGPT, Perplexity, Gemini and AI Overviews so your brand is cited." },
  { title: "Google Ads Management", tag: "Paid", desc: "Performance Max, Shopping and Search tuned to profit — not vanity ROAS." },
  { title: "Meta Ads", tag: "Paid Social", desc: "Creative-led Facebook & Instagram funnels with iterative UGC testing." },
  { title: "TikTok Ads", tag: "Paid Social", desc: "Native, culture-fluent TikTok campaigns engineered for full-funnel scale." },
  { title: "Pinterest Marketing", tag: "Discovery", desc: "Inspiration-first campaigns for fashion, home, beauty and lifestyle brands." },
  { title: "Email Marketing", tag: "Lifecycle", desc: "Klaviyo flows, segmentation and campaigns that turn subscribers into revenue." },
  { title: "Website Speed Optimisation", tag: "Performance", desc: "Sub-2s LCP builds that unlock conversion, SEO and paid efficiency." },
  { title: "Shopify Growth", tag: "Platform", desc: "Theme, apps, checkout and infrastructure tuned for scaling Shopify stores." },
  { title: "WooCommerce Growth", tag: "Platform", desc: "Hardened Woo builds and revenue engines for content-led brands." },
  { title: "BigCommerce Growth", tag: "Platform", desc: "Headless and native BigCommerce optimisation for mid-market retailers." },
  { title: "Amazon Marketplace Growth", tag: "Marketplace", desc: "PPC, listings, A+ content and brand store strategy for Amazon sellers." },
  { title: "Reddit Marketing", tag: "Community", desc: "Authentic Reddit strategy plus paid campaigns for niche audiences." },
  { title: "Quora Marketing", tag: "Intent", desc: "Answer-led acquisition capturing high-intent research traffic." },
  { title: "Analytics & Reporting", tag: "Insights", desc: "GA4, server-side tracking and executive dashboards you can trust." },
];

const INDUSTRIES = [
  "Fashion", "Beauty", "Health", "Home & Garden", "Jewellery", "Electronics",
  "Pet Supplies", "Food & Beverage", "Automotive", "Sports", "Luxury", "B2B Ecommerce",
];

const PROCESS = [
  { n: "01", t: "Discovery", d: "Deep dive into brand, goals, margins and constraints." },
  { n: "02", t: "Store Audit", d: "Full technical, UX, SEO and analytics audit." },
  { n: "03", t: "Market Research", d: "Competitor, category and customer intelligence." },
  { n: "04", t: "Growth Strategy", d: "A prioritised roadmap tied to revenue targets." },
  { n: "05", t: "Implementation", d: "Execution across channels, code and creative." },
  { n: "06", t: "Optimisation", d: "Weekly experimentation and creative iteration." },
  { n: "07", t: "Performance Reporting", d: "Clear dashboards and monthly executive reviews." },
  { n: "08", t: "Continuous Scaling", d: "Compound growth through quarterly replanning." },
];

const CASES = [
  {
    img: case1,
    client: "Aurelia Skincare",
    industry: "Beauty · DTC",
    challenge: "Flat revenue despite rising ad spend and 1.4% conversion rate.",
    strategy: "Full-funnel CRO, checkout rebuild, Klaviyo lifecycle overhaul and PMax restructure.",
    work: "Site speed, PDP redesign, offer architecture, creative testing.",
    results: [
      { k: "Traffic", v: "+248%" },
      { k: "Conversion", v: "+164%" },
      { k: "Revenue", v: "+412%" },
    ],
  },
  {
    img: case2,
    client: "Nord & Loom",
    industry: "Fashion · Shopify Plus",
    challenge: "Scaling paid past £250k/mo without eroding contribution margin.",
    strategy: "Profit-based bidding, creative studio partnership and email revenue engine.",
    work: "Meta + TikTok scale, Klaviyo, feed optimisation.",
    results: [
      { k: "Traffic", v: "+180%" },
      { k: "Conversion", v: "+92%" },
      { k: "Revenue", v: "+310%" },
    ],
  },
  {
    img: case3,
    client: "Rowan Home Co.",
    industry: "Home & Garden · WooCommerce",
    challenge: "Losing organic share to marketplaces and larger retailers.",
    strategy: "Programmatic SEO, category re-architecture and AI search optimisation.",
    work: "Technical SEO, 400+ landing pages, GEO strategy.",
    results: [
      { k: "Traffic", v: "+520%" },
      { k: "Conversion", v: "+58%" },
      { k: "Revenue", v: "+276%" },
    ],
  },
];

const STATS = [
  { end: 420, suffix: "+", label: "Stores Optimised" },
  { end: 1250, suffix: "+", label: "Campaigns Managed" },
  { end: 180, suffix: "M+", prefix: "$", label: "Revenue Generated" },
  { end: 168, suffix: "%", label: "Avg. Conversion Lift" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
];

const TESTIMONIALS = [
  {
    name: "Priya Shah", role: "CEO, Aurelia Skincare", quote:
      "The clearest, most commercial marketing partner we've ever worked with. Revenue is up 4x and forecasting is finally reliable.",
    logo: "AURELIA",
  },
  {
    name: "Marcus Bennett", role: "Founder, Nord & Loom", quote:
      "Every channel is dialled in. Creative, media and email finally speak to each other — and to our margin.",
    logo: "NORD·LOOM",
  },
  {
    name: "Elena Costa", role: "Head of Ecom, Rowan Home Co.", quote:
      "Sigma rebuilt our entire growth stack. Organic is compounding month over month and we've stopped over-relying on paid.",
    logo: "ROWAN",
  },
];

const WHY = [
  { t: "Tailored Strategies", d: "No templates. Every roadmap is built around your brand economics." },
  { t: "Data-Driven Decisions", d: "Every recommendation is defended with numbers and experiments." },
  { t: "Transparent Communication", d: "Weekly async updates and real-time dashboards, always." },
  { t: "Continuous Optimisation", d: "A relentless testing cadence across every channel." },
  { t: "Long-Term Growth", d: "We optimise for LTV and contribution profit, not vanity ROAS." },
  { t: "Multi-Channel Marketing", d: "SEO, paid, email, marketplaces — orchestrated as one system." },
  { t: "Performance Reporting", d: "Executive-grade dashboards you can share with your board." },
  { t: "Reliable Support", d: "Senior specialists on Slack, not junior account managers." },
];

const FAQS = [
  { q: "How long until I see results?", a: "Most brands see meaningful lift in 45–90 days. Deeper structural work (SEO, CRO) compounds over 6–12 months." },
  { q: "How do you communicate?", a: "Async updates via Slack or email, a shared Notion roadmap, and a monthly executive review call." },
  { q: "What reporting will I get?", a: "A live dashboard covering revenue, ROAS, CAC, LTV and channel performance, plus a written monthly report." },
  { q: "Which platforms do you work with?", a: "Shopify, Shopify Plus, WooCommerce, BigCommerce, Magento, Amazon and headless stacks." },
  { q: "What access do you need?", a: "Analytics, ad accounts, CMS/store admin, email platform and any relevant tag manager or server-side tooling." },
  { q: "How is pricing structured?", a: "Retainer, project or performance-linked engagements. We scope after a discovery call and audit." },
  { q: "Do you guarantee results?", a: "No serious partner guarantees revenue. We guarantee methodology, transparency and senior execution." },
];

/* ---------- Utility hooks ---------- */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { set(true); io.disconnect(); } },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return (
    <span ref={ref}>
      {prefix}{n.toLocaleString()}{suffix}
    </span>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Sections ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container-lg">
        <div className={`glass-strong flex items-center justify-between rounded-full px-4 py-2.5 md:px-6 ${scrolled ? "shadow-2xl" : ""}`}>
          <a href="#home" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-brand to-gold text-primary-foreground font-display text-lg">
              Σ
            </div>
            <span className="hidden text-sm font-medium tracking-wide sm:inline">
              {BRAND.name}
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.slice(0, 8).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="btn-primary hidden text-sm sm:inline-flex">
              Book a call <ArrowRight className="h-4 w-4" />
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                <span className={`h-px w-4 bg-foreground transition ${open ? "translate-y-1 rotate-45" : ""}`} />
                <span className={`h-px w-4 bg-foreground transition ${open ? "-translate-y-0 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="glass-strong mt-2 rounded-3xl p-4 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Book a call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 md:pt-44">
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
              <a href="#contact" className="btn-primary">
                Book a strategy call <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#cases" className="btn-ghost">
                View case studies
              </a>
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

        {/* Floating stat card */}
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

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs tracking-[0.25em] text-gold uppercase">{eyebrow}</div>
      <h2 className="mt-3 text-3xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-lg grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-brand/30 to-gold/20 blur-2xl" />
            <img
              src={portrait}
              alt="Founder portrait"
              width={900}
              height={1100}
              loading="lazy"
              className="relative w-full rounded-3xl border border-white/10 object-cover"
            />
            <div className="glass-strong absolute -bottom-6 -right-4 w-56 rounded-2xl p-4 sm:-right-8">
              <div className="text-2xl gradient-text">12+ yrs</div>
              <div className="text-xs tracking-widest text-muted-foreground uppercase">Ecommerce growth</div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <div className="text-xs tracking-[0.25em] text-gold uppercase">About</div>
            <h2 className="mt-3 text-3xl md:text-5xl">
              A senior operator for <span className="gradient-text">ambitious ecommerce brands.</span>
            </h2>
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
  );
}

function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="container-lg">
        <SectionHeader
          eyebrow="Services"
          title={<>A full growth stack under <span className="gradient-text">one roof.</span></>}
          sub="Sixteen specialised practices, orchestrated as one performance system across every channel that matters."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <article className="card-lux group flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-widest text-gold uppercase">
                    {s.tag}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-1.5 text-sm">
                  {["Overview", "Benefits", "Deliverables", "Expected outcomes"].map((li) => (
                    <li key={li} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-emerald-brand" /> {li}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm text-gold hover:underline">
                  Discuss this service <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Industries"
          title={<>Trusted across <span className="gradient-text">high-consideration categories.</span></>}
          sub="Deep, category-specific playbooks refined from hundreds of engagements."
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((i, idx) => (
            <Reveal key={i} delay={idx * 30}>
              <div className="glass group flex items-center justify-between rounded-2xl px-5 py-5 transition hover:border-gold/40">
                <span className="font-medium">{i}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-gold" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section-pad relative">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Process"
          title={<>An <span className="gradient-text">eight-step</span> operating rhythm.</>}
          sub="Predictable, repeatable, and defensible growth — engineered end to end."
        />
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
  );
}

function CaseStudies() {
  return (
    <section id="cases" className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Case Studies"
          title={<>Selected <span className="gradient-text">client wins.</span></>}
          sub="Real brands. Real revenue. Placeholder content — swap in your live case studies anytime."
        />
        <div className="mt-14 space-y-8">
          {CASES.map((c, i) => (
            <Reveal key={c.client} delay={i * 80}>
              <article className={`glass-strong grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-2 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className="relative aspect-[4/3] lg:aspect-auto lg:[direction:ltr]">
                  <img src={c.img} alt={c.client} width={1200} height={800} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-8 md:p-10 lg:[direction:ltr]">
                  <div className="text-xs tracking-widest text-gold uppercase">{c.industry}</div>
                  <h3 className="mt-2 text-3xl">{c.client}</h3>
                  <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    <p><span className="text-foreground">Challenge —</span> {c.challenge}</p>
                    <p><span className="text-foreground">Strategy —</span> {c.strategy}</p>
                    <p><span className="text-foreground">Work —</span> {c.work}</p>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {c.results.map((r) => (
                      <div key={r.k} className="rounded-2xl border border-white/10 p-4 text-center">
                        <div className="text-2xl gradient-text">{r.v}</div>
                        <div className="text-[10px] tracking-widest text-muted-foreground uppercase">{r.k}</div>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:underline">
                    Read the full story <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-brand/10 via-transparent to-transparent" />
      <div className="container-lg relative">
        <SectionHeader
          eyebrow="Results"
          title={<>Numbers that <span className="gradient-text">compound.</span></>}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="card-lux text-center">
                <div className="text-4xl gradient-text md:text-5xl">
                  <Counter end={s.end} prefix={s.prefix} suffix={s.suffix} />
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

function Testimonials() {
  return (
    <section id="testimonials" className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Words from the <span className="gradient-text">founders we serve.</span></>}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="card-lux flex h-full flex-col">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-brand to-gold text-primary-foreground font-display">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{t.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="ml-auto font-display text-xs tracking-widest text-muted-foreground">{t.logo}</div>
                </figcaption>
                <div className="glass mt-4 flex items-center justify-between rounded-xl px-3 py-2 text-xs text-muted-foreground">
                  Video testimonial <span className="text-gold">Coming soon</span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="Why Choose Us"
          title={<>Eight reasons brands <span className="gradient-text">stay for years.</span></>}
        />
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
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-pad">
      <div className="container-lg">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Answers to <span className="gradient-text">common questions.</span></>}
        />
        <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="grid overflow-hidden px-6 text-sm text-muted-foreground transition-all"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    paddingBottom: isOpen ? "1.25rem" : "0",
                  }}
                >
                  <div className="min-h-0 overflow-hidden">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[120px]" />
      <div className="container-lg relative grid gap-10 lg:grid-cols-2">
        <div>
          <div className="text-xs tracking-[0.25em] text-gold uppercase">Contact</div>
          <h2 className="mt-3 text-3xl md:text-5xl">
            Let's build your <span className="gradient-text">next growth chapter.</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Share a few details and I'll come back within one business day with next steps, a free audit outline and pricing indication.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <a href={`mailto:${BRAND.email}`} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Mail className="h-4 w-4 text-gold" /> {BRAND.email}
            </a>
            <a href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp {BRAND.whatsapp}
            </a>
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Phone className="h-4 w-4 text-gold" /> {BRAND.phone}
            </div>
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-gold" /> Global offices
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {BRAND.offices.map((o) => (
                  <span key={o} className="rounded-full border border-white/10 px-3 py-1 text-xs">
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass grid aspect-[16/9] place-items-center rounded-2xl text-xs tracking-widest text-muted-foreground uppercase">
              Google Map placeholder
            </div>
            <div className="flex gap-2">
              {[Instagram, Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="glass grid h-10 w-10 place-items-center rounded-full transition hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          className="glass-strong h-fit rounded-3xl p-6 md:p-8"
          onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch shortly."); }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Field label="Work email" name="email" type="email" required />
            <Field label="Brand / website" name="brand" />
            <Field label="Monthly revenue" name="rev" placeholder="$50k – $500k" />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs tracking-widest text-muted-foreground uppercase">
              How can I help?
            </label>
            <textarea
              name="msg"
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-gold/50"
              placeholder="Tell me about your brand, goals and current challenges…"
            />
          </div>
          <button type="submit" className="btn-primary mt-6 w-full">
            Send message <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Your details stay private. No sales spam, ever.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-gold/50"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-10">
      <div className="container-lg grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-brand to-gold text-primary-foreground font-display text-lg">Σ</div>
            <span className="font-medium">{BRAND.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Ecommerce growth partner for ambitious DTC, marketplace and B2B brands.
          </p>
        </div>
        <div>
          <div className="text-xs tracking-widest text-gold uppercase">Quick links</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.slice(0, 6).map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-foreground">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-widest text-gold uppercase">Services</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title}><a href="#services" className="hover:text-foreground">{s.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-widest text-gold uppercase">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{BRAND.email}</li>
            <li>{BRAND.phone}</li>
            <li>{BRAND.website}</li>
          </ul>
        </div>
      </div>
      <div className="container-lg mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Process />
        <CaseStudies />
        <Results />
        <Testimonials />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
