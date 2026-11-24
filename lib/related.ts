import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import type { Insight, Project, ServiceSlug } from "@/types";

/** Projects whose UMS scope includes this service. */
export const projectsForService = (slug: ServiceSlug): Project[] =>
  projects.filter((p) => p.services.includes(slug));

/**
 * Articles tagged with this service, most specific first (an article tagged
 * with fewer services is more specifically about this one).
 */
export const insightsForService = (slug: ServiceSlug, max = 3): Insight[] =>
  insights
    .filter((i) => i.services.includes(slug))
    .sort((a, b) => a.services.length - b.services.length)
    .slice(0, max);
