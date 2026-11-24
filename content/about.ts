import type { ImageAsset } from "@/types";

/**
 * About UMS content. Nothing about the company's story, people or credentials has
 * been supplied yet, so every field below is `undefined` and renders as a clearly
 * marked "to be confirmed" placeholder. Fill a value in and the placeholder
 * disappears — components never invent text.
 * TODO: client to confirm — everything in this file.
 */

/** Mission statement. TODO: client to confirm wording. */
export const mission: { statement?: string; vision?: string } = {};

export type ValueIcon = "compass" | "shield" | "users" | "lightbulb" | "gauge" | "wrench";

/** Six value slots; the icons are decorative defaults, the names and descriptions are TODO. */
export const values: { icon: ValueIcon; title?: string; description?: string }[] = [
  { icon: "compass" },
  { icon: "shield" },
  { icon: "users" },
  { icon: "lightbulb" },
  { icon: "gauge" },
  { icon: "wrench" },
];

/** Company milestones for the timeline. TODO: client to confirm years and events. */
export const milestones: { year?: string; title?: string; description?: string }[] = [
  {},
  {},
  {},
  {},
  {},
];

/** Leadership cards. TODO: client to confirm names, roles, bios and approved portraits. */
export const leadership: {
  name?: string;
  role?: string;
  bio?: string;
  portrait?: ImageAsset;
}[] = [{}, {}, {}];

/** Professional registration. TODO: client to confirm PEC details and a verification link. */
export const pecRegistration: {
  registrationNumber?: string;
  category?: string;
  validUntil?: string;
  /** Where a visitor can verify the registration. */
  verifyUrl?: string;
} = {};

/** Certifications and accreditations. TODO: client to confirm — list only what UMS holds. */
export const certifications: {
  name?: string;
  issuer?: string;
  validUntil?: string;
}[] = [{}, {}, {}, {}, {}, {}];
