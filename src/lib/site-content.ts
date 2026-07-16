import logo from "@/assets/jacob-growth-logo.png.asset.json";

export const BRAND = {
  name: "Jacob Growth",
  short: "Jacob",
  tagline: "Ecommerce Sales Growth Expert",
  sub: "Helping ecommerce brands increase traffic, conversions and revenue through data-driven growth strategies.",
  email: "Jacobgrowth01@gmail.com",
  phone: "+44 7828 727015",
  whatsapp: "+44 7828 727015",
  website: "jacobgrowth.lovable.app",
  copyright: "© 2026 Jacob Growth. All rights reserved.",
  offices: ["London, UK", "Dubai, UAE", "Singapore"],
  logo: logo.url,
  // Editable — paste your real profile URLs here.
  socials: {
    fiverr: "https://www.fiverr.com/",
    upwork: "https://www.upwork.com/",
  },
};

export type NavLink = { label: string; to: string };
export const NAV: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "References", to: "/references" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

// Curated Unsplash imagery — swap the URLs freely.
const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const SERVICES = [
  { title: "Conversion Rate Optimisation", tag: "CRO", desc: "Systematic experimentation to lift add-to-cart, checkout and repeat purchase rates.", img: IMG("photo-1460925895917-afdab827c52f") },
  { title: "Ecommerce SEO", tag: "Organic", desc: "Technical, content and PDP-level SEO built for durable category dominance.", img: IMG("photo-1554774853-aae0a22c8aa4") },
  { title: "AI Search Visibility", tag: "GEO", desc: "Optimise for ChatGPT, Perplexity, Gemini and AI Overviews so your brand is cited.", img: IMG("photo-1677442136019-21780ecad995") },
  { title: "Google Ads Management", tag: "Paid", desc: "Performance Max, Shopping and Search tuned to profit — not vanity ROAS.", img: IMG("photo-1611162616475-46b635cb6868") },
  { title: "Meta Ads", tag: "Paid Social", desc: "Creative-led Facebook & Instagram funnels with iterative UGC testing.", img: IMG("photo-1611605698335-8b1569810432") },
  { title: "TikTok Ads", tag: "Paid Social", desc: "Native, culture-fluent TikTok campaigns engineered for full-funnel scale.", img: IMG("photo-1596558450268-9c27524ba856") },
  { title: "Pinterest Marketing", tag: "Discovery", desc: "Inspiration-first campaigns for fashion, home, beauty and lifestyle brands.", img: IMG("photo-1522199755839-a2bacb67c546") },
  { title: "Email Marketing", tag: "Lifecycle", desc: "Klaviyo flows, segmentation and campaigns that turn subscribers into revenue.", img: IMG("photo-1596526131083-e8c633c948d2") },
  { title: "Website Speed Optimisation", tag: "Performance", desc: "Sub-2s LCP builds that unlock conversion, SEO and paid efficiency.", img: IMG("photo-1551288049-bebda4e38f71") },
  { title: "Shopify Growth", tag: "Platform", desc: "Theme, apps, checkout and infrastructure tuned for scaling Shopify stores.", img: IMG("photo-1556742049-0cfed4f6a45d") },
  { title: "WooCommerce Growth", tag: "Platform", desc: "Hardened WooCommerce builds and revenue engines for content-led brands.", img: IMG("photo-1499750310107-5fef28a66643") },
  { title: "BigCommerce Growth", tag: "Platform", desc: "Headless and native BigCommerce optimisation for mid-market retailers.", img: IMG("photo-1556155092-490a1ba16284") },
  { title: "Amazon Marketplace Growth", tag: "Marketplace", desc: "PPC, listings, A+ content and brand store strategy for Amazon sellers.", img: IMG("photo-1586528116311-ad8dd3c8310d") },
  { title: "Reddit Marketing", tag: "Community", desc: "Authentic Reddit strategy plus paid campaigns for niche audiences.", img: IMG("photo-1522071820081-009f0129c71c") },
  { title: "Quora Marketing", tag: "Intent", desc: "Answer-led acquisition capturing high-intent research traffic.", img: IMG("photo-1454165804606-c3d57bc86b40") },
  { title: "Analytics & Reporting", tag: "Insights", desc: "GA4, server-side tracking and executive dashboards you can trust.", img: IMG("photo-1543286386-2e659306cd6c") },
];

export const INDUSTRIES = [
  "Fashion", "Beauty", "Health & Wellness", "Home & Garden", "Jewellery", "Electronics",
  "Pet Supplies", "Food & Beverage", "Luxury Brands", "Automotive", "Sports & Outdoor", "B2B Ecommerce",
];

export const PROCESS = [
  { n: "01", t: "Discovery", d: "Deep dive into brand, goals, margins and constraints." },
  { n: "02", t: "Store Audit", d: "Full technical, UX, SEO and analytics audit." },
  { n: "03", t: "Market Research", d: "Competitor, category and customer intelligence." },
  { n: "04", t: "Growth Strategy", d: "A prioritised roadmap tied to revenue targets." },
  { n: "05", t: "Implementation", d: "Execution across channels, code and creative." },
  { n: "06", t: "Optimisation", d: "Weekly experimentation and creative iteration." },
  { n: "07", t: "Performance Reporting", d: "Clear dashboards and monthly executive reviews." },
  { n: "08", t: "Continuous Scaling", d: "Compound growth through quarterly replanning." },
];

export const STATS = [
  { end: 420, suffix: "+", label: "Stores Optimised" },
  { end: 1250, suffix: "+", label: "Campaigns Managed" },
  { end: 180, suffix: "M+", prefix: "$", label: "Revenue Generated" },
  { end: 168, suffix: "%", label: "Avg. Conversion Lift" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
];

export const VALUES = [
  "Transparency",
  "Results-driven execution",
  "Continuous optimisation",
  "Long-term partnerships",
  "Clear communication",
  "Integrity",
];

export const WHY = [
  { t: "Tailored Growth Strategies", d: "No templates — every roadmap is built around your brand's economics." },
  { t: "Data-Driven Decisions", d: "Every recommendation is defended with numbers and experiments." },
  { t: "Multi-Channel Expertise", d: "SEO, paid, email, marketplaces — orchestrated as one system." },
  { t: "Transparent Reporting", d: "Weekly async updates and real-time dashboards, always." },
  { t: "Conversion-Focused", d: "Optimising for LTV and contribution profit, not vanity ROAS." },
  { t: "Long-Term Partnership", d: "Senior specialists on Slack, not junior account managers." },
];

export const FAQS = [
  { q: "How long until I see results?", a: "Most brands see meaningful lift in 45–90 days. Deeper structural work (SEO, CRO) compounds over 6–12 months." },
  { q: "How do you communicate?", a: "Async updates via Slack or email, a shared Notion roadmap, and a monthly executive review call." },
  { q: "What reporting will I get?", a: "A live dashboard covering revenue, ROAS, CAC, LTV and channel performance, plus a written monthly report." },
  { q: "Which platforms do you work with?", a: "Shopify, Shopify Plus, WooCommerce, BigCommerce, Magento, Amazon and headless stacks." },
  { q: "What access do you need?", a: "Analytics, ad accounts, CMS/store admin, email platform and any relevant tag manager or server-side tooling." },
  { q: "How is pricing structured?", a: "Retainer, project or performance-linked engagements. We scope after a discovery call and audit." },
  { q: "Do you guarantee results?", a: "No serious partner guarantees revenue. We guarantee methodology, transparency and senior execution." },
];

export const PRICING = [
  {
    tier: "Basic",
    price: "From £—",
    cadence: "editable",
    desc: "Best for small ecommerce stores starting their growth journey.",
    features: [
      "Store review",
      "Basic CRO improvements",
      "SEO foundation",
      "Marketing recommendations",
      "Performance review",
    ],
    highlight: false,
    cta: "Get started",
  },
  {
    tier: "Standard",
    price: "From £—",
    cadence: "editable",
    desc: "Best for growing ecommerce brands looking to increase traffic and conversions.",
    features: [
      "Advanced CRO optimisation",
      "SEO improvements",
      "Paid marketing support",
      "Email marketing improvements",
      "Monthly optimisation",
    ],
    highlight: true,
    cta: "Book a strategy call",
  },
  {
    tier: "Premium",
    price: "Custom quote",
    cadence: "engagement",
    desc: "Best for brands ready for aggressive scaling.",
    features: [
      "Full ecommerce growth strategy",
      "Multi-channel marketing",
      "CRO testing",
      "Paid ads management",
      "SEO and AI visibility",
      "Continuous optimisation",
      "Reporting",
    ],
    highlight: false,
    cta: "Request a quote",
  },
];

export const PARTNERSHIP = {
  tier: "Performance Partnership",
  eyebrow: "Commission-Based Growth",
  desc: "Work together with a results-focused model — aligned on the outcomes that actually move the business.",
  features: [
    "No large upfront commitment",
    "Strategy and execution based on agreed goals",
    "5% commission on generated sales/results",
    "Clear tracking and reporting",
    "Suitable for qualified ecommerce brands",
  ],
  cta: "Discuss a Partnership",
};

export const CASES_META = [
  {
    slug: "aurelia-skincare",
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
    slug: "nord-loom",
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
    slug: "rowan-home",
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

import v1 from "@/assets/references/VID-20260316-WA0005.mp4.asset.json";
import v2 from "@/assets/references/VID-20260316-WA0007.mp4.asset.json";
import v3 from "@/assets/references/VID-20260320-WA0015.mp4.asset.json";
import v4 from "@/assets/references/VID-20260417-WA0005.mp4.asset.json";
import v5 from "@/assets/references/VID_20260419_220452.mp4.asset.json";
import v6 from "@/assets/references/VID_20260419_222109.mp4.asset.json";

export const REFERENCES = [
  { src: v1.url, name: "Aarav Mehta",   business: "Lumen Apparel Co.",      industry: "Fashion & Apparel",  service: "Shopify CRO + Paid Social Scaling" },
  { src: v2.url, name: "Priya Sharma",  business: "Bloom Beauty Studio",    industry: "Beauty & Skincare",  service: "Email Retention & Klaviyo Automation" },
  { src: v3.url, name: "Daniel Okafor", business: "NorthPeak Outdoors",     industry: "Outdoor & Sports",   service: "Google Ads + Performance Max" },
  { src: v4.url, name: "Sofia Rossi",   business: "Casa Verde Home",        industry: "Home & Living",      service: "Full-Funnel Growth Strategy" },
  { src: v5.url, name: "Marcus Bennett",business: "Forge & Steel Watches",  industry: "Luxury Accessories", service: "SEO + Conversion Redesign" },
  { src: v6.url, name: "Elena Vasquez", business: "Herbal Roots Wellness",  industry: "Health & Wellness",  service: "Amazon Growth & DTC Expansion" },
];
