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

export const CASES: CaseStudy[] = [
  {
    slug: "dtaillab",
    website: "dtaillab.com",
    industry: "Automotive",
    video: dtaillab.url,
    poster: dtaillabPoster,
    overview: "Add your project overview here.",
    challenge: "Add the challenge details here.",
    strategy: "Add the strategy details here.",
    results: "Add the measurable results here.",
    tools: "Add the tools and platforms used.",
    outcome: "Add the key outcome here.",
  },
  {
    slug: "starstyling",
    website: "starstyling.com",
    industry: "Fashion",
    video: starstyling.url,
    poster: starstylingPoster,
    overview: "Add your project overview here.",
    challenge: "Add the challenge details here.",
    strategy: "Add the strategy details here.",
    results: "Add the measurable results here.",
    tools: "Add the tools and platforms used.",
    outcome: "Add the key outcome here.",
  },
  {
    slug: "lovestitchesboutique",
    website: "lovestitchesboutique.com",
    industry: "Fashion",
    video: lovestitches.url,
    poster: lovestitchesPoster,
    overview: "Add your project overview here.",
    challenge: "Add the challenge details here.",
    strategy: "Add the strategy details here.",
    results: "Add the measurable results here.",
    tools: "Add the tools and platforms used.",
    outcome: "Add the key outcome here.",
  },
  {
    slug: "golfmk2parts",
    website: "golfmk2parts.com",
    industry: "Automotive",
    video: golfmk2parts.url,
    poster: golfmk2partsPoster,
    overview: "Add your project overview here.",
    challenge: "Add the challenge details here.",
    strategy: "Add the strategy details here.",
    results: "Add the measurable results here.",
    tools: "Add the tools and platforms used.",
    outcome: "Add the key outcome here.",
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
];
