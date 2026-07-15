import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import { CASES_META } from "@/lib/site-content";

const IMG: Record<string, string> = {
  "aurelia-skincare": case1,
  "nord-loom": case2,
  "rowan-home": case3,
};

export const CASES = CASES_META.map((c) => ({ ...c, img: IMG[c.slug]! }));
