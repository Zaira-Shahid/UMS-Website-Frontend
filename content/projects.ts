import type { Project } from "@/types";
import { photo, type PhotoKey } from "./images";

/**
 * Project NAMES are the only confirmed facts. Everything else — sector,
 * location, client, UMS package, status, timeline — is unconfirmed and left
 * empty. `pending` lists what the client must supply per project.
 *
 * Images are stock architecture placeholders that do NOT depict these projects.
 * TODO: replace with approved UMS photography.
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

const project = (
  slug: string,
  name: string,
  image: PhotoKey,
  position: string | undefined,
  gallery: [PhotoKey, string?][],
): Project => ({
  slug,
  name,
  featured: true,
  status: "unconfirmed",
  services: [],
  summary:
    "Project details are awaiting confirmation from UMS. This page will describe the scope UMS delivered once approved information is supplied.",
  image: photo(image, position),
  // TODO: replace with approved UMS photography — these stock photos do not depict the project.
  gallery: ([[image, position], ...gallery] as [PhotoKey, string | undefined][]).map(([k, pos]) =>
    photo(k, pos),
  ),
  pending: PENDING_ALL,
});

export const projects: Project[] = [
  project("lady-reading-hospital", "Lady Reading Hospital", "wavyRoof", undefined, [["glassReflection"], ["facade", "center 40%"]]),
  project("buch-international-hospital", "Buch International Hospital", "glassTower", "center 30%", [["glassReflection"], ["highRise"]]),
  project("elanza-mall", "Elanza Mall", "facade", "center 40%", [["wavyRoof"], ["glassTower", "center 30%"]]),
  project("pakistan-cricket-board-house", "Pakistan Cricket Board House", "glassReflection", undefined, [["wavyRoof"], ["highRise"]]),
  project("cggc-head-office-eighteen", "CGGC Head Office at Eighteen", "highRise", undefined, [["glassTower", "center 30%"], ["glassReflection"]]),
  project("jazz-destiny", "Jazz Destiny", "facade", "center 80%", [["glassTower", "center 60%"], ["highRise"]]),
];
