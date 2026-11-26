import type { Insight, InsightCategory } from "@/types";
import { articles } from "./articles";
import { companyArticles } from "./articles-company";

/** The only attribution used on posts. There are no personal authors and no publication dates. */
export const insightAuthor = "UMS Engineering Team";

export const insightCategories: { slug: InsightCategory; name: string; summary: string }[] = [
  {
    slug: "company",
    name: "About UMS",
    summary: "Who UMS is, what it stands for and how it is organised, in the company's own words.",
  },
  {
    slug: "our-work",
    name: "Our Work",
    summary: "The services UMS provides and the projects named in its company profile.",
  },
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
export const insights: Insight[] = [...companyArticles, ...articles].map((a) => {
  const total = words(a.intro) + a.sections.reduce((n, s) => n + s.body.reduce((m, b) => m + words(b), 0), 0);
  return { ...a, readingMinutes: Math.max(1, Math.round(total / 200)) };
});
