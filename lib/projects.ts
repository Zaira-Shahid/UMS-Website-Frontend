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

/** Short name and a neutral two-line description for the "Services Delivered" cards (mockup 21). Not specific to any one project. */
export const deliveredInfo: Record<ServiceSlug, { name: string; line: string }> = {
  "integrated-mep": { name: "Integrated MEP", line: "One coordinated package for every building service, planned on shared drawings." },
  hvac: { name: "HVAC Systems", line: "Air handling, ductwork and ventilation, coordinated with the other building services." },
  "fire-fighting": { name: "Fire Protection", line: "Sprinkler pipework and life-safety systems, coordinated with the other building services." },
  plumbing: { name: "Plumbing", line: "Water supply and drainage installation for the occupied and support spaces of the building." },
  "electrical-elv": { name: "Electrical & ELV", line: "Power distribution and low-voltage systems, coordinated with the other trades." },
  "pools-fountains": { name: "Pools & Fountains", line: "Water features and circulation systems built to run reliably." },
};

/** Caption and photo for a service on a project gallery (the service photos already in public/images/services). */
export const serviceGalleryPhoto: Record<ServiceSlug, { src: string; caption: string }> = {
  "integrated-mep": { src: "/images/services/integrated-mep/card.jpg", caption: "Coordinated Services" },
  hvac: { src: "/images/services/hvac/card.jpg", caption: "HVAC Installation" },
  "fire-fighting": { src: "/images/services/fire-fighting/card.jpg", caption: "Fire Pump and Pipework" },
  plumbing: { src: "/images/services/plumbing/card.jpg", caption: "Mechanical Pipework" },
  "electrical-elv": { src: "/images/services/electrical-elv/card.jpg", caption: "Electrical Distribution" },
  "pools-fountains": { src: "/images/services/pools-fountains/card.jpg", caption: "Pool and Fountain Systems" },
};
