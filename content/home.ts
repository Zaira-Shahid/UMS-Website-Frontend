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

/** The approach to quality and safety in general terms. No certifications, figures or incident claims. */
export const qualityPrinciples = [
  {
    id: "qa",
    title: "Quality assurance & control",
    text: "Inspection and test plans agreed before installation, material submittals approved before ordering, and non-conformances tracked until they are closed.",
  },
  {
    id: "hse",
    title: "Health, safety & environment",
    text: "Method statements and risk assessments for each activity, permit-to-work coordination with the other trades, and regular toolbox talks.",
  },
  {
    id: "testing",
    title: "Inspection & testing",
    text: "Pressure, flow and performance tests witnessed and recorded against the design criteria before systems are concealed or handed over.",
  },
  {
    id: "records",
    title: "Documentation",
    text: "As-built drawings, operating manuals and test records issued at handover, so the people who run the building can maintain it.",
  },
] as const;
