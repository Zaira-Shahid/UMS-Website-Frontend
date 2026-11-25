export interface QualitySection {
  id: string;
  title: string;
  /** Short label for the side table of contents. */
  short: string;
  /** What this stage is, in general engineering terms. Not a claim about UMS. */
  summary: string;
  /** Activities typically covered at this stage on an MEP project. Not a claim about UMS. */
  checklist: string[];
}

/**
 * Quality, Safety & Delivery, in general terms: what each stage typically involves on an MEP project.
 * Nothing here is a claim about how UMS runs its own projects.
 */
export const qualitySections: QualitySection[] = [
  {
    id: "qa-qc",
    short: "QA / QC",
    title: "Quality assurance and quality control",
    summary:
      "Quality assurance sets the procedures that prevent defects; quality control checks the work against them. On an MEP package both run from material approval through to final inspection.",
    checklist: [
      "Material and equipment submittals approved before ordering",
      "Inspection and test plans agreed with the consultant",
      "Inspection requests raised and signed off for each installation stage",
      "Non-conformance reports raised, tracked and closed out",
      "Test instruments calibrated, with certificates on file",
      "Records kept as the work progresses, not assembled at the end",
    ],
  },
  {
    id: "hse",
    short: "HSE",
    title: "Health, safety and environment",
    summary:
      "Health, safety and environment planning keeps people safe and the site compliant. For building services it covers work at height, hot work, live electrical work and coordination with other trades.",
    checklist: [
      "Risk assessments and method statements prepared before work starts",
      "Site induction and regular toolbox talks",
      "Permit-to-work for hot work, confined spaces and live electrical work",
      "Personal protective equipment matched to the task",
      "Safe storage, handling and waste disposal of materials",
      "Incident and near-miss reporting with follow-up",
    ],
  },
  {
    id: "inspection-testing",
    short: "Inspection & testing",
    title: "Inspection and testing",
    summary:
      "Systems are inspected and tested in stages, so faults are found while they are still accessible. Tests are normally witnessed and recorded for the client and consultant.",
    checklist: [
      "Pressure testing of pipework before it is insulated or concealed",
      "Insulation-resistance and continuity tests on electrical circuits",
      "Leakage testing of ductwork",
      "Flow and operation tests on sprinkler and fire-detection systems",
      "Witnessed tests with the consultant or client where required",
      "Test records signed and filed for handover",
    ],
  },
  {
    id: "commissioning",
    short: "Commissioning",
    title: "Commissioning",
    summary:
      "Commissioning proves that installed systems work together as designed. It follows testing and includes balancing, controls checks and integrated systems tests.",
    checklist: [
      "Pre-commissioning checks complete before start-up",
      "Air and water systems balanced to design flows",
      "Controls, interlocks and alarms functionally tested",
      "Interfaces tested, for example fire alarm to ventilation and lifts",
      "Performance verified against the design intent",
      "Commissioning records issued for each system",
    ],
  },
  {
    id: "handover",
    short: "Handover",
    title: "Handover documentation",
    summary:
      "A complete handover pack lets the building operator run and maintain the systems. It is normally assembled throughout the project and issued at completion.",
    checklist: [
      "As-built drawings reflecting what was installed",
      "Operation and maintenance manuals for each system",
      "Test and commissioning certificates",
      "Warranties and manufacturer documentation",
      "Training for the facilities team",
      "Schedules of spare parts and special tools",
    ],
  },
];
