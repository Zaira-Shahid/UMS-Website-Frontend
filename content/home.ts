import type { ImageAsset, ServiceSlug } from "@/types";
import { photo } from "./images";

/* ---------------------------------------------------------------- hero */

export interface HeroSlide {
  service: ServiceSlug;
  /** Hero-slide label ("Fire Protection" is used only here and on shortcuts). */
  label: string;
  /** Short tab label shown below 1280px, where the full label would not fit. */
  shortLabel: string;
  accent: "cyan" | "fire";
  image: ImageAsset;
}

// TODO: replace with approved UMS photography (all four hero images).
export const heroSlides: HeroSlide[] = [
  { service: "integrated-mep", label: "Integrated MEP", shortLabel: "MEP", accent: "cyan", image: photo("glassTower", "center 38%") },
  { service: "hvac", label: "HVAC", shortLabel: "HVAC", accent: "cyan", image: photo("pumpRoom", "center 32%") },
  { service: "fire-fighting", label: "Fire Protection", shortLabel: "Fire", accent: "fire", image: photo("redPipes", "center 45%") },
  { service: "electrical-elv", label: "Electrical & ELV", shortLabel: "Electrical", accent: "cyan", image: photo("breakerPanel", "center 40%") },
];

/** Service shortcut strip overlapping the hero. */
export const shortcutServices: ServiceSlug[] = [
  "hvac",
  "fire-fighting",
  "electrical-elv",
  "plumbing",
];

/* ------------------------------------------------------------ delivery */

export const deliverySteps = [
  {
    title: "Tender Review",
    text: "Drawings, specifications and the brief are read together so gaps and assumptions surface before pricing.",
  },
  {
    title: "Drawings & Coordination",
    text: "Shop drawings are coordinated across disciplines and with structure, resolving clashes on paper rather than on site.",
  },
  {
    title: "Procurement",
    text: "Equipment and materials are selected against the approved specification and scheduled to the programme.",
  },
  {
    title: "Installation",
    text: "Services are installed in sequence with other trades, with inspections held at defined stages.",
  },
  {
    title: "Testing & Commissioning",
    text: "Systems are pressure-tested, balanced and commissioned against design criteria, with records kept.",
  },
  {
    title: "Handover",
    text: "As-built drawings, manuals and test records are issued so the operating team can run the building.",
  },
] as const;

/* ------------------------------------------------------------- quality */

/** Topics covered by /quality-safety-delivery. UMS-specific procedures TBC. */
export const qualityTopics = {
  qa: {
    title: "Quality assurance & control",
    points: [
      "Inspection and test plans agreed before installation",
      "Material submittals and approvals",
      "Pressure and performance testing records",
    ],
  },
  hse: {
    title: "Health, safety & environment",
    points: [
      "Method statements and risk assessments per activity",
      "Permit-to-work coordination with other trades",
      "Toolbox talks and incident reporting",
    ],
  },
} as const;

/* ------------------------------------------------------------- clients */

/** TODO: approved client / collaborator logos only — slots are placeholders. */
export const clientSlots = [
  "Client 01",
  "Client 02",
  "Client 03",
  "Client 04",
  "Client 05",
  "Client 06",
  "Client 07",
  "Client 08",
] as const;
