import { projects } from "@/content/projects";
import type { Project, ServiceSlug } from "@/types";

/** Projects whose UMS scope includes this service. */
export const projectsForService = (slug: ServiceSlug): Project[] =>
  projects.filter((p) => p.services.includes(slug));
