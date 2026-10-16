import dtaillab from "@/assets/cases/dtaillab.mp4.asset.json";
import starstyling from "@/assets/cases/starstyling.mp4.asset.json";
import lovestitches from "@/assets/cases/lovestitches.mp4.asset.json";
import golfmk2parts from "@/assets/cases/golfmk2parts.mp4.asset.json";
import tennisDepot from "@/assets/cases/tennis-depot.mp4.asset.json";
import winternational from "@/assets/cases/winternational.mp4.asset.json";
import dtaillabPoster from "@/assets/posters/dtaillab.jpg";
import starstylingPoster from "@/assets/posters/starstyling.jpg";
import lovestitchesPoster from "@/assets/posters/lovestitches.jpg";
import golfmk2partsPoster from "@/assets/posters/golfmk2parts.jpg";
import tennisDepotPoster from "@/assets/posters/tennis-depot.jpg.asset.json";
import winternationalPoster from "@/assets/posters/winternational.jpg.asset.json";

export type CaseStudy = {
  slug: string;
  website: string;
  industry: string;
  video: string;
  poster: string;
  overview: string;
  challenge: string;
  strategy: string;
  results: string;
  tools: string;
  outcome: string;
};

const driveCaseStudyVideo = "https://drive.google.com/file/d/1-q_hQ6wGe-75_1wJ-58FtiRVAagXmoCE/view?usp=sharing";
const driveCaseStudyPoster = "https://drive.google.com/thumbnail?id=1-q_hQ6wGe-75_1wJ-58FtiRVAagXmoCE&sz=w1200";
const latestDriveCaseStudyVideo = "https://drive.google.com/file/d/1omRbXSruvukCH_9rHHmdKRiWdA8YmfqS/view?usp=sharing";
const latestDriveCaseStudyPoster = "https://drive.google.com/thumbnail?id=1omRbXSruvukCH_9rHHmdKRiWdA8YmfqS&sz=w1200";

export const CASES: CaseStudy[] = [
  {
    slug: "dtaillab",
    website: "dtaillab.com",
    industry: "Automotive",
    video: dtaillab.url,
    poster: dtaillabPoster,
    overview: "D-Tail Lab is an automotive detailing brand selling car care products and accessories online. The engagement focused on turning a product-led store into a smoother, more trustworthy buying experience for detailing enthusiasts.",
    challenge: "The store attracted interest but the path from product discovery to checkout had friction: product pages needed clearer benefits, stronger imagery and a more confident brand presentation to convert browsers into buyers.",
    strategy: "Refined the store's structure and product presentation, clarified the offer on key pages, and tightened the customer journey from landing to checkout, supported by a full review of the store's ecommerce activity.",
    results: "The case study video walks through the live store and its ecommerce dashboard, showing how the catalogue, pages and customer journey were improved.",
    tools: "Shopify, store analytics and on-site conversion improvements.",
    outcome: "A cleaner, more persuasive storefront with a stronger foundation for repeat customers and steady sales growth.",
  },
  {
    slug: "starstyling",
    website: "starstyling.com",
    industry: "Fashion",
    video: starstyling.url,
    poster: starstylingPoster,
    overview: "Starstyling is an independent fashion label with a bold, design-led identity. The work centred on presenting a distinctive brand online without losing the clarity shoppers need to buy with confidence.",
    challenge: "A highly creative catalogue can be hard to shop. The store needed product organisation, collection structure and page layouts that showcase the designs while making sizes, pricing and checkout effortless.",
    strategy: "Reorganised collections around how customers actually browse, improved product pages with clearer information hierarchy, and aligned the visual presentation so the brand personality supports, rather than competes with, the buying decision.",
    results: "The case study video tours the refreshed store, highlighting the collection structure, product presentation and overall shopping experience.",
    tools: "Shopify, collection architecture and conversion-focused design.",
    outcome: "A fashion storefront that keeps its creative edge while giving shoppers a clear, confident route to purchase.",
  },
  {
    slug: "lovestitchesboutique",
    website: "lovestitchesboutique.com",
    industry: "Fashion",
    video: lovestitches.url,
    poster: lovestitchesPoster,
    overview: "Love Stitches Boutique is a boutique fashion and craft store with a loyal community of makers and shoppers. The engagement aimed to make the online shop feel as warm and easy to browse as the brand itself.",
    challenge: "With a varied catalogue across styles and product types, visitors could struggle to find the right item quickly. The store needed clearer navigation, stronger product pages and a smoother checkout.",
    strategy: "Simplified the store's navigation and product grouping, upgraded product pages with better imagery and descriptions, and removed friction from the checkout flow to protect hard-won traffic.",
    results: "The case study video shows the improved store in action, from the homepage through to product pages and checkout.",
    tools: "Shopify, merchandising improvements and checkout optimisation.",
    outcome: "A friendlier, easier-to-shop boutique that turns community interest into completed orders.",
  },
  {
    slug: "golfmk2parts",
    website: "golfmk2parts.com",
    industry: "Automotive",
    video: golfmk2parts.url,
    poster: golfmk2partsPoster,
    overview: "Golf Mk2 Parts serves a passionate niche: owners restoring and maintaining the classic VW Golf Mk2. The project focused on making a specialist parts catalogue easy to search, trust and buy from.",
    challenge: "Specialist parts stores live or die on findability and trust. Shoppers needed to locate exact parts quickly, confirm fitment, and feel confident ordering from a niche supplier.",
    strategy: "Improved catalogue structure and product naming so parts are easy to find, strengthened product pages with the details buyers check before ordering, and polished the overall store experience to build confidence.",
    results: "The case study video walks through the store, showing the catalogue organisation and the buying experience for this specialist audience.",
    tools: "Shopify, catalogue organisation and product page optimisation.",
    outcome: "A specialist store that makes rare parts easy to find and easy to buy, positioning it as the go-to source for Golf Mk2 owners.",
  },
  {
    slug: "the-tennis-depot",
    website: "The Tennis Depot",
    industry: "Sporting Goods",
    video: tennisDepot.url,
    poster: tennisDepotPoster.url,
    overview: "Ecommerce growth work for The Tennis Depot, supported by its WordPress and WooCommerce store.",
    challenge: "Improve the store experience and create a stronger foundation for sustained online sales growth.",
    strategy: "Optimise the ecommerce journey, store operations, and conversion opportunities across the customer experience.",
    results: "The accompanying case study video provides a walkthrough of the store and its ecommerce activity.",
    tools: "WordPress and WooCommerce.",
    outcome: "A more structured ecommerce operation positioned for continued growth.",
  },
  {
    slug: "winternational",
    website: "Winternational",
    industry: "Ecommerce",
    video: winternational.url,
    poster: winternationalPoster.url,
    overview: "A Shopify growth engagement for Winternational focused on strengthening store performance.",
    challenge: "Increase qualified traffic, orders, and conversion performance in a competitive ecommerce market.",
    strategy: "Use store analytics and customer behaviour insights to identify and prioritise growth opportunities.",
    results: "The recorded dashboard shows 20,257 sessions, 146 orders, and a 0.53% conversion rate for the featured period.",
    tools: "Shopify and Shopify Analytics.",
    outcome: "Stronger traffic and order growth, with sessions up 74% and orders up 198% in the featured comparison.",
  },
  {
    slug: "latest-case-study",
    website: "Latest Case Study",
    industry: "Case Study",
    video: driveCaseStudyVideo,
    poster: driveCaseStudyPoster,
    overview: "A new case study video featuring real project work and results.",
    challenge: "Show prospective clients the work and outcomes through a direct case-study walkthrough.",
    strategy: "Use the case-study recording to demonstrate the project and the work completed.",
    results: "The video provides a visual walkthrough of the featured case study.",
    tools: "Ecommerce growth strategy and implementation.",
    outcome: "A new visual proof point for prospective clients.",
  },
  {
    slug: "latest-case-study-2",
    website: "Latest Case Study",
    industry: "Case Study",
    video: latestDriveCaseStudyVideo,
    poster: latestDriveCaseStudyPoster,
    overview: "The latest case study video featuring real project work and results.",
    challenge: "Give prospective clients a direct visual walkthrough of the latest project and its outcomes.",
    strategy: "Use the recorded case study to demonstrate the project, implementation and results.",
    results: "The video provides a visual walkthrough of the latest featured case study.",
    tools: "Ecommerce growth strategy and implementation.",
    outcome: "A current visual proof point for prospective clients.",
  },
];
