import logo from "@/assets/jacob-growth-logo.png.asset.json";

export const BRAND = {
  name: "Jacob Growth",
  short: "Jacob",
  tagline: "Ecommerce Sales Growth Expert",
  sub: "Helping ecommerce brands increase traffic, conversions and revenue through data-driven growth strategies.",
  email: "Jacobgrowth01@gmail.com",
  phone: "+44 7828 706004",
  whatsapp: "+44 7828 706004",
  website: "jacobgrowth.uk",
  copyright: "© 2026 Jacob Growth. All rights reserved.",
  offices: [
    { country: "United Kingdom", flag: "🇬🇧" },
  ],
  basedIn: { country: "United Kingdom", flag: "🇬🇧" },
  logo: logo.url,
  socials: {},
};

export const WHATSAPP_URL = "https://wa.me/447828706004";

import r1 from "@/assets/reviews/review-1.jpg.asset.json";
import r2 from "@/assets/reviews/review-2.jpg.asset.json";
import r3 from "@/assets/reviews/review-3.jpg.asset.json";
import r4 from "@/assets/reviews/review-4.jpg.asset.json";
import r5 from "@/assets/reviews/review-5.jpg.asset.json";
import r6 from "@/assets/reviews/review-6.jpg.asset.json";

export const REVIEWS = [r1.url, r2.url, r3.url, r4.url, r5.url, r6.url];

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
  { q: "What type of businesses do you work with?", a: "I work with ecommerce businesses and online brands across industries including fashion, beauty, home, lifestyle, automotive, health and wellness, and more." },
  { q: "Where are you based?", a: "I'm based in the United Kingdom and work remotely with ecommerce businesses in the UK, US, Canada, Australia, and other international markets." },
  { q: "What ecommerce platforms do you work with?", a: "I work with platforms including Shopify, WooCommerce, BigCommerce, and Amazon, depending on the needs of the business." },
  { q: "What services do you offer?", a: "My services include Conversion Rate Optimisation (CRO), Ecommerce SEO, AI Search Visibility, Google Ads, Meta Ads, TikTok Ads, Pinterest Marketing, Email Marketing, Website Speed Optimisation, and ecommerce growth strategy." },
  { q: "How do you determine which services my business needs?", a: "I start by understanding your business, current performance, goals, and challenges. From there, I identify the biggest growth opportunities and recommend the strategies that are most relevant to your situation." },
  { q: "Do you offer one-time projects or ongoing support?", a: "Both. I offer one-time projects for specific growth needs as well as ongoing support for businesses looking for continuous optimisation and growth." },
  { q: "How long does it take to see results?", a: "The timeline depends on the service, starting point, industry, and level of implementation. Some improvements can be seen quickly, while SEO, CRO testing, and long-term growth strategies typically require ongoing optimisation." },
  { q: "How do we get started?", a: "Book a free consultation or contact me directly. We'll discuss your business, goals, current challenges, and the best next steps." },
  { q: "Do you offer commission-based partnerships?", a: "Yes. For selected ecommerce businesses, I may offer a performance-based partnership with a 5% commission structure, subject to agreement and suitability." },
  { q: "Can I see examples of your previous work?", a: "Yes. You can explore my Case Studies and Client References to see examples of projects, results, and feedback from clients I've worked with." },
  { q: "How do you communicate with clients?", a: "Communication can be handled through channels agreed upon at the start of the project, including WhatsApp, email, and other suitable platforms." },
  { q: "Do you work with businesses outside the UK?", a: "Yes. Although I'm based in the UK, I work remotely with ecommerce businesses internationally." },
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

import v1 from "@/assets/references/VID-20260316-WA0005.mp4.asset.json";
import v2 from "@/assets/references/VID_20260419_090850_2.mp4.asset.json";
import v3 from "@/assets/references/VID-20260320-WA0015.mp4.asset.json";
import v4 from "@/assets/references/VID-20260417-WA0005.mp4.asset.json";
import v5 from "@/assets/references/VID_20260419_220452.mp4.asset.json";
import v6 from "@/assets/references/VID_20260718_111159.mp4.asset.json";
import p1 from "@/assets/posters/VID-20260316-WA0005.jpg";
import p2 from "@/assets/posters/VID_20260419_090850_2.jpg";
import p3 from "@/assets/posters/VID-20260320-WA0015.jpg";
import p4 from "@/assets/posters/VID-20260417-WA0005.jpg";
import p5 from "@/assets/posters/VID_20260419_220452.jpg";
import p6 from "@/assets/posters/VID_20260718_111159.jpg";

export const REFERENCES = [
  { src: v1.url, poster: p1, name: "Liz Bennett",        country: "United States",              flag: "🇺🇸", industry: "Ecommerce",   service: "Email & SMS Marketing Campaign Setup for Growth" },
  { src: v6.url, poster: p6, name: "Ilana Hubert Katz",  country: "United States",              flag: "🇺🇸", industry: "Real Estate", service: "Lead Generation & Digital Marketing Strategy" },
  { src: v3.url, poster: p3, name: "Sal",                country: "Belgium",                    flag: "🇧🇪", industry: "Ecommerce",   service: "Ecommerce Growth Strategy & Store Optimisation" },
  { src: v4.url, poster: p4, name: "Alfred Taran",       country: "United States (California)", flag: "🇺🇸", industry: "Real Estate", service: "Google Ads & CRM Automation for Lead Generation and Sales Growth" },
  { src: v5.url, poster: p5, name: "Josh",               country: "Australia",                  flag: "🇦🇺", industry: "Ecommerce",   service: "High-Converting Landing Page Design & Optimisation" },
  { src: v2.url, poster: p2, name: "Daniel",             country: "Canada",                     flag: "🇨🇦", industry: "Ecommerce",   service: "Facebook Ads Management, Content Strategy & CRM Integration" },
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
