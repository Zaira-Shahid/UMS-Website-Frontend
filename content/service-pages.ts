import type { IndustrySlug, ServiceSlug } from "@/types";
import type { PhotoKey } from "./images";

/**
 * Copy and imagery for the Services pages (PROJECT_SPEC.md section 13, mockups 10 and 11).
 * The wording is general engineering description and makes no claims about UMS or its projects.
 */

/** Keys for the small line icons in the "What's Included" rows (mapped in components/services/IncludedIcon.tsx). */
export type IncludedIconKey =
  | "ruler" | "package" | "hardhat" | "clipboard" | "snowflake" | "wind" | "fan" | "droplets" | "gauge" | "bell"
  | "flame" | "waves" | "zap" | "cable" | "lightbulb" | "shield" | "filter" | "settings" | "layers" | "wrench";

export interface IncludedItem {
  icon: IncludedIconKey;
  text: string;
}

export interface ApplicationCard {
  /** Building type shown as the card title. */
  title: string;
  /** Links to /industries#<industry>. */
  industry: IndustrySlug;
  text: string;
  photo: PhotoKey;
  position?: string;
}

export interface ServicePage {
  /** One line on the /services card (mockup 10). */
  cardLine: string;
  /** Two or three sentences under the title on the detail page. */
  intro: string;
  /** Short italic caption under the wide hero photo. */
  caption: string;
  included: IncludedItem[];
  applications: [ApplicationCard, ApplicationCard];
  /** Short name used in "Discuss Your ___ Project". */
  ctaName: string;
  /**
   * Photo for the "What's Included" column when the service has no included.jpg of its own: a stand-in photo that
   * fits the service, or null to show the list on its own. Files in public/images/services/<slug>/ win.
   * See lib/service-images.ts.
   */
  includedPhoto: PhotoKey | null;
}

export const servicePages: Record<ServiceSlug, ServicePage> = {
  "integrated-mep": {
    cardLine: "Coordinated building systems.",
    intro:
      "Integrated MEP brings mechanical, electrical and plumbing work into one coordinated project scope. System layouts, installation schedules and testing requirements are aligned across disciplines.",
    caption: "Coordinated building services",
    included: [
      { icon: "ruler", text: "Drawing coordination and clash reviews" },
      { icon: "package", text: "Equipment and material procurement" },
      { icon: "hardhat", text: "Coordinated installation across trades" },
      { icon: "clipboard", text: "Testing, commissioning and handover documentation" },
    ],
    applications: [
      {
        title: "Commercial Building",
        industry: "commercial-retail",
        text: "Coordinated mechanical, electrical and plumbing systems for a multi-storey commercial building, with aligned layouts, installation and testing across trades.",
        photo: "glassTower",
        position: "center 40%",
      },
      {
        title: "Industrial Facility",
        industry: "industrial-warehousing",
        text: "Coordinated MEP systems for an industrial facility, aligning service routes, equipment installation and commissioning to support reliable operations.",
        photo: "facade",
      },
    ],
    ctaName: "MEP",
    includedPhoto: null,
  },
  hvac: {
    cardLine: "Ventilation, cooling and climate control.",
    intro:
      "HVAC covers the systems that heat, cool, ventilate and filter the air inside a building. The scope depends on the building's size, use and occupancy, and is agreed with the design team.",
    caption: "Plant and air distribution",
    included: [
      { icon: "snowflake", text: "Chillers and central plant" },
      { icon: "wind", text: "VRF and split systems" },
      { icon: "fan", text: "Ductwork and air distribution" },
      { icon: "droplets", text: "Chilled-water piping and pumps" },
      { icon: "gauge", text: "Testing and balancing" },
    ],
    applications: [
      {
        title: "Hospital",
        industry: "healthcare",
        text: "Controlled temperature, ventilation and air quality for clinical and patient areas, with systems arranged for dependable operation.",
        photo: "wavyRoof",
        position: "center 40%",
      },
      {
        title: "Hotel",
        industry: "hospitality",
        text: "Comfort cooling and fresh-air ventilation for guest rooms, lobbies and shared spaces, balanced to suit how each area is used.",
        photo: "glassReflection",
      },
    ],
    ctaName: "HVAC",
    includedPhoto: null,
  },
  "fire-fighting": {
    cardLine: "Fire protection and suppression.",
    intro:
      "Fire fighting and protection covers the systems that detect, control and extinguish fire and help people leave a building safely. Systems follow the applicable codes and are tested before handover.",
    caption: "Sprinkler and fire-water pipework",
    included: [
      { icon: "droplets", text: "Sprinkler systems" },
      { icon: "gauge", text: "Fire pumps and water storage" },
      { icon: "waves", text: "Hydrants, hose reels and risers" },
      { icon: "bell", text: "Fire alarm and detection" },
      { icon: "clipboard", text: "Testing and commissioning" },
    ],
    applications: [
      {
        title: "Commercial Building",
        industry: "commercial-retail",
        text: "Sprinkler, hydrant and alarm systems for offices and retail floors, arranged around the building's occupancy and escape routes.",
        photo: "glassTower",
        position: "center 30%",
      },
      {
        title: "Residential Tower",
        industry: "residential-mixed-use",
        text: "Riser, pump and detection systems that protect shared corridors, stairs and basements in a multi-storey residential building.",
        photo: "highRise",
      },
    ],
    ctaName: "Fire Protection",
    includedPhoto: null,
  },
  plumbing: {
    cardLine: "Water supply and drainage.",
    intro:
      "Plumbing and public health covers the water supply, drainage and sanitary systems that keep a building safe and hygienic. Work is arranged around the building's fixtures, demand and drainage levels.",
    caption: "Pumps, valves and water pipework",
    included: [
      { icon: "droplets", text: "Cold and hot water supply" },
      { icon: "waves", text: "Drainage, soil and waste pipework" },
      { icon: "settings", text: "Pumps and storage tanks" },
      { icon: "wrench", text: "Sanitary fixtures and fittings" },
      { icon: "clipboard", text: "Pressure testing and flushing" },
    ],
    applications: [
      {
        title: "Residential Building",
        industry: "residential-mixed-use",
        text: "Water supply and drainage for apartments and shared areas, with pumps and tanks sized to the number of units served.",
        photo: "highRise",
        position: "center 40%",
      },
      {
        title: "Educational Institution",
        industry: "education-institutional",
        text: "Sanitary, water and drainage systems for classrooms, laboratories and washrooms with high peak use.",
        photo: "facade",
      },
    ],
    ctaName: "Plumbing",
    includedPhoto: "pumpRoom",
  },
  "electrical-elv": {
    cardLine: "Power distribution and low-voltage systems.",
    intro:
      "Electrical and ELV covers how power reaches and moves through a building, along with the low-voltage systems for data, security and communication. Scope is set with the electrical design and the building's loads.",
    caption: "Distribution boards and cabling",
    included: [
      { icon: "zap", text: "Power distribution and LT panels" },
      { icon: "cable", text: "Cable trays, containment and cabling" },
      { icon: "lightbulb", text: "Lighting and small power" },
      { icon: "shield", text: "ELV: data, CCTV and access control" },
      { icon: "clipboard", text: "Testing and commissioning" },
    ],
    applications: [
      {
        title: "Commercial Building",
        industry: "commercial-retail",
        text: "Distribution, lighting and low-voltage systems for offices and retail floors, laid out around tenant fit-outs.",
        photo: "glassTower",
        position: "center 50%",
      },
      {
        title: "Industrial Facility",
        industry: "industrial-warehousing",
        text: "Power distribution and containment for plant, machinery and warehouse areas, with provision for future load.",
        photo: "facade",
        position: "center 60%",
      },
    ],
    ctaName: "Electrical & ELV",
    includedPhoto: "breakerPanel",
  },
  "pools-fountains": {
    cardLine: "Water circulation and fountain systems.",
    intro:
      "Pools and fountains cover the pipework, pumps, filtration and controls that keep water features clean, safe and running. Work is arranged around the size of the feature and how it will be used.",
    caption: "Pool and fountain water features",
    included: [
      { icon: "waves", text: "Pool and fountain pipework" },
      { icon: "settings", text: "Circulation pumps and balance tanks" },
      { icon: "filter", text: "Filtration and water treatment" },
      { icon: "lightbulb", text: "Controls and lighting connections" },
      { icon: "clipboard", text: "Testing and commissioning" },
    ],
    applications: [
      {
        title: "Hotel",
        industry: "hospitality",
        text: "Circulation, filtration and controls for guest pools and decorative water features at the entrance and courtyards.",
        photo: "glassReflection",
        position: "center 60%",
      },
      {
        title: "Residential Development",
        industry: "residential-mixed-use",
        text: "Shared pools and fountains for residential communities, set up for steady circulation and straightforward upkeep.",
        photo: "highRise",
        position: "center 30%",
      },
    ],
    ctaName: "Pools & Fountains",
    includedPhoto: "poolFountain",
  },
};
