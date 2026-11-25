import { insightCategories, insights } from "@/content/insights";
import type { Insight, InsightCategory, ServiceSlug } from "@/types";

export const insightBySlug = (slug: string): Insight | undefined => insights.find((i) => i.slug === slug);

export const categoryBySlug = (slug: string) => insightCategories.find((c) => c.slug === slug);

export const insightsInCategory = (category: InsightCategory): Insight[] => insights.filter((i) => i.category === category);

/** Articles tagged with a service, most specific first (fewer tags means more specifically about it). */
export const insightsForService = (slug: ServiceSlug, max = 3): Insight[] =>
  insights
    .filter((i) => i.services.includes(slug))
    .sort((a, b) => a.services.length - b.services.length)
    .slice(0, max);

/** Other articles that share the category or a service with this one. */
export function relatedInsights(a: Insight, max = 2): Insight[] {
  return insights
    .filter((o) => o.slug !== a.slug)
    .map((o) => ({ o, score: (o.category === a.category ? 2 : 0) + o.services.filter((s) => a.services.includes(s)).length }))
    .sort((x, y) => y.score - x.score)
    .slice(0, max)
    .map((x) => x.o);
}

/** Heading text to a stable id for the table of contents. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
