import { projects } from "@/content/projects";
import type { Project } from "@/types";

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

/** Previous / next project in content order, wrapping around the list. */
export function adjacentProjects(slug: string): { prev: Project; next: Project } | null {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length < 2) return null;
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
