import type { ImageAsset, Insight, InsightCategory } from "@/types";
import { dummyArticles } from "./dummy";
import { photo } from "./images";

export const insightCategories: { slug: InsightCategory; name: string; summary: string }[] = [
  {
    slug: "safety-compliance",
    name: "Safety & Compliance",
    summary: "Planning, records and discipline that keep MEP works safe and auditable.",
  },
  {
    slug: "mep-systems",
    name: "MEP Systems",
    summary: "Practical notes on how building services are selected and coordinated.",
  },
  {
    slug: "maintenance-operations",
    name: "Maintenance & Operations",
    summary: "Keeping systems performing after handover.",
  },
];

/** Stock images per article (not UMS work). */
const articleImages: Record<string, ImageAsset> = {
  "site-safety-planning-for-mep-works": photo("ceilingServices", "center 40%"),
  "fire-protection-inspection-records": photo("redPipes"),
  "vrf-and-chilled-water-systems": photo("pumpRoom", "center 30%"),
  "coordinating-mep-shop-drawings": photo("glassTower", "center 55%"),
  "hvac-maintenance-planning": photo("pumpRoom", "center 75%"),
  "mep-handover-documentation": photo("glassReflection"),
};

const words = (text: string) => text.trim().split(/\s+/).length;

/** Six articles from content/dummy-articles.ts. Reading time is computed from the text. */
export const insights: Insight[] = dummyArticles.map((a) => {
  const total = words(a.intro) + a.sections.reduce((n, s) => n + s.body.reduce((m, b) => m + words(b), 0), 0);
  return {
    ...a,
    readingMinutes: Math.max(1, Math.round(total / 200)),
    image: articleImages[a.slug] ?? photo("glassTower"),
  };
});
