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
  offices: [
    { country: "United Kingdom", flag: "🇬🇧" },
    { country: "United States", flag: "🇺🇸" },
    { country: "Canada", flag: "🇨🇦" },
    { country: "Germany", flag: "🇩🇪" },
  ],
  logo: logo.url,
  // Editable — paste your real profile URLs here.
  socials: {
    fiverr: "https://www.fiverr.com/jacobgrowth1?source=inbox",
    upwork: "https://www.upwork.com/",
  },
};

export type NavLink = { label: string; to: string };
export const NAV: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Contact", to: "/contact" },
];

export const PLATFORMS = [
  "Shopify", "WooCommerce", "BigCommerce", "Amazon", "Google Ads", "Meta", "Klaviyo",
];

export const PILLARS = [
  {
    t: "Acquire",
    d: "Bring the right buyers to your store through paid ads, SEO and AI search visibility.",
    items: ["Google & Meta Ads", "Ecommerce SEO", "AI Search (GEO)"],
  },
  {
    t: "Convert",
    d: "Turn visits into revenue with CRO, high-performing landing pages and fast site speed.",
    items: ["CRO Experimentation", "Landing Page Design", "Speed Optimisation"],
  },
  {
    t: "Retain",
    d: "Increase LTV and repeat purchases through lifecycle email and SMS marketing.",
    items: ["Klaviyo Flows", "SMS Campaigns", "Segmentation & Win-back"],
  },
];

export const MINI_PROCESS = [
  { n: "01", t: "Audit",     d: "A deep review of your store, funnel, analytics and channels to expose the real growth levers." },
  { n: "02", t: "Strategy",  d: "A prioritised roadmap tied to revenue targets — clear scope, timeline and expected impact." },
  { n: "03", t: "Execution", d: "Senior hands-on delivery across CRO, SEO, paid, email and analytics — measured weekly." },
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
    price: "£200",
    cadence: "one-time",
    desc: "Best for small ecommerce stores starting their growth journey.",
    features: [
      "Full store review & audit",
      "Basic CRO improvements",
      "SEO foundation setup",
      "Tailored growth recommendations",
      "30-day performance review",
    ],
    highlight: false,
    cta: "Contact",
  },
  {
    tier: "Standard",
    price: "£400",
    cadence: "one-time",
    desc: "Best for growing ecommerce brands looking to increase traffic and conversions.",
    features: [
      "Advanced CRO optimisation",
      "SEO improvements & on-page fixes",
      "Paid marketing setup & support",
      "Email marketing improvements",
      "Monthly optimisation session",
    ],
    highlight: true,
    cta: "Contact",
  },
  {
    tier: "Premium",
    price: "£900",
    cadence: "one-time",
    desc: "Best for brands ready for aggressive, multi-channel scaling.",
    features: [
      "Full ecommerce growth strategy",
      "Multi-channel marketing execution",
      "CRO experimentation & testing",
      "Paid ads management",
      "SEO & AI search visibility",
      "Continuous optimisation",
      "Executive reporting",
    ],
    highlight: false,
    cta: "Contact",
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
    slug: "marketing-growth",
    client: "Marketing Growth Transformation",
    industry: "Shopify · Marketing",
    challenge: "Underperforming marketing channels producing inconsistent traffic and weak conversion signals.",
    strategy: "Rebuilt the marketing engine end-to-end: paid, organic, email, and creative — measured against contribution profit.",
    work: "Channel audit, funnel rebuild, creative testing, tracking and attribution.",
    results: [
      { k: "Sessions", v: "+22%" },
      { k: "Sales", v: "+53%" },
      { k: "Attributed", v: "+152%" },
    ],
  },
  {
    slug: "analytics-scaling",
    client: "Analytics & Revenue Scaling",
    industry: "Shopify · Analytics",
    challenge: "No trusted view of gross sales, returning customers or day-to-day revenue movement.",
    strategy: "Deployed executive-grade analytics: comparative reporting, retention tracking and daily revenue signals.",
    work: "GA4, server-side tracking, dashboards and weekly performance reviews.",
    results: [
      { k: "Gross Sales", v: "+3%" },
      { k: "Returning", v: "78%" },
      { k: "Orders", v: "+14%" },
    ],
  },
  {
    slug: "channels-attribution",
    client: "Multi-Channel Attribution Strategy",
    industry: "Shopify · Paid & Organic",
    challenge: "Spend spread across Google, Meta and Direct with no clarity on which channel drove real revenue.",
    strategy: "Rebuilt UTM architecture and cross-channel attribution to prioritise the highest-ROI mix.",
    work: "UTM strategy, paid restructure, organic uplift and channel-level reporting.",
    results: [
      { k: "Direct Sales", v: "£21k" },
      { k: "Organic", v: "£17k" },
      { k: "Conv. Rate", v: "2.11%" },
    ],
  },
  {
    slug: "customer-expansion",
    client: "Customer Base Expansion",
    industry: "Shopify · Lifecycle",
    challenge: "Stagnant list growth and low email subscription rate limiting repeat purchase revenue.",
    strategy: "Lifecycle overhaul: acquisition popups, subscription flows and segmentation for repeat buyers.",
    work: "Klaviyo flows, subscription capture, segmentation and win-back campaigns.",
    results: [
      { k: "Customers", v: "1,218" },
      { k: "Subscribed", v: "72%" },
      { k: "Repeat Rate", v: "+38%" },
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
  { src: v1.url, name: "Evelyn",       country: "United States",              flag: "🇺🇸", industry: "Ecommerce",   service: "Email & SMS Marketing Campaign Setup for Growth" },
  { src: v2.url, name: "Gisela",       country: "United States",              flag: "🇺🇸", industry: "Real Estate", service: "Lead Generation & Digital Marketing Strategy" },
  { src: v3.url, name: "Sal",          country: "Belgium",                    flag: "🇧🇪", industry: "Ecommerce",   service: "Ecommerce Growth Strategy & Store Optimisation" },
  { src: v4.url, name: "Alfred Taran", country: "United States (California)", flag: "🇺🇸", industry: "Real Estate", service: "Google Ads & CRM Automation for Lead Generation and Sales Growth" },
  { src: v5.url, name: "Josh",         country: "Australia",                  flag: "🇦🇺", industry: "Ecommerce",   service: "High-Converting Landing Page Design & Optimisation" },
  { src: v6.url, name: "Daniel",       country: "Canada",                     flag: "🇨🇦", industry: "Ecommerce",   service: "Facebook Ads Management, Content Strategy & CRM Integration" },
];
