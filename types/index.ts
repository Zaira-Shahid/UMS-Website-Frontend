/**
 * Shared content types. Shapes are CMS-ready (e.g. Sanity). All launch content comes from
 * content/dummy.ts and is replaced with approved UMS content before launch (see TODO.md).
 */

export type ServiceSlug =
  | "integrated-mep"
  | "hvac"
  | "fire-fighting"
  | "plumbing"
  | "electrical-elv"
  | "pools-fountains";

export type IndustrySlug =
  | "healthcare"
  | "commercial-retail"
  | "residential-mixed-use"
  | "hospitality"
  | "education-institutional"
  | "industrial-warehousing";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the image is cropped with object-cover. */
  position?: string;
  /** TODO: replace with approved UMS photography */
  isPlaceholder: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Keys for the lucide icons used by the systems grid (mapped in components/services/SystemIcon). */
export type SystemIconKey =
  | "fan" | "snowflake" | "wind" | "thermometer" | "flame" | "droplets" | "waves" | "zap"
  | "bell" | "megaphone" | "gauge" | "wrench" | "clipboard" | "package" | "hardhat" | "cable"
  | "network" | "siren" | "shower" | "filter" | "cloudrain" | "sprout" | "ruler" | "filesearch"
  | "layers" | "keyround" | "boxes" | "building" | "circuit" | "fuel";

export interface ServiceSystem {
  name: string;
  /** Two-line professional description of what the system is and does. */
  description: string;
  icon: SystemIconKey;
}

export interface ServiceApplication {
  industry: IndustrySlug;
  /** One line on why this sector needs the service. */
  note: string;
}

export interface ScopeItem {
  label: string;
  detail: string;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Hero-slide label, where it differs from `name` (e.g. "Fire Protection"). */
  shortName: string;
  /** One-line value statement. */
  tagline: string;
  /** Two or three sentences of introduction. */
  summary: string;
  /** Unique meta description (≤ 160 chars). */
  metaDescription: string;
  accent: "cyan" | "fire";
  systems: ServiceSystem[];
  applications: ServiceApplication[];
  scope: ScopeItem[];
  faqs: FaqItem[];
}

export interface Industry {
  slug: IndustrySlug;
  name: string;
  summary: string;
  services: ServiceSlug[];
  image: ImageAsset;
}

/**
 * A project the owner has confirmed by name. Nothing else about a project (city, year, size, client, package,
 * outcome) is stored until the owner supplies verified details.
 */
export interface Project {
  slug: string;
  name: string;
  /** The sector, set only when the project's name says what kind of building it is. */
  sector?: IndustrySlug;
  /** The city, where the company profile gives one. */
  city?: string;
  /** A more exact place (a district, a road or an enclave), where the company profile gives one. */
  area?: string;
  /** The people and companies named for this project in the company profile. */
  client?: string;
  consultant?: string;
  civilContractor?: string;
  mepContractor?: string;
  /** A contractor the profile names without saying which kind. */
  contractor?: string;
  /** The project's picture from the company profile, at its real pixel size. */
  image: { src: string; width: number; height: number };
}

export type InsightCategory = "safety-compliance" | "mep-systems" | "maintenance-operations";

export interface InsightSection {
  heading: string;
  body: string[];
}

export interface Insight {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  services: ServiceSlug[];
  readingMinutes: number;
  /** Opening paragraph, shown above the first heading. */
  intro: string;
  sections: InsightSection[];
}

export type CareerType = "Full-time" | "Contract";

export interface Career {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: CareerType;
  /** e.g. "5–8 years". */
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}
