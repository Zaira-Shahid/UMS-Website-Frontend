import { projects } from "@/content/projects";
import type { Project } from "@/types";

/** Featured case studies, in content order. */
export const featuredProjects = (max?: number): Project[] => {
  const list = projects.filter((p) => p.featured);
  return max ? list.slice(0, max) : list;
};
