import Fuse from "fuse.js";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import type { ImageAsset } from "@/types";

export type SearchGroup = "Services" | "Projects" | "Pages";
export const searchGroups: SearchGroup[] = ["Services", "Projects", "Pages"];

export interface SearchItem {
  id: string;
  group: SearchGroup;
  title: string;
  description: string;
  href: string;
  keywords?: string[];
  image?: ImageAsset;
  /** Discipline colour for the result bar (services, and the lead service of projects and articles). */
  color?: string;
}

const pages: SearchItem[] = [
  { id: "p-about", group: "Pages", title: "About UMS", description: "Who we are and where we work.", href: "/about" },
  { id: "p-values", group: "Pages", title: "Mission & Values", description: "What guides our work.", href: "/about/mission-values" },
  { id: "p-quality", group: "Pages", title: "Quality, Safety & Delivery", description: "QA/QC, HSE, testing, commissioning and handover.", href: "/quality-safety-delivery", keywords: ["HSE", "QA", "QC", "inspection"] },
  { id: "p-industries", group: "Pages", title: "Industries", description: "Sectors UMS serves.", href: "/industries" },
  { id: "p-careers", group: "Pages", title: "Careers", description: "Working at UMS and how to apply.", href: "/careers", keywords: ["jobs", "apply"] },
  { id: "p-contact", group: "Pages", title: "Contact", description: "Offices in Islamabad and Lahore.", href: "/contact" },
  { id: "p-quote", group: "Pages", title: "Request a Quote", description: "Send a tender or project brief.", href: "/request-a-quote", keywords: ["RFQ", "tender", "enquiry"] },
];

export const searchItems: SearchItem[] = [
  ...services.map<SearchItem>((s) => ({
    id: `s-${s.slug}`,
    group: "Services",
    title: s.name,
    description: s.tagline,
    href: `/services/${s.slug}`,
    keywords: [s.shortName, ...s.systems.map((x) => x.name)],
    // Illustrated services have no photo to thumbnail (the palette falls back to an icon).
    image: s.illustration ? undefined : s.image,
    color: disciplineColor[s.slug],
  })),
  ...projects.map<SearchItem>((p) => ({
    id: `pr-${p.slug}`,
    group: "Projects",
    title: p.name,
    description: "Project",
    href: `/projects/${p.slug}`,
  })),
  ...pages,
];

export const searchIndex = new Fuse(searchItems, {
  keys: [
    { name: "title", weight: 2 },
    { name: "keywords", weight: 1.5 },
    { name: "description", weight: 1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
});

/** Shown before the user types. */
export const suggestedItems: SearchItem[] = searchItems.filter((i) =>
  ["s-hvac", "s-fire-fighting", "p-quote", "p-careers"].includes(i.id),
);
