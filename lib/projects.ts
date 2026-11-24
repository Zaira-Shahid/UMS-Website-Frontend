import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import type { IndustrySlug, Project, ProjectStatus, ServiceSlug } from "@/types";

/** Featured case studies, in content order. */
export const featuredProjects = (max?: number): Project[] => {
  const list = projects.filter((p) => p.featured);
  return max ? list.slice(0, max) : list;
};

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** Previous / next project in content order, wrapping around the list. */
export function adjacentProjects(slug: string): { prev: Project; next: Project } | null {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length < 2) return null;
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}

export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  ongoing: "Ongoing",
};

/* ───────────── Library filters (URL-synced) ───────────── */

export const TABS = ["all", "completed", "ongoing", "featured"] as const;
export type ProjectTab = (typeof TABS)[number];

export const tabLabel: Record<ProjectTab, string> = {
  all: "All",
  completed: "Completed",
  ongoing: "Ongoing",
  featured: "Featured Case Studies",
};

export type ProjectView = "grid" | "list";

/**
 * One source of truth for the library state, mirrored in the query string:
 * ?tab=&sector=&location=&service=&view=
 * Status is the tab: "completed" and "ongoing" are the status filter.
 */
export interface ProjectFilters {
  tab: ProjectTab;
  sector?: IndustrySlug;
  location?: string;
  service?: ServiceSlug;
  view: ProjectView;
}

export const defaultFilters: ProjectFilters = { tab: "all", view: "grid" };

type ParamGetter = { get(name: string): string | null };

/** Parse and validate query params — unknown values are dropped, never trusted. */
export function parseFilters(params: ParamGetter): ProjectFilters {
  const tab = params.get("tab");
  const sector = params.get("sector");
  const service = params.get("service");
  const location = params.get("location");
  return {
    tab: TABS.find((t) => t === tab) ?? "all",
    sector: industries.find((i) => i.slug === sector)?.slug,
    service: services.find((s) => s.slug === service)?.slug,
    location: location && projectLocations().includes(location) ? location : undefined,
    view: params.get("view") === "list" ? "list" : "grid",
  };
}

/** Query string for a state (defaults omitted, so the base URL stays clean). */
export function filtersToQuery(f: ProjectFilters): string {
  const q = new URLSearchParams();
  if (f.tab !== "all") q.set("tab", f.tab);
  if (f.sector) q.set("sector", f.sector);
  if (f.location) q.set("location", f.location);
  if (f.service) q.set("service", f.service);
  if (f.view === "list") q.set("view", "list");
  const s = q.toString();
  return s ? `?${s}` : "";
}

/** Distinct project cities. */
export function projectLocations(): string[] {
  return [...new Set(projects.map((p) => p.location))].sort();
}

export function filterProjects(list: Project[], f: ProjectFilters): Project[] {
  return list.filter((p) => {
    if (f.tab === "completed" && p.status !== "completed") return false;
    if (f.tab === "ongoing" && p.status !== "ongoing") return false;
    if (f.tab === "featured" && !p.featured) return false;
    if (f.sector && p.sector !== f.sector) return false;
    if (f.location && p.location !== f.location) return false;
    if (f.service && !p.services.includes(f.service)) return false;
    return true;
  });
}

/** Number of non-default filters (the tab counts only when it is a status). */
export const activeFilterCount = (f: ProjectFilters) =>
  [f.sector, f.location, f.service].filter(Boolean).length +
  (f.tab === "completed" || f.tab === "ongoing" ? 1 : 0);

export function projectCounts(list: Project[] = projects) {
  return {
    total: list.length,
    completed: list.filter((p) => p.status === "completed").length,
    ongoing: list.filter((p) => p.status === "ongoing").length,
    featured: list.filter((p) => p.featured).length,
  };
}
