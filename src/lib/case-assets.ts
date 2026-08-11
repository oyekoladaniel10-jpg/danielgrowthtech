import dtaillab from "@/assets/cases/dtaillab.mp4.asset.json";
import starstyling from "@/assets/cases/starstyling.mp4.asset.json";
import lovestitches from "@/assets/cases/lovestitches.mp4.asset.json";
import golfmk2parts from "@/assets/cases/golfmk2parts.mp4.asset.json";
import dtaillabPoster from "@/assets/posters/dtaillab.jpg";
import starstylingPoster from "@/assets/posters/starstyling.jpg";
import lovestitchesPoster from "@/assets/posters/lovestitches.jpg";
import golfmk2partsPoster from "@/assets/posters/golfmk2parts.jpg";

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
];
