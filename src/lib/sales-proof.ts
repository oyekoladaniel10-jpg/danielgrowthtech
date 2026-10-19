import sv1 from "@/assets/new/sp1.mp4.asset.json";
import sv2 from "@/assets/new/sp2.mp4.asset.json";
import sp1 from "@/assets/new/sp1.jpg.asset.json";
import sp2 from "@/assets/new/sp2.jpg.asset.json";

export const SALES_VIDEOS = [
  { src: sv1.url, poster: sp1.url, title: "Store sales walkthrough" },
  { src: sv2.url, poster: sp2.url, title: "Latest sales dashboard" },
];

export type SalesProof = {
  id: string;
  label: string;
  period: string;
  totalSales: string;
  grossSales: string;
  returningCustomers: string;
  orders: string;
  fulfilled: string;
  image: string;
  alt: string;
};

export const SALES_PROOFS: SalesProof[] = [
  {
    id: "aud-7-day",
    label: "Recent snapshot",
    period: "7-day view · AUD",
    totalSales: "A$4,330.90",
    grossSales: "A$4,432.15",
    returningCustomers: "13.33%",
    orders: "32",
    fulfilled: "32",
    image: "/sales-proof/aud-7-day.webp",
    alt: "Store analytics screenshot showing A$4,330.90 total sales in a 7-day view",
  },
  {
    id: "aud-30-day",
    label: "Monthly snapshot",
    period: "30-day view · AUD",
    totalSales: "A$18,443.26",
    grossSales: "A$17,930.65",
    returningCustomers: "20.86%",
    orders: "121",
    fulfilled: "124",
    image: "/sales-proof/aud-30-day.webp",
    alt: "Store analytics screenshot showing A$18,443.26 total sales in a 30-day view",
  },
  {
    id: "zar-7-day",
    label: "Recent snapshot",
    period: "7-day view · ZAR",
    totalSales: "ZAR 122,235.91",
    grossSales: "ZAR 107,027.55",
    returningCustomers: "13.63%",
    orders: "22",
    fulfilled: "20",
    image: "/sales-proof/latest-zar-7-day.webp",
    alt: "Store analytics screenshot showing ZAR 122,235.91 total sales in a 7-day view",
  },
  {
    id: "zar-30-day",
    label: "Monthly snapshot",
    period: "30-day view · ZAR",
    totalSales: "ZAR 375,774.63",
    grossSales: "ZAR 350,496.18",
    returningCustomers: "11.39%",
    orders: "84",
    fulfilled: "78",
    image: "/sales-proof/zar-30-day.webp",
    alt: "Store analytics screenshot showing ZAR 375,774.63 total sales in a 30-day view",
  },
];

export const LATEST_SALES_RECORDING = {
  date: "14 October 2026",
  url: "/case-studies/latest-case-study-2",
};