/**
 * Team page (mockup 16). The page and every link to it stay hidden until the owner supplies real names, roles and
 * photos. Set `showTeamPage` to true then, and fill `people`. No placeholder people are shown.
 */
export const showTeamPage = false;

/** Project-control functions shown in the org chart (general descriptions, not claims about headcount). */
export const controlFunctions = [
  { title: "Site Engineering", text: "Technical support on site", icon: "hardhat" },
  { title: "QA/QC", text: "Inspections and quality checks", icon: "clipboard" },
  { title: "HSE", text: "Health, safety and environment", icon: "shield" },
  { title: "Drafting", text: "Coordinated technical drawings", icon: "compass" },
  { title: "Site Delivery", text: "Installation and handover", icon: "toolbox" },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public to a photo supplied by the owner. */
  photo: string;
}

export const people: TeamMember[] = [];
