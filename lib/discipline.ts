import type { ServiceSlug } from "@/types";

/** Discipline accent colours (spec §3.1). Use only on that discipline's own content. */
export const disciplineColor: Record<ServiceSlug, string> = {
  "integrated-mep": "var(--mep)",
  hvac: "var(--hvac)",
  "fire-fighting": "var(--fire)",
  plumbing: "var(--plumbing)",
  "electrical-elv": "var(--electric)",
  "pools-fountains": "var(--pools)",
};
