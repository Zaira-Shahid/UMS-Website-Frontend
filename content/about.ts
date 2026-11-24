import {
  dummyCertifications,
  dummyLeadership,
  dummyMission,
  dummyPec,
  dummyTimeline,
  dummyValues,
} from "./dummy";

/** About UMS content. Values come from content/dummy.ts. */

export const mission: { statement: string; vision: string } = dummyMission;

export type ValueIcon = "compass" | "shield" | "users" | "lightbulb" | "gauge" | "wrench";

const valueIcons: ValueIcon[] = ["compass", "shield", "users", "lightbulb", "gauge", "wrench"];

export const values: { icon: ValueIcon; title: string; description: string }[] = dummyValues.map((v, i) => ({
  icon: valueIcons[i % valueIcons.length],
  ...v,
}));

/** Company milestones for the timeline. */
export const milestones: { year: string; title: string; description: string }[] = dummyTimeline;

/** Leadership cards (initials avatars, no portraits). */
export const leadership: { name: string; role: string; bio: string }[] = dummyLeadership;

/** Professional registration. */
export const pecRegistration: {
  registrationNumber: string;
  category: string;
  validUntil: string;
  verifyUrl: string;
} = dummyPec;

/** Certifications and accreditations. */
export const certifications: { name: string; issuer: string; validUntil: string; reference: string }[] =
  dummyCertifications;
