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

/**
 * Detail-page text for the sample projects. It describes a typical approach for this kind of building in neutral wording
 * ("are routed", "are coordinated"), never "we planned" or "we delivered", because these are not UMS projects.
 */
const sampleCopy: Record<string, { subtitle: string; overview: [string, string] }> = {
  "specialist-hospital": {
    subtitle: "Coordinated building services for a healthcare facility",
    overview: [
      "In a hospital, building services are routed around clinical and support spaces so that air, water, power and life-safety systems can be installed and maintained with as little disruption as possible.",
      "A typical scope is drawn and coordinated on shared drawings before installation, then tested system by system and handed over with complete records.",
    ],
  },
  "medical-centre": {
    subtitle: "Building services for a multi-specialty medical centre",
    overview: [
      "A medical centre mixes consulting rooms, diagnostics and waiting areas, so ventilation, power and water services are zoned to suit each use and kept accessible for maintenance.",
      "Services are normally coordinated above the ceilings and in shafts before work starts, then commissioned and documented room by room.",
    ],
  },
  "diagnostic-clinic": {
    subtitle: "Building services for a diagnostic clinic",
    overview: [
      "Diagnostic spaces depend on stable power, controlled air and reliable water, so these services are planned together with the equipment rooms they serve.",
      "A typical scope is coordinated early, installed in a clear sequence, and tested and handed over with the records the operator needs.",
    ],
  },
  "office-tower": {
    subtitle: "Coordinated building services for a commercial office tower",
    overview: [
      "In an office tower, services run through risers, plant rooms and ceiling voids shared by many trades, so routes and levels are agreed on coordinated drawings before installation.",
      "Systems are then tested floor by floor and in operation together, and handed over with operating and maintenance information.",
    ],
  },
  "retail-centre": {
    subtitle: "Building services for a retail centre",
    overview: [
      "Retail centres have large open areas, many tenant units and long service routes, so main distribution is planned to leave room for later fit-outs.",
      "A typical scope is coordinated with the building design, installed in phases that suit the opening programme, and tested before handover.",
    ],
  },
  "business-park": {
    subtitle: "Building services for a multi-building business park",
    overview: [
      "A business park shares plant and distribution across several buildings, so external routes and each building's services are planned as one system.",
      "Typical work is sequenced building by building, tested individually and together, and handed over with consistent records.",
    ],
  },
  "residential-towers": {
    subtitle: "Coordinated building services for residential towers",
    overview: [
      "In residential towers, shared services such as water supply, fire protection and power distribution serve many apartments, so vertical routes and plant rooms are planned carefully.",
      "A typical scope is coordinated floor by floor, tested before occupation, and handed over with clear maintenance records.",
    ],
  },
  "apartment-community": {
    subtitle: "Building services for an apartment community",
    overview: [
      "An apartment community has several blocks and shared amenities, so services are planned for each block and for the common areas between them.",
      "Work is usually repeated block by block with the same checks, then tested and handed over with records for each.",
    ],
  },
  "serviced-apartments": {
    subtitle: "Building services for serviced apartments",
    overview: [
      "Serviced apartments combine home-like units with hotel-style shared areas, so comfort, hot water and quiet running matter as much as capacity.",
      "A typical scope is coordinated with the interior layout, tested unit by unit, and handed over with operating guidance.",
    ],
  },
  "university-campus": {
    subtitle: "Building services for a university campus",
    overview: [
      "A campus has buildings of different ages and uses, so services are planned building by building and connected through shared distribution where it suits.",
      "Typical work is phased around the academic calendar, tested in each building, and handed over with records for the facilities team.",
    ],
  },
  "training-centre": {
    subtitle: "Building services for a training centre",
    overview: [
      "Training rooms, workshops and offices have different needs, so ventilation, power and water services are zoned for each space.",
      "A typical scope is coordinated early, installed in a clear sequence, then tested and handed over with the records the operator needs.",
    ],
  },
  "research-facility": {
    subtitle: "Building services for a research facility",
    overview: [
      "Research buildings often need controlled air, dependable power and clean water, so services are planned around laboratories and equipment rooms.",
      "A typical scope is coordinated with the users' requirements, tested carefully, and handed over with detailed records.",
    ],
  },
};

export const illustrativeProjects: Project[] = samples.map(([slug, name, sector, description, services, [width, height]]) => ({
  slug,
  name,
  sector,
  description,
  subtitle: sampleCopy[slug].subtitle,
  overview: sampleCopy[slug].overview,
  services,
  image: { src: `/images/projects/illustrative/${slug}.jpg`, width, height },
  illustrative: true,
}));

/** Everything the Projects pages list: real projects first, then the samples (unless switched off). */
export const allProjects: Project[] = [...projects, ...(showIllustrativeProjects ? illustrativeProjects : [])];
