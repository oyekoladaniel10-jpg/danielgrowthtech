import marketing from "@/assets/cases/case-marketing.jpg.asset.json";
import analytics from "@/assets/cases/case-analytics.jpg.asset.json";
import channels from "@/assets/cases/case-channels.jpg.asset.json";
import customers from "@/assets/cases/case-customers.jpg.asset.json";
import { CASES_META } from "@/lib/site-content";

const IMG: Record<string, string> = {
  "marketing-growth": marketing.url,
  "analytics-scaling": analytics.url,
  "channels-attribution": channels.url,
  "customer-expansion": customers.url,
};

export const CASES = CASES_META.map((c) => ({ ...c, img: IMG[c.slug]! }));
