import type { ScopeItem, Service, ServiceSlug } from "@/types";
import { photo } from "./images";

/**
 * Service copy is general engineering description.
 *
 * Scope checklists: design support, supply, installation, testing & commissioning and
 * maintenance for every service (dummy scope, replace before launch — see TODO.md).
 *
 * Imagery is stock placeholder (see content/images.ts).
 */
function scope(d: {
  design: string;
  supply: string;
  install: string;
  test: string;
  maintain: string;
}): ScopeItem[] {
  return [
    { label: "Design support", detail: d.design },
    { label: "Supply", detail: d.supply },
    { label: "Installation", detail: d.install },
    { label: "Testing & commissioning", detail: d.test },
    { label: "Maintenance", detail: d.maintain },
  ];
}

export const services: Service[] = [
  /* ------------------------------------------------------------ Integrated MEP */
  {
    slug: "integrated-mep",
    name: "Integrated MEP Solutions",
    shortName: "Integrated MEP",
    tagline: "One coordinated package for every building service.",
    summary:
      "Mechanical, electrical and plumbing disciplines planned, procured and installed as a single coordinated scope. Services are resolved against the structure and each other on paper, so they fit the building before they reach site.",
    metaDescription:
      "Integrated MEP contracting for complex buildings: tender review, shop drawings, coordination, procurement, installation, commissioning and handover as one package.",
    accent: "cyan",
    systems: [
      {
        name: "Tender review",
        description:
          "Drawings, specifications and the bill of quantities are read together, so scope gaps, assumptions and interface risks surface before a price is committed.",
        icon: "filesearch",
      },
      {
        name: "Drawings",
        description:
          "Design intent is turned into dimensioned, buildable shop drawings for every discipline, issued for consultant approval before fabrication begins.",
        icon: "ruler",
      },
      {
        name: "Coordination",
        description:
          "Ducts, pipes, cable trays and structure are overlaid and clashes resolved in priority order, with gravity drainage and large ducts fixed first.",
        icon: "layers",
      },
      {
        name: "Procurement",
        description:
          "Equipment and materials are bought against approved submittals, with lead times tracked against the installation programme.",
        icon: "package",
      },
      {
        name: "Installation",
        description:
          "Work is sequenced with the other trades and inspected at agreed stages, so installations are checked before they are covered up.",
        icon: "hardhat",
      },
      {
        name: "Commissioning",
        description:
          "Systems are tested, balanced and proven against design criteria, and the results are recorded for the project file.",
        icon: "gauge",
      },
      {
        name: "Handover",
        description:
          "As-built drawings, O&M manuals and test records are compiled so the operating team can run the building from day one.",
        icon: "keyround",
      },
    ],
    applications: [
      { industry: "healthcare", note: "Dense, high-consequence services where every discipline depends on the others." },
      { industry: "commercial-retail", note: "Large floor plates and fit-out programmes that need one coordinated services set." },
      { industry: "residential-mixed-use", note: "Shared plant and risers serving many occupants across mixed uses." },
      { industry: "hospitality", note: "Quiet, reliable services behind guest rooms, kitchens and amenities." },
      { industry: "education-institutional", note: "Campus-scale buildings with long service lives and varied occupancy." },
      { industry: "industrial-warehousing", note: "Large volumes and process loads that still need coordinated life safety." },
    ],
    scope: [
      { label: "Design support", detail: "Input to design development and constructability review." },
      { label: "Tender review", detail: "Scope, drawings and specifications reviewed against the brief." },
      { label: "Drawings & coordination", detail: "Discipline shop drawings coordinated with structure and each other." },
      { label: "Procurement", detail: "Equipment and materials bought against approved submittals." },
      { label: "Installation", detail: "Sequenced installation with staged inspections." },
      { label: "Testing & commissioning", detail: "Systems tested, balanced and commissioned with records." },
      { label: "Handover", detail: "As-built drawings, manuals and test records issued." },
      { label: "Maintenance", detail: "Planned maintenance after handover." },
    ],
    image: photo("ceilingServices", "center 30%"),
    faqs: [
      {
        question: "Why procure MEP services as one integrated package?",
        answer:
          "Mechanical, electrical and plumbing systems share ceilings, shafts and plant rooms. When one party coordinates them, clashes are resolved on drawings instead of on site, responsibility at interfaces is clearer, and procurement, installation and commissioning run to one programme.",
      },
      {
        question: "What is the difference between coordination and clash detection?",
        answer:
          "Clash detection finds where two services occupy the same space. Coordination goes further: it decides which service moves, checks maintenance access and clearances, and produces a single approved set of drawings that the site team builds from.",
      },
      {
        question: "When should MEP coordination start?",
        answer:
          "As early as the design allows — ideally before shop drawings are issued. Settling shaft sizes, ceiling zones and plant space early prevents the expensive rework that comes from discovering conflicts after fabrication.",
      },
      {
        question: "What do you need to price an integrated MEP package?",
        answer:
          "Drawings and specifications for each discipline, the bill of quantities, the tender deadline and programme, and any site constraints such as access or phasing. Gaps in the information are listed as assumptions rather than guessed at.",
      },
      {
        question: "Can an integrated package cover only some disciplines?",
        answer:
          "Yes. Each discipline can be delivered on its own or combined with others. Use the quote form to describe the scope you have in mind and the disciplines involved.",
      },
      {
        question: "What is included in a handover pack?",
        answer:
          "Typically as-built drawings, equipment data sheets, test and commissioning certificates, operation and maintenance manuals, warranties and a spare-parts list. The exact contents follow the contract and specification.",
      },
    ],
  },

  /* ------------------------------------------------------------------- HVAC */
  {
    slug: "hvac",
    name: "HVAC Systems",
    shortName: "HVAC",
    tagline: "Comfort, air quality and plant that runs efficiently.",
    summary:
      "Heating, ventilation and air-conditioning for large buildings — from central chilled-water plants to VRF networks and the ductwork that serves them. Systems are installed, balanced and proven against the design.",
    metaDescription:
      "HVAC contracting for large buildings: central plants, VRF systems, ductwork, chilled-water piping and boilers, installed, balanced and commissioned.",
    accent: "cyan",
    systems: [
      {
        name: "Central plants",
        description:
          "Chillers, pumps and cooling towers that produce chilled water for the whole building, with the pipework and controls that tie them together.",
        icon: "snowflake",
      },
      {
        name: "VRF systems",
        description:
          "Variable refrigerant flow units that serve many independently controlled zones from shared outdoor units, with a compact installation footprint.",
        icon: "fan",
      },
      {
        name: "Ductwork",
        description:
          "Supply, return and fresh-air ducts fabricated, insulated and sealed to carry conditioned air to each space with low leakage and noise.",
        icon: "wind",
      },
      {
        name: "Chilled-water piping",
        description:
          "Insulated supply and return mains, risers and branches that move chilled water between plant and air-handling or fan-coil units.",
        icon: "waves",
      },
      {
        name: "Boilers",
        description:
          "Hot-water or steam boilers and their distribution for heating, humidity control and process loads where the building requires them.",
        icon: "thermometer",
      },
    ],
    applications: [
      { industry: "healthcare", note: "Controlled temperature, filtration and air-change rates are part of clinical safety." },
      { industry: "commercial-retail", note: "Large occupancies and glazed envelopes drive significant, variable cooling loads." },
      { industry: "hospitality", note: "Guest comfort, humidity control and quiet operation across many zones." },
      { industry: "education-institutional", note: "Long operating lives and fluctuating occupancy suit zoned systems." },
      { industry: "industrial-warehousing", note: "Large volumes, process heat and ventilation of working areas." },
    ],
    scope: scope({
      design:
        "Equipment selection input and review of the design against load calculations.",
      supply:
        "Plant, units, ductwork, pipework, insulation and controls components.",
      install:
        "Plant setting, ductwork and pipework erection, insulation and supports.",
      test:
        "Pressure tests, air and water balancing, and performance testing with records.",
      maintain: "Planned preventive maintenance after handover.",
    }),
    image: photo("pumpRoom", "center 30%"),
    faqs: [
      {
        question: "What is the difference between a VRF and a chilled-water system?",
        answer:
          "VRF moves refrigerant directly between outdoor and indoor units and suits buildings with many separately controlled zones and limited plant space. Chilled-water systems cool water at a central plant and pump it to air-handling and fan-coil units, which tends to suit larger loads and long service lives.",
      },
      {
        question: "How is HVAC capacity decided?",
        answer:
          "The design team calculates heating and cooling loads from the building envelope, occupancy, lighting, equipment and ventilation requirements. The contractor installs to that design and flags issues found during coordination, such as plant space or routing constraints.",
      },
      {
        question: "What testing happens before HVAC handover?",
        answer:
          "Ductwork leakage and pipework pressure tests, air and water balancing to design flow rates, and functional tests of plant and controls. Results are recorded in commissioning documents that form part of the handover pack.",
      },
      {
        question: "Why do insulation and duct sealing matter?",
        answer:
          "Poorly insulated chilled-water pipes sweat and waste cooling; leaky ducts deliver less air than designed and raise energy use. Both are far cheaper to get right during installation than to fix once ceilings are closed.",
      },
      {
        question: "How does fresh-air ventilation affect the design?",
        answer:
          "Fresh air dilutes pollutants and moisture but must be cooled or heated before it enters the space, so it is a large part of the load. Healthcare and crowded public spaces need higher air-change rates and filtration than ordinary offices.",
      },
      {
        question: "What information do you need to quote HVAC works?",
        answer:
          "HVAC drawings and specifications, equipment schedules, the bill of quantities, programme and tender deadline, and any site constraints. Where the design is incomplete, the gaps are stated as assumptions in the quotation.",
      },
    ],
  },

  /* ----------------------------------------------------------- Fire fighting */
  {
    slug: "fire-fighting",
    name: "Fire Fighting & Protection",
    shortName: "Fire Protection",
    tagline: "Life-safety systems installed, tested and documented.",
    summary:
      "Active fire protection for occupied buildings — sprinklers, hydrants, hose reels, pump rooms and suppression systems — installed to the standards named in the project specification, with the test records authorities expect.",
    metaDescription:
      "Fire fighting and protection contracting: sprinklers, hydrants, hose reels, pump rooms and suppression systems, installed, tested and documented.",
    accent: "fire",
    systems: [
      {
        name: "Sprinklers",
        description:
          "Pipework and heads that discharge water automatically over a fire, sized by hazard class so the right density reaches the right area.",
        icon: "droplets",
      },
      {
        name: "Hydrants",
        description:
          "Ring mains and landing valves that give firefighters a reliable water supply around and within the building.",
        icon: "siren",
      },
      {
        name: "Hose reels & cabinets",
        description:
          "Wall-mounted reels and cabinets that let trained occupants tackle a small fire before it spreads.",
        icon: "flame",
      },
      {
        name: "Pump rooms",
        description:
          "Duty, standby and jockey pumps with controllers and tanks that keep the system pressurised and ready to deliver.",
        icon: "gauge",
      },
      {
        name: "Suppression systems",
        description:
          "Gas and other clean-agent or special-hazard systems for spaces where water would damage equipment or records.",
        icon: "filter",
      },
    ],
    applications: [
      { industry: "healthcare", note: "Occupants who cannot self-evacuate need protection that works without intervention." },
      { industry: "commercial-retail", note: "High occupancy and large undivided floor areas raise life-safety demands." },
      { industry: "residential-mixed-use", note: "Many sleeping occupants and shared escape routes across tall buildings." },
      { industry: "hospitality", note: "Sleeping accommodation plus kitchens, plant and assembly spaces." },
      { industry: "industrial-warehousing", note: "High storage and process hazards that need specified protection." },
    ],
    scope: scope({
      design:
        "Review of hydraulic design and system layout against the project specification.",
      supply:
        "Pipework, valves, sprinkler heads, hose equipment, pumps and suppression components.",
      install:
        "Pipework erection, pump room installation and equipment fixing.",
      test:
        "Hydrostatic and flow testing, pump performance tests and inspection records.",
      maintain: "Periodic inspection and servicing after handover.",
    }),
    image: photo("redPipes"),
    faqs: [
      {
        question: "Which standards apply to fire protection systems?",
        answer:
          "The standards are set by the project specification and the authority having jurisdiction — commonly a recognised code such as NFPA or the local authority's own requirements. They are confirmed at tender stage so the design, equipment and testing all follow the same rules.",
      },
      {
        question: "What is the difference between sprinklers, hydrants and hose reels?",
        answer:
          "Sprinklers act automatically on a fire inside the building. Hose reels are manual first-aid firefighting for occupants. Hydrants provide water for the fire service. They often share a water supply and pump room but protect in different ways.",
      },
      {
        question: "What does a fire pump room contain?",
        answer:
          "Usually a duty pump, a standby pump (often a different drive type so one failure cannot disable both), a small jockey pump that holds system pressure, controllers, and connections to storage tanks and the building's piping.",
      },
      {
        question: "What tests are carried out before handover?",
        answer:
          "Hydrostatic pressure tests of pipework, flow and pressure tests at remote points, pump performance tests, and functional tests of alarms and valves. They are normally witnessed by the consultant or authority and recorded.",
      },
      {
        question: "What are wet, dry and pre-action sprinkler systems?",
        answer:
          "Wet systems hold water in the pipes ready to discharge. Dry systems hold air and are used where pipes could freeze. Pre-action systems need two events — detection and a sprinkler opening — before water enters, protecting water-sensitive areas.",
      },
      {
        question: "How does fire fighting connect to the fire alarm?",
        answer:
          "Flow switches, valve tamper switches and pump status signals report to the fire alarm panel so a fault or activation is visible to operators. This is why fire fighting and ELV works are coordinated from the start.",
      },
    ],
  },

  /* ---------------------------------------------------------------- Plumbing */
  {
    slug: "plumbing",
    name: "Plumbing & Public Health",
    shortName: "Plumbing",
    tagline: "Water in, waste out, and everything between.",
    summary:
      "Public-health engineering for large buildings: water supply and filtration, drainage, rainwater, irrigation, sewage treatment and gas distribution — tested for tightness and delivered ready to use.",
    metaDescription:
      "Plumbing and public health contracting: water supply, filtration, drainage, rainwater, irrigation, sewage treatment and LPG/NG systems for large buildings.",
    accent: "cyan",
    systems: [
      {
        name: "Water supply",
        description:
          "Tanks, booster sets and pipework that deliver cold and hot water at the right pressure to every floor.",
        icon: "droplets",
      },
      {
        name: "Filtration",
        description:
          "Filters and treatment units that bring supply water to the quality the building and its users require.",
        icon: "filter",
      },
      {
        name: "Drainage",
        description:
          "Soil, waste and vent stacks and below-ground drains that carry used water away at a self-cleansing gradient.",
        icon: "waves",
      },
      {
        name: "Rainwater",
        description:
          "Roof outlets, downpipes and storm drains that move rain off the building safely and into the drainage network.",
        icon: "cloudrain",
      },
      {
        name: "Irrigation",
        description:
          "Pipework, valves and emitters that water landscaped areas efficiently, often fed by treated or recycled water.",
        icon: "sprout",
      },
      {
        name: "Sewage treatment",
        description:
          "On-site treatment plants that clean wastewater to a standard suitable for discharge or reuse where mains sewers are unavailable.",
        icon: "boxes",
      },
      {
        name: "LPG / NG systems",
        description:
          "Gas pipework, regulators and safety devices that supply kitchens, plant and laboratories, tested and certified before use.",
        icon: "fuel",
      },
    ],
    applications: [
      { industry: "healthcare", note: "Reliable, clean water and safe drainage are fundamental to infection control." },
      { industry: "commercial-retail", note: "Many washrooms, food outlets and tenants sharing risers and drains." },
      { industry: "residential-mixed-use", note: "Water pressure and drainage must work for every apartment on every floor." },
      { industry: "hospitality", note: "Hot-water demand, kitchens, laundries and guest rooms stacked together." },
      { industry: "education-institutional", note: "Peak-time demand across washrooms, laboratories and canteens." },
    ],
    scope: scope({
      design:
        "Review of pipe sizing, riser strategy and pump selection against the design.",
      supply:
        "Pipes, fittings, valves, pumps, tanks and treatment equipment.",
      install:
        "Pipework erection, pump and tank installation, supports and sleeves.",
      test:
        "Pressure testing, flushing, disinfection where required, and commissioning of pumps.",
      maintain: "Planned servicing of pumps and treatment plant after handover.",
    }),
    image: photo("pumpRoom", "center 85%"),
    illustration: "plumbing",
    faqs: [
      {
        question: "Why do tall buildings use tanks and booster pumps?",
        answer:
          "Mains pressure rarely reaches the upper floors of a tall building. Water is stored in tanks and boosted by pump sets, which also gives a reserve if the mains supply is interrupted.",
      },
      {
        question: "Why are soil, waste and rainwater drained separately?",
        answer:
          "Mixing them overloads treatment and sewers during storms, and can push foul air or flooding back into the building. Separate systems also allow rainwater to be reused for irrigation.",
      },
      {
        question: "When is pressure testing done?",
        answer:
          "Before pipework is concealed or buried, at a pressure set by the specification and held for a set time. Finding a leak at this stage means opening a trench or ceiling once, not after finishes are in place.",
      },
      {
        question: "When does a building need its own sewage treatment plant?",
        answer:
          "Where there is no connection to a municipal sewer, or where local rules or the project require wastewater to be treated and reused, for example for irrigation. The requirement comes from the project's approvals.",
      },
      {
        question: "What safety checks apply to LPG and natural-gas pipework?",
        answer:
          "Approved materials and fittings, pressure and leak testing, ventilation of gas-using spaces, isolation valves and, where required, gas detection. Authorities usually inspect and approve gas installations before they are used.",
      },
      {
        question: "What information do you need to quote plumbing works?",
        answer:
          "Plumbing and drainage drawings, riser diagrams, equipment schedules, specifications, programme and tender deadline. Gaps are recorded as assumptions in the quotation.",
      },
    ],
  },

  /* ---------------------------------------------------------- Electrical & ELV */
  {
    slug: "electrical-elv",
    name: "Electrical & ELV",
    shortName: "Electrical & ELV",
    tagline: "Power distribution and low-voltage systems, coordinated.",
    summary:
      "Low-tension distribution and extra-low-voltage systems — fire alarm and detection, public address and related communications — installed as part of a coordinated services package and tested before handover.",
    metaDescription:
      "Electrical and ELV contracting: LT panels, ELV systems, fire alarm and detection and public address, installed, tested and coordinated with other building services.",
    accent: "cyan",
    systems: [
      {
        name: "LT panels",
        description:
          "Main and sub-distribution boards that receive power and divide it safely into circuits for lighting, plant and small power.",
        icon: "circuit",
      },
      {
        name: "ELV systems",
        description:
          "Low-voltage data, security and communications cabling and equipment that serve the building's information and access needs.",
        icon: "network",
      },
      {
        name: "Fire alarm & detection",
        description:
          "Detectors, call points, sounders and a control panel that find a fire early and warn occupants, linked to other life-safety systems.",
        icon: "bell",
      },
      {
        name: "Public address",
        description:
          "Speakers, amplifiers and zoning that carry announcements and, where specified, emergency messages to the right areas.",
        icon: "megaphone",
      },
    ],
    applications: [
      { industry: "healthcare", note: "Resilient power, alarm and communication systems are part of patient safety." },
      { industry: "commercial-retail", note: "Large tenant loads, metering and alarm zoning across many units." },
      { industry: "hospitality", note: "Guest-room power, alarms and announcements across a large footprint." },
      { industry: "education-institutional", note: "Campus distribution, alarms and communications over many buildings." },
      { industry: "industrial-warehousing", note: "Heavy loads and alarm coverage across large open volumes." },
    ],
    scope: scope({
      design:
        "Review of load schedules, single-line diagrams and ELV layouts against the design.",
      supply:
        "Panels, cables, containment, devices and control equipment.",
      install:
        "Containment, cable installation, panel erection, device fixing and terminations.",
      test:
        "Insulation and earth-continuity tests, loop and functional tests, and witnessed commissioning.",
      maintain: "Planned inspection and servicing after handover.",
    }),
    image: photo("breakerPanel"),
    faqs: [
      {
        question: "What does LT mean, and how is it different from HT?",
        answer:
          "LT (low tension) generally means distribution at low voltage, such as the 400 V three-phase supply inside a building. HT (high tension) is higher-voltage supply from the utility, normally stepped down by a transformer before it reaches LT panels.",
      },
      {
        question: "What is ELV?",
        answer:
          "Extra-low voltage covers low-power systems — data and telephone cabling, security and access control, fire alarm, public address and similar — that run on far lower voltages than building power and are installed and tested separately.",
      },
      {
        question: "How are fire alarm zones planned?",
        answer:
          "The building is divided into zones, typically by floor or fire compartment, so the panel shows where a detector has operated. Zone layout is agreed with the consultant and the authority during design.",
      },
      {
        question: "What tests are done on electrical installations?",
        answer:
          "Insulation resistance and earth continuity tests on circuits, polarity and functional checks of panels and protection devices, and loop and sounder tests for alarm systems. Results are recorded for handover.",
      },
      {
        question: "Why coordinate ELV with the other services?",
        answer:
          "ELV cabling shares containment and ceiling space with power, ducts and pipes, and many systems — fire alarm, fire fighting, HVAC controls — exchange signals. Agreeing routes and interfaces early avoids rework.",
      },
      {
        question: "What is the difference between public address and voice evacuation?",
        answer:
          "Public address carries general announcements. Where the same system is used for emergency messages it must meet fire-alarm requirements for supervision and resilience, which affects equipment and cabling choices.",
      },
    ],
  },

  /* ------------------------------------------------------- Pools & fountains */
  {
    slug: "pools-fountains",
    name: "Pools & Fountains",
    shortName: "Pools & Fountains",
    tagline: "Water features built to run reliably.",
    summary:
      "Supply and installation of swimming pools, fountains and water features, including the mechanical systems that keep them clean, circulating and safe to use.",
    metaDescription:
      "Pools, fountains and water features: supply and installation of circulation, filtration and water-treatment systems for swimming pools and decorative water.",
    accent: "cyan",
    systems: [
      {
        name: "Pools",
        description:
          "Swimming pools with circulation pumps, filters, dosing and balance tanks that keep water clear and safe.",
        icon: "waves",
      },
      {
        name: "Fountains",
        description:
          "Nozzles, pumps, lighting and controls that give decorative fountains their pattern, height and reliability.",
        icon: "droplets",
      },
      {
        name: "Water features",
        description:
          "Cascades, rills and reflecting pools with the recirculation and treatment that stop them clouding or scaling.",
        icon: "shower",
      },
    ],
    applications: [
      { industry: "commercial-retail", note: "Atrium and plaza water features that set the character of a development." },
      { industry: "residential-mixed-use", note: "Shared pools and amenity water features for residents." },
      { industry: "hospitality", note: "Guest pools and landscape features that run daily and must stay clear." },
    ],
    scope: [
      { label: "Design support", detail: "Equipment sizing and system layout input." },
      { label: "Supply", detail: "Pumps, filters, nozzles, dosing and controls." },
      { label: "Installation", detail: "Circulation pipework, equipment and control installation." },
      { label: "Testing & commissioning", detail: "Leak testing, flow checks and water-quality start-up." },
      { label: "Maintenance", detail: "Routine servicing after handover." },
    ],
    image: photo("poolFountain"),
    faqs: [
      {
        question: "What equipment keeps a swimming pool clean?",
        answer:
          "A circulation pump draws water through a filter, a dosing system adds disinfectant and balances pH, and returns the treated water to the pool. Skimmers or overflow channels take surface water, where debris collects, to the filter.",
      },
      {
        question: "What is turnover rate?",
        answer:
          "It is the time taken to circulate the whole pool volume through the filter. The specification sets it by pool type and bather load — busier or shallower pools need faster turnover — and it drives pump and filter sizing.",
      },
      {
        question: "What is outside the scope of pools and fountains installation?",
        answer:
          "Civil and architectural work — the pool shell, structure, tiling and landscaping — is normally outside this scope. The interface between those works and the mechanical systems is agreed during coordination.",
      },
      {
        question: "Why do fountains and water features need water treatment?",
        answer:
          "Standing and recirculating water collects dust, algae and scale. Strainers, filtration and sometimes dosing keep nozzles clear and water looking clean with far less maintenance.",
      },
      {
        question: "What extra care do indoor pools need?",
        answer:
          "Evaporation raises humidity, so indoor pool halls need dedicated ventilation or dehumidification to protect people and the building fabric. That is why pool and HVAC works are coordinated.",
      },
      {
        question: "What information do you need to quote a pool or fountain?",
        answer:
          "Drawings showing size and depth, the specification or intended use, plant-room location, power and water availability, programme and tender deadline.",
      },
    ],
  },
];

export const serviceBySlug = (slug: ServiceSlug): Service | undefined =>
  services.find((s) => s.slug === slug);
