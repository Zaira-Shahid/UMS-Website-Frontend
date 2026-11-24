import { photo } from "./images";
import type { ImageAsset } from "@/types";

export interface QualitySection {
  id: string;
  title: string;
  /** Short label for the side table of contents. */
  short: string;
  /** What this stage is, in general engineering terms. Not a claim about UMS. */
  summary: string;
  /** Activities typically covered at this stage on an MEP project. Not a claim about UMS. */
  checklist: string[];
  /** How UMS runs this stage on its own projects (dummy copy, replace before launch). */
  umsProcedure: string;
  /** Stock photo; does not show UMS work. */
  image: ImageAsset;
  icon: "clipboard" | "hardhat" | "search" | "gauge" | "files";
}

/**
 * Quality, Safety & Delivery. Summaries and checklists describe what each stage typically
 * involves on an MEP project; `umsProcedure` is how UMS runs it (dummy copy).
 */
export const qualitySections: QualitySection[] = [
  {
    id: "qa-qc",
    umsProcedure:
      "Every UMS project runs an inspection and test plan approved by the consultant before work starts. Our QA/QC manager signs off material submittals, and hold points are enforced on site: no pipework is concealed until its inspection request is closed. Our quality system is certified to ISO 9001:2015.",
    short: "QA / QC",
    title: "Quality assurance and quality control",
    icon: "clipboard",
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
    image: photo("ceilingServices", "center 40%"),
  },
  {
    id: "hse",
    umsProcedure:
      "UMS reports a lost-time-incident record every year and had zero in 2025. Every site has a named HSE officer, daily toolbox talks, a live permit-to-work register and a weekly look-ahead with other trades. Our safety system is certified to ISO 45001:2018.",
    short: "HSE",
    title: "Health, safety and environment",
    icon: "hardhat",
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
    image: photo("redPipes", "center 50%"),
  },
  {
    id: "inspection-testing",
    umsProcedure:
      "UMS witnesses pressure, leakage, insulation-resistance and flow tests with the consultant, using calibrated instruments whose certificates are filed with each record. Test results are measured, not just marked pass, so the baseline is on file for future maintenance.",
    short: "Inspection & testing",
    title: "Inspection and testing",
    icon: "search",
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
    image: photo("breakerPanel", "center 45%"),
  },
  {
    id: "commissioning",
    umsProcedure:
      "Commissioning at UMS follows a written plan agreed in advance: pre-commissioning checks, balancing, controls verification and integrated systems tests, led by a named commissioning engineer and recorded system by system.",
    short: "Commissioning",
    title: "Commissioning",
    icon: "gauge",
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
    image: photo("pumpRoom", "center 35%"),
  },
  {
    id: "handover",
    umsProcedure:
      "UMS builds the handover pack from the first week of each project. At completion the owner receives as-built drawings, O&M manuals, certificates and warranties indexed by system, plus recorded training sessions for the facilities team.",
    short: "Handover",
    title: "Handover documentation",
    icon: "files",
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
    image: photo("glassTower", "center 30%"),
  },
];
