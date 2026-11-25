import { dummyMission, dummyValues } from "./dummy";

/** About UMS content. Values come from content/dummy.ts (mission and values still need owner approval). */

export const mission: { statement: string; vision: string } = dummyMission;

export type ValueIcon = "compass" | "shield" | "users" | "lightbulb" | "gauge" | "wrench";

const valueIcons: ValueIcon[] = ["compass", "shield", "users", "lightbulb", "gauge", "wrench"];

export const values: { icon: ValueIcon; title: string; description: string }[] = dummyValues.map((v, i) => ({
  icon: valueIcons[i % valueIcons.length],
  ...v,
}));
