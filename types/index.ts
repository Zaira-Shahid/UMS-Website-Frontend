/**
 * Shared content types. Shapes are CMS-ready (e.g. Sanity) — every
 * client-dependent field is optional or flagged via `confirmed`.
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

export type ProjectStatus = "completed" | "ongoing" | "unconfirmed";

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

export interface ServiceSystem {
  name: string;
  description?: string;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Hero-slide label, where it differs from `name` (e.g. "Fire Protection"). */
  shortName: string;
  tagline: string;
  summary: string;
  accent: "cyan" | "fire";
  systems: ServiceSystem[];
  scope: string[];
  applications: IndustrySlug[];
  image: ImageAsset;
  faqs: FaqItem[];
}

export interface Industry {
  slug: IndustrySlug;
  name: string;
  summary: string;
  services: ServiceSlug[];
  image: ImageAsset;
}

/** A value that still needs company confirmation. */
export interface Unconfirmed {
  confirmed: false;
  note: string;
}

export interface Project {
  slug: string;
  name: string;
  featured: boolean;
  status: ProjectStatus;
  sector?: IndustrySlug;
  /** Services UMS delivered — TODO: client to confirm for every project. */
  services: ServiceSlug[];
  location?: string;
  client?: string;
  mainContractor?: string;
  consultant?: string;
  umsRole?: string;
  timeline?: string;
  summary: string;
  image: ImageAsset;
  /** Fields still awaiting company confirmation (rendered as placeholders). */
  pending: string[];
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
  image: ImageAsset;
  sections: InsightSection[];
  /** Publish date — TODO: client to confirm */
  publishedAt?: string;
}

export interface Office {
  city: "Islamabad" | "Lahore";
  address?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
}

export interface Career {
  slug: string;
  title: string;
  department: string;
  location: string;
  summary: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}
