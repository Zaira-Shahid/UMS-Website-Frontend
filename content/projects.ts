import type { Project } from "@/types";
import { dummyProjects } from "./dummy";
import { photo } from "./images";

/**
 * Twelve projects built from content/dummy.ts: the six featured case studies and six more.
 * Images are stock architecture photos that do not depict the projects.
 */
export const projects: Project[] = dummyProjects.map(({ image, imagePosition, gallery, durationMonths, year, ...p }) => ({
  ...p,
  year,
  durationMonths,
  timeline: `${year - Math.ceil(durationMonths / 12)}–${p.status === "ongoing" ? "present" : year} (${durationMonths} months)`,
  image: photo(image, imagePosition),
  gallery: [[image, imagePosition] as [typeof image, string | undefined], ...gallery].map(([k, pos]) => photo(k, pos)),
}));
