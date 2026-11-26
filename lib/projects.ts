import { featuredImages } from "@/content/home";
import { allProjects, projectSectors } from "@/content/projects";
import type { Project, ServiceSlug } from "@/types";

export const projectBySlug = (slug: string): Project | undefined => allProjects.find((p) => p.slug === slug);

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

/** Caption and photo for a service on a project gallery (the service photos already in public/images/services). */
export const serviceGalleryPhoto: Record<ServiceSlug, { src: string; caption: string }> = {
  "integrated-mep": { src: "/images/services/integrated-mep/card.jpg", caption: "Coordinated Services" },
  hvac: { src: "/images/services/hvac/card.jpg", caption: "HVAC Installation" },
  "fire-fighting": { src: "/images/services/fire-fighting/card.jpg", caption: "Fire Pump and Pipework" },
  plumbing: { src: "/images/services/plumbing/card.jpg", caption: "Mechanical Pipework" },
  "electrical-elv": { src: "/images/services/electrical-elv/card.jpg", caption: "Electrical Distribution" },
  "pools-fountains": { src: "/images/services/pools-fountains/card.jpg", caption: "Pool and Fountain Systems" },
};
