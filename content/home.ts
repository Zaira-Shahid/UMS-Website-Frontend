import { dummyClients } from "./dummy";

/* ------------------------------------------------------------ delivery */

export const deliverySteps = [
  {
    title: "Tender Review",
    text: "Drawings, specifications and the brief are read together so gaps and assumptions surface before pricing.",
  },
  {
    title: "Drawings & Coordination",
    text: "Shop drawings are coordinated across disciplines and with structure, resolving clashes on paper rather than on site.",
  },
  {
    title: "Procurement",
    text: "Equipment and materials are selected against the approved specification and scheduled to the programme.",
  },
  {
    title: "Installation",
    text: "Services are installed in sequence with other trades, with inspections held at defined stages.",
  },
  {
    title: "Testing & Commissioning",
    text: "Systems are pressure-tested, balanced and commissioned against design criteria, with records kept.",
  },
  {
    title: "Handover",
    text: "As-built drawings, manuals and test records are issued so the operating team can run the building.",
  },
] as const;

/* ------------------------------------------------------------- quality */

/** Topics covered by /quality-safety-delivery. */
export const qualityTopics = {
  qa: {
    title: "Quality assurance & control",
    points: [
      "Inspection and test plans agreed before installation",
      "Material submittals and approvals",
      "Pressure and performance testing records",
    ],
  },
  hse: {
    title: "Health, safety & environment",
    points: [
      "Method statements and risk assessments per activity",
      "Permit-to-work coordination with other trades",
      "Toolbox talks and incident reporting",
    ],
  },
} as const;

/* ------------------------------------------------------------- clients */

/** Client and collaborator wordmarks (dummy names from content/dummy.ts). */
export const clientNames = dummyClients;
