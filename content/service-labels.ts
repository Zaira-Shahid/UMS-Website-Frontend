import type { ServiceSlug } from "@/types";

/** Short labels used by the hero chips, the mobile service grid and the footer (as in the approved mockups). */
export const serviceLabel: Record<ServiceSlug, string> = {
  "integrated-mep": "Integrated MEP",
  hvac: "HVAC",
  "fire-fighting": "Fire Fighting",
  plumbing: "Plumbing",
  "electrical-elv": "Electrical & ELV",
  "pools-fountains": "Pools & Fountains",
};

/** Order of the chips and the mobile grid (mockups 01 and 02). */
export const chipOrder: ServiceSlug[] = ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains"];

/** Order of the footer's Services column (mockup 09). */
export const footerServiceOrder: ServiceSlug[] = ["integrated-mep", "hvac", "fire-fighting", "electrical-elv", "plumbing", "pools-fountains"];
