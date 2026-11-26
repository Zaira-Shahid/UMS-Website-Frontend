import { featuredImages } from "@/content/home";
import { allProjects, projectSectors } from "@/content/projects";
import type { Project } from "@/types";

export const projectBySlug = (slug: string): Project | undefined => allProjects.find((p) => p.slug === slug);

/** Previous / next project in content order, wrapping around the list. */
export function adjacentProjects(slug: string): { prev: Project; next: Project } | null {
  const i = allProjects.findIndex((p) => p.slug === slug);
  if (i === -1 || allProjects.length < 2) return null;
  return {
    prev: allProjects[(i - 1 + allProjects.length) % allProjects.length],
    next: allProjects[(i + 1) % allProjects.length],
  };
}

/** The sector entry (filter value, label, heading) for a project, if its sector is set. */
export const sectorOf = (p: Project) => projectSectors.find((s) => s.industry === p.sector);

/**
 * The photo for a project and how to label it. Sample projects use their own picture and carry an "Illustrative" badge;
 * the real projects use the design-pack picture and keep the "Illustrative imagery" label, because neither is a UMS photo.
 */
export function projectPhoto(p: Project): { image?: { src: string; width: number; height: number }; label?: string } {
  if (p.image) return { image: p.image, label: p.illustrative ? "Illustrative" : "Illustrative imagery" };
  const image = featuredImages[p.slug];
  return image ? { image, label: "Illustrative imagery" } : {};
}
