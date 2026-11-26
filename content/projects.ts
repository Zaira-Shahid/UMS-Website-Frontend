import type { IndustrySlug, Project, ServiceSlug } from "@/types";
import { confirmedProjects } from "./dummy";

/**
 * Show the 12 sample ("illustrative") projects from the approved Projects mockup. They exist so the page looks like the
 * design before real project photos and scope are supplied. Set to false to hide every sample card and page.
 */
export const showIllustrativeProjects = true;

/** The four sector filters on /projects. `param` is the ?sector= value; `industry` is the matching sector in the data. */
export const projectSectors: { param: string; industry: IndustrySlug; label: string; heading: string }[] = [
  { param: "healthcare", industry: "healthcare", label: "Healthcare", heading: "Healthcare Projects" },
  { param: "commercial-retail", industry: "commercial-retail", label: "Commercial & Retail", heading: "Commercial & Retail Projects" },
  { param: "residential", industry: "residential-mixed-use", label: "Residential", heading: "Residential Projects" },
  { param: "institutional", industry: "education-institutional", label: "Institutional", heading: "Institutional Projects" },
];

/** Projects the owner has confirmed by name. Used by search, chat, the quote form and the homepage. */
export const projects: Project[] = confirmedProjects.map((p) => ({ ...p, services: [], illustrative: false }));

type Sample = [slug: string, name: string, industry: IndustrySlug, description: string, services: ServiceSlug[], size: [number, number]];
const [HVAC, FIRE, PLUMBING, ELECTRICAL]: ServiceSlug[] = ["hvac", "fire-fighting", "plumbing", "electrical-elv"];

const samples: Sample[] = [
  ["specialist-hospital", "Specialist Hospital", "healthcare", "A contemporary hospital facility with modern infrastructure.", [HVAC, FIRE, PLUMBING], [307, 123]],
  ["medical-centre", "Medical Centre", "healthcare", "A multi-specialty medical centre in a modern setting.", [HVAC, ELECTRICAL, PLUMBING], [299, 123]],
  ["diagnostic-clinic", "Diagnostic Clinic", "healthcare", "A purpose-built diagnostic clinic with modern services.", [HVAC, FIRE, ELECTRICAL], [309, 123]],
  ["office-tower", "Office Tower", "commercial-retail", "A modern office tower with a high-quality building environment.", [HVAC, ELECTRICAL, FIRE], [307, 123]],
  ["retail-centre", "Retail Centre", "commercial-retail", "A contemporary retail centre with a modern layout.", [HVAC, FIRE, PLUMBING], [299, 123]],
  ["business-park", "Business Park", "commercial-retail", "A modern business park with multiple office buildings.", [HVAC, ELECTRICAL, PLUMBING], [309, 123]],
  ["residential-towers", "Residential Towers", "residential-mixed-use", "A modern residential tower development with quality living spaces.", [HVAC, ELECTRICAL, PLUMBING], [307, 118]],
  ["apartment-community", "Apartment Community", "residential-mixed-use", "A well-planned apartment community with modern amenities.", [HVAC, FIRE, ELECTRICAL], [299, 118]],
  ["serviced-apartments", "Serviced Apartments", "residential-mixed-use", "A contemporary serviced apartment building for extended stays.", [HVAC, PLUMBING, ELECTRICAL], [309, 118]],
  ["university-campus", "University Campus", "education-institutional", "A modern university campus with academic and support facilities.", [HVAC, FIRE, ELECTRICAL], [307, 100]],
  ["training-centre", "Training Centre", "education-institutional", "A purpose-built training centre with modern facilities.", [HVAC, ELECTRICAL, PLUMBING], [299, 100]],
  ["research-facility", "Research Facility", "education-institutional", "A contemporary research facility for academic and applied use.", [HVAC, FIRE, PLUMBING], [309, 100]],
];

export const illustrativeProjects: Project[] = samples.map(([slug, name, sector, description, services, [width, height]]) => ({
  slug,
  name,
  sector,
  description,
  services,
  image: { src: `/images/projects/illustrative/${slug}.jpg`, width, height },
  illustrative: true,
}));

/** Everything the Projects pages list: real projects first, then the samples (unless switched off). */
export const allProjects: Project[] = [...projects, ...(showIllustrativeProjects ? illustrativeProjects : [])];
