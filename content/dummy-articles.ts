import type { InsightCategory, InsightSection, ServiceSlug } from "@/types";

/**
 * Dummy article bodies (600–900 words each). Part of the placeholder dataset exported from
 * content/dummy.ts — replace with approved UMS articles before launch (see TODO.md).
 */
export interface DummyArticle {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  services: ServiceSlug[];
  author: string;
  authorRole: string;
  publishedAt: string;
  /** Intro paragraph shown above the first heading. */
  intro: string;
  sections: InsightSection[];
}

export const dummyArticles: DummyArticle[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "site-safety-planning-for-mep-works",
    title: "Site Safety Planning for MEP Works",
    category: "safety-compliance",
    excerpt:
      "MEP installation overlaps with many trades. A written safety plan, agreed before mobilisation, keeps that overlap under control.",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains"],
    author: "Engr. Hamza Iqbal",
    authorRole: "HSE Manager",
    publishedAt: "2026-09-18",
    intro:
      "On a busy building site, the mechanical, electrical and plumbing crews are rarely alone. They share ceilings, shafts and plant rooms with structure, blockwork, finishes and fit-out teams, and the work changes shape every week. A safety plan that was written once and filed away does not survive that pace. A plan that was written for the actual activities, and is reviewed as often as the programme changes, does.",
    sections: [
      {
        heading: "Start with the work, not the template",
        body: [
          "Good safety planning begins with a plain list of the activities that will actually take place: working at height on scaffold towers and mobile platforms, hot works for brazing and welding, lifting chillers and air-handling units into plant rooms, entering tanks and trenches, and energising live electrical equipment. Each activity on that list gets its own risk assessment and method statement, written for this site and this sequence rather than adapted from the last job.",
          "The most useful method statements are short enough to be read at the point of work. One or two pages that state who does what, in which order, with which equipment and which controls, will be used. A forty-page document that is only ever signed will not. We ask supervisors to brief their crews from the method statement every morning that the activity is live, and to stop the task and revise the document when conditions change.",
        ],
      },
      {
        heading: "Coordinate with other trades",
        body: [
          "Most serious incidents on a services package do not come from the package itself. They come from the interface: a ceiling closed over a pressure test that has not been signed off, a hot-work spark landing on stored insulation, or a crew working below another crew that is lifting. Permit-to-work arrangements exist to stop exactly this, and they only work when every trade on the floor honours them.",
          "A weekly three-week look-ahead, attended by every subcontractor with work in the same zone, is the simplest control we know. It lets the team see clashes in time and sequence rather than in person, and it gives the HSE officer a reason to walk the zone before the work starts, not after.",
        ],
      },
      {
        heading: "Plan for the hazards specific to each discipline",
        body: [
          "Each building service brings its own hazards. HVAC work involves heavy plant, refrigerant handling and sheet-metal edges. Fire fighting work involves pressurised pipework, testing with water at height and, in suppression rooms, gases that must be isolated before anyone enters. Electrical and ELV work involves isolation, lock-out and tag-out, and the discipline of proving a circuit dead before it is touched. Plumbing and public health work involves excavation, confined spaces such as tanks and manholes, and biological hazards around sewage systems.",
          "A site plan that names these hazards by discipline, and assigns a competent person to each, is far more credible to an auditor and far more useful to a crew than a generic checklist of fifty items.",
        ],
      },
      {
        heading: "Make competence visible",
        body: [
          "People work more safely when they understand why a control exists. Site induction should cover the specific hazards of the building, emergency arrangements and the stop-work authority that every worker holds. Short toolbox talks, held at the start of the shift and tied to the day's task, reinforce that message far better than an annual classroom session.",
          "Competence also means the right people on the right tasks. Welders hold current qualifications, lifting operations are led by appointed persons, and electricians working on live equipment are authorised in writing. Keeping a simple matrix of who is approved to do what, and checking it against the day's labour return, closes a gap that audits often find.",
        ],
      },
      {
        heading: "Record, review and close out",
        body: [
          "Toolbox talks, inspections, permits and incident reports are only useful when they are kept and reviewed. A short weekly review that looks at near-misses, repeated observations and overdue actions will catch a recurring problem long before it becomes an injury. Near-miss reporting in particular is a measure of site culture. A site that reports many near-misses and acts on them is usually safer than a site that reports none.",
          "At the end of each phase, close out the plan. Confirm that temporary works have been removed, that isolations have been lifted and recorded, and that lessons from the phase are carried into the next. That discipline, repeated across a long programme, is what sits behind a lost-time-incident figure of zero.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "fire-protection-inspection-records",
    title: "Fire Protection Inspection Records",
    category: "safety-compliance",
    excerpt:
      "A fire protection system is only as credible as its paper trail. Here is what inspection and test records should capture.",
    services: ["fire-fighting", "electrical-elv", "integrated-mep"],
    author: "Engr. Usman Tariq",
    authorRole: "Head of Fire Protection",
    publishedAt: "2026-08-06",
    intro:
      "A sprinkler system sits quietly behind the ceiling for years and is expected to work perfectly on the one day it is needed. Nobody can prove that by looking at it. What a building owner, an insurer or an authority can do is read the records: who inspected what, when, against which standard, and what was found. Good records turn a hidden system into an accountable one.",
    sections: [
      {
        heading: "Why the paper trail matters",
        body: [
          "Inspection and test records serve three audiences. The authority having jurisdiction uses them to decide whether a building may be occupied. The insurer uses them to judge risk. The facilities team uses them for years afterwards to understand what was installed, how it was tested and what the baseline performance was. If a record is missing, the work has to be repeated or the risk has to be assumed, and both cost more than keeping the record in the first place.",
          "For that reason we treat records as a deliverable of the installation itself, not as an administrative afterthought. Each stage of the work produces a signed document before the next stage begins.",
        ],
      },
      {
        heading: "What to capture during installation",
        body: [
          "Material approvals come first: pipe, fittings, sprinkler heads, valves, pumps and panels are submitted and approved before they are ordered, and delivery records confirm that what arrived matches what was approved. During installation, inspection requests are raised for each stage, for example after pipework is hung and before it is concealed, and each request records the location, the reference drawing, the inspector and the outcome.",
          "Hydrostatic pressure tests deserve particular care. The record should state the test pressure, the duration, the section of pipework tested, the gauge used and its calibration certificate, and the witness who signed it off. A test record without the gauge reference is a weak record.",
        ],
      },
      {
        heading: "What to capture during commissioning",
        body: [
          "Commissioning proves that the system performs as designed. For a sprinkler system that means flow tests at the remote area and at the pump, alarm valve and flow-switch operation, and the correct start and stop behaviour of the fire pump on both duty and standby power. For detection and alarm, it means device-by-device functional testing, cause-and-effect verification, and interface tests with lifts, smoke control, door release and the building management system.",
          "Each of these tests should record the date, the test method, the measured result and the acceptance criterion. Recording only that a test was passed hides the margin. Recording a measured pressure or flow lets the next inspector see whether performance has drifted.",
        ],
      },
      {
        heading: "Keep records usable",
        body: [
          "A box of unsorted certificates satisfies nobody. Records should be indexed by system and by location, so that a facilities engineer can find the test of the third-floor zone valve in a minute rather than a day. We number every inspection request, link it to the drawing revision it relates to, and scan the signed copy into a project register the same week it is signed.",
          "As-built drawings belong in the same register. A hydraulic calculation based on a design that was later changed on site is not a reliable record of the system that was actually installed.",
        ],
      },
      {
        heading: "Records after handover",
        body: [
          "Records do not stop at handover. Routine inspection, testing and maintenance of fire protection systems is normally required at weekly, monthly, quarterly and annual intervals, and each visit creates a new record. Handing over a blank logbook, with the intervals and the test methods already set out, makes it far more likely that the building's operators will keep the history going.",
          "When the records are complete, current and easy to read, an annual audit becomes a short conversation. When they are not, it becomes a project of its own.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "vrf-and-chilled-water-systems",
    title: "VRF and Chilled-Water Systems",
    category: "mep-systems",
    excerpt:
      "Two of the most common ways to cool a large building, and how to think about which one fits.",
    services: ["hvac"],
    author: "Engr. Bilal Chaudhry",
    authorRole: "Head of HVAC",
    publishedAt: "2026-07-14",
    intro:
      "Choosing the cooling system for a large building is one of the biggest decisions on the services budget. Two families dominate the discussion: variable refrigerant flow, usually called VRF, and chilled-water systems. Neither is better in every case. The right choice depends on the size of the building, how its load changes through the day, who will operate it, and what the owner expects to pay over thirty years rather than three.",
    sections: [
      {
        heading: "How each system works",
        body: [
          "A VRF system moves refrigerant directly between outdoor condensing units and multiple indoor units. Each indoor unit modulates the refrigerant flow it receives, and the outdoor unit varies compressor speed to match the total demand. Some systems can recover heat from one zone and deliver it to another, which suits buildings where some rooms need cooling while others need heating.",
          "A chilled-water system cools water at a central plant, using chillers and cooling towers or air-cooled condensers, and pumps that water through insulated pipework to air-handling units and fan-coil units in the building. The refrigerant stays inside the plant room. What circulates through the building is water.",
        ],
      },
      {
        heading: "Where VRF fits well",
        body: [
          "VRF suits small to medium buildings, such as boutique offices, clinics, retail units and apartments, where zone-by-zone control matters and plant space is limited. It installs quickly because refrigerant pipework is small, it allows each tenant to run their own zone, and its part-load efficiency is strong when demand fluctuates.",
          "Its limits come from the refrigerant. Long pipe runs and large height differences reduce capacity, and the total refrigerant charge in a single system is restricted by safety standards in occupied spaces. Very large buildings end up with many separate systems, each with its own outdoor unit, and the roof or podium can fill with condensers.",
        ],
      },
      {
        heading: "Where chilled water fits well",
        body: [
          "Chilled water suits large and complex buildings: hospitals, malls, towers and campuses. A central plant is efficient at scale, plant can be arranged in duty and standby sets for resilience, and the water loop distributes cooling over long distances without refrigerant limits. It also supports a wide range of terminal equipment, from fan-coil units to large air-handling units with precise humidity control, which is essential in operating theatres, laboratories and data rooms.",
          "The trade-offs are space and coordination. Chillers, pumps, tanks and pipework take plant-room area and structural support, and the system needs careful commissioning of water balance. A building that is only lightly occupied for long periods can also be less efficient unless the plant is staged and controlled well.",
        ],
      },
      {
        heading: "Questions that decide the choice",
        body: [
          "Start with the load profile. A building that is occupied unevenly, with different tenants on different schedules, favours independent zone control. A building with a large, steady base load favours central plant. Next consider resilience: if the cooling is critical, how will it keep running when one component fails? Then consider operations: does the owner have a facilities team that can run a chiller plant, or will a simpler system be easier to sustain?",
          "Finally, compare whole-life cost. First cost, energy cost, maintenance, refrigerant management and eventual replacement all belong in the same comparison. A system that is cheaper to install can cost more to own.",
        ],
      },
      {
        heading: "Hybrid approaches and coordination",
        body: [
          "Many projects use both. A mall might use chilled water for public areas and anchor stores, and VRF for tenant units and back-of-house rooms. A hospital might use chilled water for the main building and dedicated units for areas that must run independently of the central plant.",
          "Whatever the choice, the real quality of the result depends on coordination: pipe and duct routes agreed with structure, condensate drains falling correctly, controls that talk to the building management system, and a commissioning programme long enough to balance and prove the system before the first occupant arrives.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: "coordinating-mep-shop-drawings",
    title: "Coordinating MEP Shop Drawings",
    category: "mep-systems",
    excerpt:
      "Most site clashes can be found on a drawing for far less than it costs to fix them in a ceiling void.",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv"],
    author: "Engr. Sana Malik",
    authorRole: "Director, Projects",
    publishedAt: "2026-06-02",
    intro:
      "Design drawings show what the building services should achieve. Shop drawings show how they will actually be built: exact routes, exact levels, exact supports. The step between the two is where most clashes are found, and where most of their cost is avoided. A duct that meets a beam on paper costs an hour to move. The same duct meeting the same beam in a finished ceiling costs a week.",
    sections: [
      {
        heading: "What shop drawings are for",
        body: [
          "Design drawings are intentionally diagrammatic. They show the intent of a system but leave route, fixing and installation detail to the contractor. Shop drawings fill that gap. They show the real size of every duct including insulation, the real fall of every drain, the real position of every sprinkler head against the ceiling grid, and the clear space left around every valve, damper and access panel.",
          "They also form a contract record. Once the consultant has reviewed and approved a shop drawing, it becomes the reference against which the installation is inspected.",
        ],
      },
      {
        heading: "Agree the rules before drawing",
        body: [
          "Coordination runs smoothly when the ground rules are set at the start. Which discipline gets priority where space is tight? A common convention gives gravity drainage the first claim, then large ducts, then pressurised pipework, then cable trays and conduits. Which levels are reserved for which service? What clearances are required around distribution boards, fire dampers and equipment that needs maintenance access?",
          "Written down on a single page and agreed by every trade, these rules settle arguments before they begin. Without them, the first trade to draw gets the best route and everyone else adapts around it.",
          "It also helps to agree a drawing cycle early. A realistic cycle gives each discipline a fixed window to issue its layer, a fixed window for the combined review, and a fixed date by which approved drawings are released to site. Teams that publish this calendar on day one rarely discover that procurement is waiting on a drawing nobody owns.",
        ],
      },
      {
        heading: "Model, overlay, review",
        body: [
          "Modern coordination is done in a combined three-dimensional model, with each discipline contributing its own layer. Clash-detection software highlights hard clashes, where two objects occupy the same space, and soft clashes, where clearance for access or insulation has been violated. The software finds the problem, but people solve it, in a coordination meeting where the discipline leads sit at the same table and agree the change.",
          "A useful rhythm is a coordination meeting every one or two weeks, with clash reports issued in advance and each item assigned an owner and a date. Items that stay open for more than two cycles are escalated, because a clash left open is a clash that will be solved on site.",
        ],
      },
      {
        heading: "Bring structure and finishes into the model",
        body: [
          "Services do not live in a vacuum. Beam depths, openings in slabs and walls, ceiling heights, bulkhead positions and light fittings all constrain the route. The most valuable coordination sessions include the structural engineer and the interior designer, because that is where a tight route can be solved by a small change to a beam penetration or a ceiling level rather than by a compromise in the system.",
          "Sleeves and openings are the classic example. Setting them out on the shop drawings before the slab is poured avoids coring through reinforcement afterwards, which is slow, noisy and structurally sensitive.",
        ],
      },
      {
        heading: "Close the loop at the end",
        body: [
          "Coordination does not end when the drawings are approved. Site changes are inevitable, and each one should be marked up and fed back into the model so that the as-built drawings reflect what was really installed. A short weekly redline routine, with the site supervisor noting every deviation, keeps that record honest.",
          "When it works, the handover pack contains drawings that match the building, and the facilities team can find a valve in minutes. That outcome starts with careful drawings, long before the first pipe is hung.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: "hvac-maintenance-planning",
    title: "HVAC Maintenance Planning",
    category: "maintenance-operations",
    excerpt:
      "A maintenance plan decides whether an HVAC system keeps its design performance or slowly loses it.",
    services: ["hvac"],
    author: "Engr. Bilal Chaudhry",
    authorRole: "Head of HVAC",
    publishedAt: "2026-04-22",
    intro:
      "An HVAC system rarely fails all at once. It drifts. Filters load up, coils foul, belts stretch, sensors wander out of calibration, and the building uses more energy to deliver slightly less comfort. By the time occupants complain, the system has often been underperforming for months. A written maintenance plan is how an owner keeps that drift in check.",
    sections: [
      {
        heading: "Start from an asset register",
        body: [
          "Maintenance planning begins with knowing what you have. An asset register lists every significant item of plant: chillers, pumps, air-handling units, fan-coil units, VRF outdoor and indoor units, fans, dampers, controls panels and valves. For each item it records location, model, capacity, installation date, warranty period and the manufacturer's recommended service interval.",
          "The register is also the base for numbering. Each asset gets a tag that is painted or labelled on the equipment and used on every work order, so that history follows the asset rather than the person who happened to service it.",
        ],
      },
      {
        heading: "Mix planned and condition-based work",
        body: [
          "Planned preventive maintenance is calendar-based: inspect, clean and test at set intervals. Monthly checks might cover filters, belts, drain trays, refrigerant pressures and vibration. Quarterly work might add coil cleaning, bearing lubrication and control-loop checks. Annual work typically includes a full service of chillers and cooling towers, water treatment review, electrical termination checks and calibration of key sensors.",
          "Condition-based maintenance adds measurement. Trending motor current, bearing temperature, differential pressure across filters and chiller approach temperatures allows a team to service equipment when the data shows it is needed, rather than too early or too late. The building management system already collects most of this data. Using it is largely a matter of deciding what to watch and what level of change to react to.",
        ],
      },
      {
        heading: "Plan for the critical areas first",
        body: [
          "Not every area is equally important. An operating theatre, a data room or a pharmacy store has strict temperature, humidity or pressure requirements, and a failure there has serious consequences. A maintenance plan should rank spaces by criticality and give the most critical systems shorter intervals, standby equipment that is tested regularly, and a defined response time when an alarm occurs.",
          "Standby equipment deserves special attention. A standby pump that has never been run is not a standby pump. Rotating duty between units on a schedule proves that both work and spreads the wear.",
          "Seasonal readiness is the other half of criticality. Before the cooling season starts, cooling towers are cleaned and treated, chillers are test-run under load, and condensate drains are flushed. Before winter, heating plant and boilers get the same treatment. Doing this on a fixed calendar means the first hot week of the year finds the plant ready, not still waiting for a spare part.",
        ],
      },
      {
        heading: "Spare parts, access and safety",
        body: [
          "The best plan fails if the part is not on the shelf. A recommended spares list, agreed with the manufacturer and based on lead times, should include belts, filters, contactors, sensors, fuses and the consumables for each plant item. Long-lead parts such as compressors and drives are often worth holding for critical systems.",
          "Safe access matters just as much. Equipment on roofs and in plant rooms needs guarded access, lighting and isolation points, and anyone entering should be able to see the maintenance history before they start. Working on refrigeration equipment requires trained, competent technicians, and records of refrigerant handling are a regulatory expectation in many jurisdictions.",
        ],
      },
      {
        heading: "Measure the results",
        body: [
          "A plan is only as good as its feedback. Track a few numbers: planned maintenance completed on time, breakdown callouts per month, average time to repair, and energy use per square metre. Reviewed quarterly, these figures show whether the plan is working and where the effort should move.",
          "The aim is steady performance. A building whose HVAC still delivers its commissioned flows and temperatures five years after handover is a building whose owners have paid attention to maintenance from the first day.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    slug: "mep-handover-documentation",
    title: "MEP Handover Documentation",
    category: "maintenance-operations",
    excerpt:
      "What a complete handover pack contains, and why assembling it from the first week is easier than assembling it in the last.",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains"],
    author: "Engr. Ayesha Khan",
    authorRole: "QA/QC Manager",
    publishedAt: "2026-02-11",
    intro:
      "When the last system is commissioned, the building does not belong to the contractor any more. It belongs to the people who will run it for decades. Whether those people can operate, maintain and modify the services depends almost entirely on what is in the handover pack. A good pack saves the owner money every year. A weak one costs them every time something breaks.",
    sections: [
      {
        heading: "What a complete pack contains",
        body: [
          "A complete handover pack has several parts. As-built drawings show the systems as installed, including final routes, valve positions, panel schedules and equipment locations. Operation and maintenance manuals explain how each item works, what it needs and how to recognise a fault. Test and commissioning certificates prove that each system met its acceptance criteria. Warranties and manufacturer documentation record what is covered, for how long, and who to call.",
          "To these we add schedules of spare parts and special tools, a list of the supplier and subcontractor contacts, and a short summary for each system that tells a new facilities engineer, in plain language, what the system is for and where to start.",
        ],
      },
      {
        heading: "Build the pack as you go",
        body: [
          "The single most useful rule is to build the pack during the project, not after it. Material submittals, approvals and delivery records can be filed on the day they are issued. Inspection requests and test records can be scanned the week they are signed. Redline drawings can be updated whenever a site change is made.",
          "A project that starts assembling its pack in the final month is forced to reconstruct information from memory and from people who may already have left the site. A project that has filed documents steadily finishes with a pack that is complete a few days after practical completion.",
        ],
      },
      {
        heading: "Make it easy to find things",
        body: [
          "A pack is only useful if it can be navigated. We organise documents by system, then by type, using a consistent numbering scheme that matches the asset tags on the equipment. A facilities engineer standing next to a pump should be able to read its tag and find its datasheet, its test record and its service history in a single lookup.",
          "Digital delivery helps. Searchable PDF files, a clear folder structure and an index spreadsheet linking assets, drawings and documents let the operating team find what they need in seconds. Where the owner uses a computerised maintenance management system, loading the asset register directly saves them weeks of data entry.",
        ],
      },
      {
        heading: "Train the people who will run the building",
        body: [
          "Documents explain; people understand. Formal handover should include demonstration and training sessions for the facilities team on each major system: how to start and stop it, how to read its alarms, how to isolate it safely and what routine checks to perform. Sessions are best recorded on video and linked to the relevant system in the pack so that new staff can learn from them later.",
          "A short walk-through of the plant rooms with the people who will use them is often worth more than a day of slides. It reveals questions that no manual anticipated, and it builds the confidence that keeps small problems from becoming outages.",
        ],
      },
      {
        heading: "Defects, warranties and the first year",
        body: [
          "Handover is not the end of the relationship. A defects liability period normally follows, during which the contractor corrects faults that appear in service. A clear defects register, with response times and an agreed route for reporting, keeps that period productive. Warranty start dates should be recorded precisely, since they usually begin at commissioning or practical completion and not at the date of the final invoice.",
          "A seasonal review a few months after handover is also valuable. Operating a cooling plant through its first full summer, for example, tests the system under its real load and reveals adjustments that no commissioning could. Handover documents that make those adjustments easy to record and apply will keep the building performing as designed.",
        ],
      },
    ],
  },
];
