import type { Project } from "@/types";
import { placeholderImage } from "./images";

/**
 * Project NAMES are the only confirmed facts. Everything else — sector,
 * location, client, UMS package, status, timeline — is unconfirmed and left
 * empty. `pending` lists what the client must supply per project.
 */
const PENDING_ALL = [
  "Client / developer",
  "Main contractor",
  "Consultant",
  "UMS role and package",
  "Services delivered",
  "Location",
  "Timeline",
  "Approved photography",
];

const project = (slug: string, name: string): Project => ({
  slug,
  name,
  featured: true,
  status: "unconfirmed",
  services: [],
  summary:
    "Project details are awaiting confirmation from UMS. This page will describe the scope UMS delivered once approved information is supplied.",
  image: placeholderImage(`${name} — placeholder image`),
  pending: PENDING_ALL,
});

export const projects: Project[] = [
  project("lady-reading-hospital", "Lady Reading Hospital"),
  project("buch-international-hospital", "Buch International Hospital"),
  project("elanza-mall", "Elanza Mall"),
  project("pakistan-cricket-board-house", "Pakistan Cricket Board House"),
  project("cggc-head-office-eighteen", "CGGC Head Office at Eighteen"),
  project("jazz-destiny", "Jazz Destiny"),
];
