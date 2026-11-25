import type { Insight, InsightCategory } from "@/types";
import { articles } from "./articles";

/** The only attribution used on articles. There are no personal authors and no publication dates. */
export const insightAuthor = "UMS Engineering Team";

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

const words = (text: string) => text.trim().split(/\s+/).length;

/** The articles, with reading time computed from the text. */
export const insights: Insight[] = articles.map((a) => {
  const total = words(a.intro) + a.sections.reduce((n, s) => n + s.body.reduce((m, b) => m + words(b), 0), 0);
  return { ...a, readingMinutes: Math.max(1, Math.round(total / 200)) };
});
