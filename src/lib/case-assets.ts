import dtaillab from "@/assets/cases/dtaillab.mp4.asset.json";
import starstyling from "@/assets/cases/starstyling.mp4.asset.json";
import lovestitches from "@/assets/cases/lovestitches.mp4.asset.json";
import golfmk2parts from "@/assets/cases/golfmk2parts.mp4.asset.json";

export type CaseStudy = {
  slug: string;
  website: string;
  industry: string;
  video: string;
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
    overview: "Add your project overview here.",
    challenge: "Add the challenge details here.",
    strategy: "Add the strategy details here.",
    results: "Add the measurable results here.",
    tools: "Add the tools and platforms used.",
    outcome: "Add the key outcome here.",
  },
];
