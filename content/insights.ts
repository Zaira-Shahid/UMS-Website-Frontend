import type { Insight, InsightCategory } from "@/types";
import { photo } from "./images";

export const insightCategories: { slug: InsightCategory; name: string; summary: string }[] = [
  {
    slug: "safety-compliance",
    name: "Safety & Compliance",
    summary: "Planning, records and discipline that keep MEP works safe and auditable.",
  },
  {
    slug: "mep-systems",
    name: "MEP Systems",
    summary: "Practical notes on how building services are selected and coordinated.",
  },
  {
    slug: "maintenance-operations",
    name: "Maintenance & Operations",
    summary: "Keeping systems performing after handover.",
  },
];

/** General engineering guidance only — no UMS-specific claims. */
export const insights: Insight[] = [
  {
    slug: "site-safety-planning-for-mep-works",
    title: "Site Safety Planning for MEP Works",
    category: "safety-compliance",
    excerpt:
      "MEP installation overlaps with many trades. A written safety plan, agreed before mobilisation, keeps that overlap under control.",
    services: ["integrated-mep"],
    readingMinutes: 4,
    image: photo("ceilingServices", "center 40%"),
    sections: [
      {
        heading: "Start with the work, not the template",
        body: [
          "Good safety planning begins by listing the activities that will actually take place: working at height, hot works, lifting plant, confined spaces and live electrical work. Each activity gets a method statement and a risk assessment written for that site.",
        ],
      },
      {
        heading: "Coordinate with other trades",
        body: [
          "MEP crews share ceilings, shafts and plant rooms with structure, finishes and fit-out teams. Permit-to-work arrangements and a regular look-ahead meeting reduce the chance of two crews creating a hazard for each other.",
        ],
      },
      {
        heading: "Record and review",
        body: [
          "Toolbox talks, inspections and incident reports are only useful when they are kept and reviewed. Short, regular reviews catch recurring issues before they become incidents.",
        ],
      },
    ],
  },
  {
    slug: "fire-protection-inspection-records",
    title: "Fire Protection Inspection Records",
    category: "safety-compliance",
    excerpt:
      "A fire protection system is only as credible as its paper trail. Here is what inspection and test records should capture.",
    services: ["fire-fighting"],
    readingMinutes: 4,
    image: photo("redPipes"),
    sections: [
      {
        heading: "Why records matter",
        body: [
          "Authorities, insurers and building operators rely on inspection records to confirm that a system was installed and tested as designed. Missing records can delay approvals even when the installation is sound.",
        ],
      },
      {
        heading: "What to capture",
        body: [
          "Records typically identify the system, the date, the inspector, the test performed, the result and any rectification. Pressure tests, flow tests and pump performance tests are recorded against the specified criteria.",
        ],
      },
      {
        heading: "Keep them with the handover pack",
        body: [
          "Inspection records belong in the handover documentation alongside as-built drawings and operating instructions, so the operating team can find them years later.",
        ],
      },
    ],
  },
  {
    slug: "vrf-and-chilled-water-systems",
    title: "VRF and Chilled-Water Systems",
    category: "mep-systems",
    excerpt:
      "Two common ways to cool a large building, and the questions that help choose between them.",
    services: ["hvac"],
    readingMinutes: 5,
    image: photo("pumpRoom", "center 30%"),
    sections: [
      {
        heading: "How each system works",
        body: [
          "A VRF system circulates refrigerant between outdoor units and many indoor units, adjusting flow to each zone. A chilled-water system cools water at a central plant and pumps it to air-handling units and fan-coil units.",
        ],
      },
      {
        heading: "Choosing between them",
        body: [
          "VRF often suits buildings with many independently controlled zones and limited plant space. Chilled water tends to suit larger loads, long service life and buildings where central plant is already planned. Refrigerant pipe-length limits, plant space and operating cost all feed the decision.",
        ],
      },
      {
        heading: "Coordinate early",
        body: [
          "Either choice affects structure, shafts and ceiling depth. Settling the system type early prevents rework when shop drawings are coordinated.",
        ],
      },
    ],
  },
  {
    slug: "coordinating-mep-shop-drawings",
    title: "Coordinating MEP Shop Drawings",
    category: "mep-systems",
    excerpt:
      "Most site clashes are cheaper to fix on a drawing. How coordinated shop drawings keep services fitting the building.",
    services: ["integrated-mep"],
    readingMinutes: 4,
    image: photo("glassTower", "center 55%"),
    sections: [
      {
        heading: "One model, many disciplines",
        body: [
          "Coordination overlays ducts, pipes, cable trays and structure so that routes, levels and access clearances are resolved before fabrication.",
        ],
      },
      {
        heading: "Resolve clashes in priority order",
        body: [
          "Gravity drainage and large ducts are fixed first because they have the least freedom; smaller pipes and cables are routed around them. Maintenance access and clearances are checked at the same time.",
        ],
      },
      {
        heading: "Sign-off before fabrication",
        body: [
          "A formal review cycle with the consultant and main contractor gives everyone a single approved set of drawings to build from.",
        ],
      },
    ],
  },
  {
    slug: "hvac-maintenance-planning",
    title: "HVAC Maintenance Planning",
    category: "maintenance-operations",
    excerpt:
      "A planned maintenance schedule protects comfort, energy use and equipment life.",
    services: ["hvac"],
    readingMinutes: 4,
    image: photo("pumpRoom", "center 75%"),
    sections: [
      {
        heading: "Planned versus reactive",
        body: [
          "Reactive maintenance fixes failures after they disrupt occupants. A planned schedule inspects, cleans and tests equipment at set intervals so problems are found early.",
        ],
      },
      {
        heading: "Build the schedule from the equipment list",
        body: [
          "Start with an asset register — chillers, pumps, air-handling units, filters, controls — and assign tasks and frequencies from manufacturer guidance and site conditions.",
        ],
      },
      {
        heading: "Use the data",
        body: [
          "Logs of temperatures, pressures and filter changes show trends. A slow drift in performance is an early warning that is easy to miss without records.",
        ],
      },
    ],
  },
  {
    slug: "mep-handover-documentation",
    title: "MEP Handover Documentation",
    category: "maintenance-operations",
    excerpt:
      "The handover pack is the building's operating manual. What a complete one contains.",
    services: ["integrated-mep"],
    readingMinutes: 4,
    image: photo("glassReflection"),
    sections: [
      {
        heading: "What a handover pack includes",
        body: [
          "As-built drawings, equipment data sheets, test and commissioning certificates, operation and maintenance manuals, warranties and a spare-parts list.",
        ],
      },
      {
        heading: "Organise it for the operator",
        body: [
          "The operating team needs to find information quickly. Index the pack by system and keep a consistent naming convention across disciplines.",
        ],
      },
      {
        heading: "Hand over with training",
        body: [
          "Documentation is most useful when paired with a walkthrough of the systems, so the operators understand how the equipment is meant to run.",
        ],
      },
    ],
  },
];
