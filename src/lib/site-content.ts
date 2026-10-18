import logo from "@/assets/danielgrowth-logo.png";

export const BRAND = {
  name: "Danielgrowth",
  short: "Daniel",
  owner: "Oyekola Daniel Gafar",
  tagline: "Ecommerce Sales Growth Expert",
  sub: "Helping ecommerce brands increase traffic, conversions and revenue through data-driven growth strategies.",
  email: "Jacobgrowth01@gmail.com",
  phone: "+44 7828 706004",
  whatsapp: "+44 7828 706004",
  website: "danielgrowth.tech",
  copyright: "© 2026 Danielgrowth. All rights reserved.",
  offices: [
    { country: "United Kingdom", flag: "🇬🇧" },
  ],
  basedIn: { country: "United Kingdom", flag: "🇬🇧" },
  logo: logo,
  socials: {},
};

export const WHATSAPP_URL = "https://wa.me/447828706004";

import r1 from "@/assets/reviews/review-1.jpg.asset.json";
import r2 from "@/assets/reviews/review-2.jpg.asset.json";
import r3 from "@/assets/reviews/review-3.jpg.asset.json";
import r4 from "@/assets/reviews/review-4.jpg.asset.json";
import r5 from "@/assets/reviews/review-5.jpg.asset.json";
import r6 from "@/assets/reviews/review-6.jpg.asset.json";
import r7 from "@/assets/reviews/review-7.jpg.asset.json";
import r8 from "@/assets/reviews/review-8.jpg.asset.json";
import r9 from "@/assets/reviews/review-9.jpg.asset.json";
import r10 from "@/assets/reviews/review-10.jpg.asset.json";
import r11 from "@/assets/reviews/review-11.jpg.asset.json";
import r12 from "@/assets/reviews/review-12.jpg.asset.json";
import r13 from "@/assets/reviews/review-13.jpg.asset.json";
import r14 from "@/assets/reviews/review-14.jpg.asset.json";
import r15 from "@/assets/reviews/review-15.jpg.asset.json";
import r16 from "@/assets/reviews/review-16.jpg.asset.json";

export const REVIEWS = [
  r1.url, r2.url, r3.url, r4.url, r5.url, r6.url, r7.url, r8.url,
  r9.url, r10.url, r11.url, r12.url, r13.url, r14.url, r15.url, r16.url,
];


export type NavLink = { label: string; to: string };
export const NAV: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Sales Proof", to: "/sales-proof" },
  { label: "Free Site Audit", to: "/audit" },
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
  { n: "02", t: "Strategy",  d: "A prioritised roadmap tied to revenue targets, with clear scope, timeline and expected impact." },
  { n: "03", t: "Execution", d: "Senior hands-on delivery across CRO, SEO, paid, email and analytics, measured weekly." },
];




import svcAiSearch from "@/assets/services/ai-search.jpg.asset.json";
import svcGoogleAds from "@/assets/services/google-ads.jpg.asset.json";
import svcMetaAds from "@/assets/services/meta-ads.jpg.asset.json";
import svcTiktokAds from "@/assets/services/tiktok-ads.jpg.asset.json";
import svcPinterest from "@/assets/services/pinterest.jpg.asset.json";
import svcEmail from "@/assets/services/email.jpg.asset.json";
import svcSpeed from "@/assets/services/speed.jpg.asset.json";
import svcAmazon from "@/assets/services/amazon.jpg.asset.json";
import svcReddit from "@/assets/services/reddit.jpg.asset.json";
import svcCro from "@/assets/services/cro.jpg.asset.json";
import svcSeo from "@/assets/services/seo.jpg.asset.json";
import svcQuora from "@/assets/services/quora.webp.asset.json";

export const SERVICES = [
  { title: "Conversion Rate Optimisation", tag: "CRO", desc: "Systematic experimentation to lift add-to-cart, checkout and repeat purchase rates.", img: svcCro.url },
  { title: "SEO", tag: "Organic", desc: "Technical, content and on-page SEO built for durable category dominance.", img: svcSeo.url },
  { title: "AI Search Visibility", tag: "GEO", desc: "Optimise for ChatGPT, Perplexity, Gemini and AI Overviews so your brand is cited.", img: svcAiSearch.url },
  { title: "Google Ads Management", tag: "Paid", desc: "Performance Max, Shopping and Search tuned to profit, not vanity ROAS.", img: svcGoogleAds.url },
  { title: "Meta Ads", tag: "Paid Social", desc: "Creative-led Facebook & Instagram funnels with iterative UGC testing.", img: svcMetaAds.url },
  { title: "Email Marketing", tag: "Lifecycle", desc: "Klaviyo flows, segmentation and campaigns that turn subscribers into revenue.", img: svcEmail.url },
  { title: "TikTok Ads", tag: "Paid Social", desc: "Native, culture-fluent TikTok campaigns engineered for full-funnel scale.", img: svcTiktokAds.url },
  { title: "Pinterest Marketing", tag: "Discovery", desc: "Inspiration-first campaigns for fashion, home, beauty and lifestyle brands.", img: svcPinterest.url },
  { title: "Website Speed Optimisation", tag: "Performance", desc: "Sub-2s LCP builds that unlock conversion, SEO and paid efficiency.", img: svcSpeed.url },
  { title: "Amazon Marketplace Growth", tag: "Marketplace", desc: "PPC, listings, A+ content and brand store strategy for Amazon sellers.", img: svcAmazon.url },
  { title: "Reddit Marketing", tag: "Community", desc: "Authentic Reddit strategy plus paid campaigns for niche audiences.", img: svcReddit.url },
  { title: "Quora Marketing", tag: "Intent", desc: "Answer-led acquisition capturing high-intent research traffic.", img: svcQuora.url },
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
  { t: "Tailored Growth Strategies", d: "No templates. Every roadmap is built around your brand's economics." },
  { t: "Data-Driven Decisions", d: "Every recommendation is defended with numbers and experiments." },
  { t: "Multi-Channel Expertise", d: "SEO, paid, email, marketplaces, orchestrated as one system." },
  { t: "Transparent Reporting", d: "Weekly async updates and real-time dashboards, always." },
  { t: "Conversion-Focused", d: "Optimising for LTV and contribution profit, not vanity ROAS." },
  { t: "Long-Term Partnership", d: "Senior specialists on Slack, not junior account managers." },
];

export const GENERAL_FAQS = [
  { q: "How do I know I can trust you with my business?", a: "I understand that working with a freelancer for the first time requires trust. I keep the process transparent from the beginning, clearly explaining what I recommend, why it is needed, what will be delivered and what you can expect. I also provide examples of previous eCommerce work so you can evaluate my experience before making a decision." },
  { q: "Will I need to give you full access to my store?", a: "No. I only request the access required to complete the agreed work. Where possible, I work through appropriate collaborator, staff or limited-access permissions rather than asking for unnecessary control of your business. Your store, customer data and business assets remain yours." },
  { q: "How will we communicate while the project is in progress?", a: "Communication is straightforward and transparent. We can agree on the preferred communication channel before starting, and I provide updates on progress, completed work and any important decisions that require your input." },
  { q: "What happens after I pay and the project begins?", a: "You will know exactly what is being worked on. I begin with the agreed scope, review the relevant areas of your business, prioritise the highest-impact opportunities and then implement the agreed improvements. You are kept informed throughout rather than being left wondering what is happening." },
  { q: "How do you handle payments and project security?", a: "I prefer to work through a secure freelance platform such as Upwork or Fiverr when appropriate. This gives both sides a clear record of the agreement, scope and payment process. For larger or ongoing projects, the payment structure can also be agreed in stages based on the work involved." },
  { q: "What if I am not sure which service my business needs?", a: "That is not a problem. You do not need to know exactly what to purchase before contacting me. I can review your situation, identify the main growth constraints and recommend the areas that should be prioritised. I will explain the reasoning before any work begins." },
  { q: "Do you work with clients remotely, and will working in different countries be a problem?", a: "No. I work remotely with eCommerce businesses internationally. Location does not prevent us from working together effectively. We can communicate online, agree on the scope and timeline, and manage the project through a clear digital workflow." },
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
  desc: "Work together with a results-focused model, aligned on the outcomes that actually move the business.",
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
    strategy: "Rebuilt the marketing engine end-to-end: paid, organic, email, and creative, measured against contribution profit.",
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

import v1 from "@/assets/new/ref1.mp4.asset.json";
import v2 from "@/assets/new/ref2.mp4.asset.json";
import p1 from "@/assets/new/ref1.jpg.asset.json";
import p2 from "@/assets/new/ref2.jpg.asset.json";

export const REFERENCES = [
  { src: v1.url, poster: p1.url, name: "Client Reference", country: "Verified client", flag: "⭐", industry: "Ecommerce", service: "Ecommerce Growth" },
  { src: v2.url, poster: p2.url, name: "Client Reference", country: "Verified client", flag: "⭐", industry: "Ecommerce", service: "Ecommerce Growth" },
];

export const WAYS_TO_WORK = [
  {
    title: "Fixed Payment",
    desc: "Pay the agreed project fee based on the selected package and agreed scope of work.",
  },
  {
    title: "Installment Plan",
    desc: "Split the agreed project fee into manageable instalments based on an agreed payment schedule.",
  },
  {
    title: "Hybrid Partnership",
    desc: "Combine an upfront payment with a performance-based component, based on an agreed scope and terms.",
  },
  {
    title: "Performance Partnership",
    desc: "No upfront professional fee. For selected ecommerce businesses, work under an agreed 5% commission structure.",
  },
];
