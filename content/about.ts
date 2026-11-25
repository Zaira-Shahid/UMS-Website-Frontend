import { dummyMission, dummyValues } from "./dummy";

/** About UMS content. Wording lives in content/dummy.ts and still needs owner approval (CONTENT_TO_VERIFY.md). */

export const mission: { statement: string; vision: string } = dummyMission;

export const values: { title: string; description: string }[] = dummyValues;

/** Engineering & Delivery Capabilities (mockup 15). General wording about how the work is organised; no claims about people or numbers. */
export type CapabilityIcon = "tender" | "coordination" | "install" | "quality";

export const capabilities: { title: string; text: string; icon: CapabilityIcon }[] = [
  { title: "Tender & Planning", text: "We review tender documents, define the scope and plan the work around key project milestones.", icon: "tender" },
  { title: "Design & Coordination", text: "We coordinate drawings, resolve clashes and align building systems before work begins on site.", icon: "coordination" },
  { title: "Procurement & Installation", text: "We source equipment and materials, then coordinate installation with the site team.", icon: "install" },
  { title: "Quality & Commissioning", text: "We inspect installations, test system performance and document results for handover.", icon: "quality" },
];

/** Core values icons (mockup 14), by value title. */
export const valueIcons: Record<string, "ruler" | "hardhat" | "shield" | "handshake" | "layers" | "award"> = {
  Precision: "ruler",
  Safety: "hardhat",
  Integrity: "shield",
  Collaboration: "handshake",
  Reliability: "layers",
  Craft: "award",
};
