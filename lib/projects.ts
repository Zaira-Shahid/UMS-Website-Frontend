import { projectSectors, projects } from "@/content/projects";
import type { Project } from "@/types";

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

/** The sector entry (filter value, label, heading) for a project, if its sector is set. */
export const sectorOf = (p: Project) => projectSectors.find((s) => s.industry === p.sector);

/** "Gulberg, Islamabad", "Multan" or nothing: the place line for a project. */
export const placeOf = (p: Project) => [p.area, p.city].filter(Boolean).join(", ");
