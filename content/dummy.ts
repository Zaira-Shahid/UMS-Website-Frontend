/**
 * DUMMY DATA — single source for every placeholder fact on the site (spec §5).
 *
 * Everything here is realistic but invented. The other /content files import from this
 * file, so replacing it (or pieces of it) with approved UMS information updates the whole
 * site. Nothing in the UI is labelled "dummy" or "to be confirmed"; the "Replace before
 * launch" list in TODO.md tracks what must be swapped for real data.
 *
 * Article bodies live in ./dummy-articles.ts to keep this file readable; they are
 * re-exported from here.
 */
import type {
  CareerType,
  IndustrySlug,
  ProjectStatus,
  ServiceSlug,
  Stat,
  Testimonial,
} from "@/types";
import type { PhotoKey } from "./images";

export { dummyArticles } from "./dummy-articles";
export type { DummyArticle } from "./dummy-articles";

/* ------------------------------------------------------------ company */

export const company = {
  name: "Ultimate Mechanical Solutions",
  shortName: "UMS",
  tagline: "MEP Contracting for Complex Buildings",
  founded: 2009,
  pecRegistration: "PEC Reg. No. C-6/ME-2047",
  ntn: "NTN 4219876-3",
} as const;

export const emails = {
  general: "info@umss.pk",
  tenders: "tenders@umss.pk",
  careers: "careers@umss.pk",
  support: "support@umss.pk",
} as const;

export const whatsapp = "+92 300 1234567";

export const social = {
  linkedin: "https://linkedin.com/company/umss",
  facebook: "https://facebook.com/umss.pk",
  instagram: "https://instagram.com/umss.pk",
  youtube: "https://youtube.com/@umss",
} as const;

/** Link to the company profile PDF (dummy). */
export const companyProfileUrl = "/downloads/ums-company-profile.pdf";

/** Typical time to a first response on a tender or RFQ. */
export const rfqResponseTime = "within 48 hours";

/* ------------------------------------------------------------ offices */

const mapUrl = (q: string) => `https://maps.google.com/?q=${encodeURIComponent(q)}`;
const mapEmbed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const dummyOffices = [
  {
    city: "Islamabad" as const,
    label: "Head Office",
    address: "Office 12, 3rd Floor, Plot 21, Sector I-9/3, Islamabad 44000",
    phone: "+92 51 4567 890",
    email: emails.general,
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapQuery: "I-9/3 Islamabad",
    mapUrl: mapUrl("I-9/3 Islamabad"),
    mapEmbedUrl: mapEmbed("I-9/3 Islamabad"),
    geo: { latitude: 33.6844, longitude: 73.0479 },
  },
  {
    city: "Lahore" as const,
    label: "Regional Office",
    address: "45-B, Main Boulevard, Gulberg III, Lahore 54660",
    phone: "+92 42 3578 1200",
    email: "lahore@umss.pk",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    mapQuery: "Gulberg III Lahore",
    mapUrl: mapUrl("Gulberg III Lahore"),
    mapEmbedUrl: mapEmbed("Gulberg III Lahore"),
    geo: { latitude: 31.5204, longitude: 74.3587 },
  },
];

/* -------------------------------------------------------------- stats */

export const dummyStats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of MEP delivery" },
  { value: 37, suffix: "+", label: "Projects delivered" },
  { value: 250, suffix: "+", label: "Engineers & technicians" },
  { value: 2.4, suffix: "M sq ft", label: "Building area serviced" },
  { value: 0, label: "Lost-time incidents in 2025", note: "HSE record" },
  { value: 98, suffix: "%", label: "On-time handover rate" },
];

/* -------------------------------------------------------------- people */

export const dummyLeadership = [
  {
    name: "Engr. Ahmed Raza",
    role: "Chief Executive Officer",
    bio: "Founded UMS in 2009 after a decade in hospital and commercial MEP delivery. Leads strategy, key client relationships and the company's commitment to single-point responsibility.",
  },
  {
    name: "Engr. Sana Malik",
    role: "Director, Projects",
    bio: "Oversees programme, coordination and commercial control across every active site. Previously led the integrated MEP package on UMS's first large hospital project.",
  },
  {
    name: "Engr. Bilal Chaudhry",
    role: "Head of HVAC",
    bio: "Leads central plant, VRF and chilled-water delivery. Specialises in plant-room coordination and commissioning of large air-conditioning systems.",
  },
  {
    name: "Engr. Usman Tariq",
    role: "Head of Fire Protection",
    bio: "Heads the fire fighting and suppression division, from hydraulic design review to witnessed testing and authority approvals.",
  },
  {
    name: "Engr. Ayesha Khan",
    role: "QA/QC Manager",
    bio: "Owns inspection and test plans, material approvals and the handover documentation process across all UMS projects.",
  },
  {
    name: "Engr. Hamza Iqbal",
    role: "HSE Manager",
    bio: "Sets and audits site safety standards, runs induction and toolbox programmes and reports the company's lost-time-incident record.",
  },
];

/* ------------------------------------------------------------ clients */

/** Ten fictional developers and contractors, rendered as typographic wordmarks. */
export const dummyClients = [
  "Crescent Developers",
  "Indus Builders",
  "Margalla Estates",
  "Ravi Construct",
  "Karakoram Infra",
  "Summit Healthcare Group",
  "Jinnah Retail Holdings",
  "Pak Steel Structures",
  "Capital Smart Towers",
  "Northern Hospitality",
] as const;

export const dummyTestimonials: Testimonial[] = [
  {
    quote:
      "UMS coordinated every service in our hospital as one package. Clashes were solved on drawings, not in the ceiling, and the handover pack was the most complete we have received.",
    name: "Dr. Imran Qureshi",
    role: "Director, Facilities",
    company: "Summit Healthcare Group",
    project: "lady-reading-hospital",
  },
  {
    quote:
      "Their fire protection team treats testing as a deliverable, not a formality. Every witnessed test was documented, and the authority approvals came through first time.",
    name: "Farah Nadeem",
    role: "Project Director",
    company: "Jinnah Retail Holdings",
    project: "elanza-mall",
  },
  {
    quote:
      "On a tight programme with six trades in the same shafts, UMS kept to the look-ahead and never held up the finishes. That is rare on a services package.",
    name: "Tariq Mehmood",
    role: "Construction Manager",
    company: "Capital Smart Towers",
    project: "cggc-head-office-eighteen",
  },
  {
    quote:
      "Safety was visible from day one: inductions, permits and toolbox talks every morning. We finished the building with zero lost-time incidents on the MEP package.",
    name: "Nadia Siddiqui",
    role: "HSE Lead",
    company: "Northern Hospitality",
    project: "ravi-riverside-hotel",
  },
];

export const dummyCertifications = [
  { name: "ISO 9001:2015", issuer: "Quality management systems", validUntil: "March 2028", reference: "QMS-PK-20418" },
  { name: "ISO 45001:2018", issuer: "Occupational health and safety", validUntil: "March 2028", reference: "OHS-PK-11273" },
  { name: "ISO 14001:2015", issuer: "Environmental management", validUntil: "March 2028", reference: "EMS-PK-09865" },
  { name: "PEC C-6", issuer: "Pakistan Engineering Council", validUntil: "June 2027", reference: "C-6/ME-2047" },
  { name: "NFPA-aligned practices", issuer: "Fire protection design and testing", validUntil: "Reviewed annually", reference: "Internal audit FP-2025" },
];

export const dummyPec = {
  registrationNumber: "C-6/ME-2047",
  category: "C-6 · Mechanical & Electrical contractor",
  validUntil: "30 June 2027",
  verifyUrl: "https://www.pec.org.pk",
};

export const dummyTimeline = [
  { year: "2009", title: "UMS is founded", description: "Founded in Islamabad as a mechanical contractor focused on HVAC and plumbing for commercial buildings." },
  { year: "2012", title: "First hospital MEP package", description: "Awarded a full MEP package on a major teaching hospital, setting the pattern for later healthcare work." },
  { year: "2015", title: "Lahore office opens", description: "A regional office in Gulberg opens to serve projects across Punjab." },
  { year: "2018", title: "Fire protection division", description: "A dedicated fire protection team is formed, covering sprinklers, hydrants, pump rooms and suppression." },
  { year: "2021", title: "Integrated MEP delivery", description: "UMS begins delivering HVAC, fire, electrical, ELV and plumbing as a single coordinated package." },
  { year: "2025", title: "37+ projects delivered", description: "UMS passes 37 completed projects and a year with no lost-time incidents across all sites." },
];

export const dummyMission = {
  statement:
    "To deliver the hidden systems inside Pakistan's buildings — air, water, power and life safety — with engineering precision, honest coordination and a safe site.",
  vision:
    "To be the contractor that owners and consultants trust first with complex buildings: hospitals, towers, malls and campuses where every system must work on the first day and for decades after.",
};

export const dummyValues = [
  { title: "Precision", description: "We draw it, check it and measure it before we build it. Details are where complex buildings succeed or fail." },
  { title: "Safety first", description: "Nothing on a programme is worth an injury. Safe methods are planned, briefed and enforced on every site, every day." },
  { title: "Integrity", description: "We say what we will do, price it plainly and report progress honestly, including when it is not good news." },
  { title: "Collaboration", description: "Building services share every ceiling and shaft. We work openly with consultants, contractors and trades." },
  { title: "Reliability", description: "On-time handover with complete records is a promise we measure and report, not a slogan." },
  { title: "Craft", description: "We invest in our engineers and technicians, because well-trained people install systems that last." },
];

export const dummyCulture = [
  { icon: "users" as const, title: "Learn on real sites", description: "Graduate engineers work beside senior leads on live hospital, retail and commercial projects from their first month." },
  { icon: "graduation" as const, title: "Training that sticks", description: "Structured technical training, PEC support and manufacturer courses are part of every engineer's year." },
  { icon: "building" as const, title: "Landmark projects", description: "Work on buildings that shape skylines in Islamabad, Lahore, Peshawar and beyond." },
];

export const dummyBenefits = [
  "Structured technical training",
  "Site exposure on landmark buildings",
  "PEC registration support",
  "Health cover for you and your family",
  "Performance bonus every year",
  "Transport and site allowances",
];

export const dummyCareers: {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: CareerType;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}[] = [
  {
    slug: "site-mep-engineer-hvac",
    title: "Site MEP Engineer – HVAC",
    department: "HVAC",
    location: "Islamabad",
    type: "Full-time",
    experience: "4–7 years",
    summary: "Lead installation and commissioning of chilled-water and VRF systems on a live commercial site.",
    responsibilities: [
      "Supervise ductwork, chilled-water pipework and equipment installation to approved shop drawings",
      "Raise and track inspection requests, test records and non-conformance reports",
      "Coordinate daily with the main contractor, consultant and other trades",
      "Lead pre-commissioning checks and support balancing and handover",
    ],
    requirements: [
      "BSc Mechanical Engineering; PEC registration preferred",
      "Experience on large commercial or hospital HVAC installations",
      "Strong reading of coordination drawings and specifications",
      "Willingness to work on site in Islamabad and Rawalpindi",
    ],
  },
  {
    slug: "fire-protection-supervisor",
    title: "Fire Protection Supervisor",
    department: "Fire Fighting",
    location: "Lahore",
    type: "Full-time",
    experience: "5–8 years",
    summary: "Supervise sprinkler, hydrant and pump-room installation and witness testing with authorities.",
    responsibilities: [
      "Supervise pipework, sprinkler and hose-reel installation crews",
      "Prepare for and witness hydrostatic and flow tests",
      "Maintain installation records and as-built markups",
      "Brief crews on hot-work permits and site safety rules",
    ],
    requirements: [
      "Diploma or BSc in a relevant engineering discipline",
      "Hands-on experience installing and testing fire fighting systems",
      "Working knowledge of NFPA 13 and NFPA 20 principles",
      "Clear communication with site crews and consultants",
    ],
  },
  {
    slug: "electrical-design-engineer",
    title: "Electrical Design Engineer",
    department: "Electrical & ELV",
    location: "Islamabad",
    type: "Full-time",
    experience: "3–6 years",
    summary: "Prepare electrical and ELV shop drawings, load schedules and single-line diagrams for tender and construction.",
    responsibilities: [
      "Produce coordinated shop drawings for LT panels, distribution and containment",
      "Prepare load schedules, single-line diagrams and cable calculations",
      "Review consultant drawings and raise technical queries",
      "Support tender pricing with quantity take-offs",
    ],
    requirements: [
      "BSc Electrical Engineering",
      "Proficiency in AutoCAD; Revit experience is an advantage",
      "Knowledge of LT distribution, earthing and ELV systems",
      "Attention to detail and a methodical approach",
    ],
  },
  {
    slug: "qa-qc-inspector",
    title: "QA/QC Inspector",
    department: "Quality",
    location: "Lahore",
    type: "Contract",
    experience: "3–5 years",
    summary: "Inspect MEP works against approved submittals and inspection and test plans, and keep the quality record current.",
    responsibilities: [
      "Inspect materials on delivery and installation work at defined hold points",
      "Raise and close non-conformance reports",
      "Witness tests and file signed records in the project register",
      "Support the QA/QC manager with audits and handover documentation",
    ],
    requirements: [
      "Diploma or BSc in an engineering discipline",
      "Experience in QA/QC on building services projects",
      "Familiarity with test instruments and calibration records",
      "Good written English for reports",
    ],
  },
];

/* ------------------------------------------------------------ projects */

export interface DummyProject {
  slug: string;
  name: string;
  featured: boolean;
  status: ProjectStatus;
  sector: IndustrySlug;
  services: ServiceSlug[];
  location: string;
  year: number;
  areaSqFt: number;
  client: string;
  mainContractor: string;
  consultant: string;
  umsRole: string;
  durationMonths: number;
  teamSize: number;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: PhotoKey;
  imagePosition?: string;
  gallery: [PhotoKey, string?][];
}

export const dummyProjects: DummyProject[] = [
  /* ---- 6 featured ---- */
  {
    slug: "lady-reading-hospital",
    name: "Lady Reading Hospital",
    featured: true,
    status: "completed",
    sector: "healthcare",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv"],
    location: "Peshawar",
    year: 2019,
    areaSqFt: 420000,
    client: "Khyber Health Authority",
    mainContractor: "Indus Builders",
    consultant: "Meridian Engineering Consultants",
    umsRole: "Full MEP package for the new surgical and emergency block: central chilled-water plant, operating-theatre air handling, fire fighting, medical-grade plumbing and LT electrical.",
    durationMonths: 30,
    teamSize: 85,
    summary: "A full integrated MEP package for a new surgical and emergency block, delivered while the existing hospital stayed fully operational.",
    challenge: "The new block had to connect to live hospital services without interrupting patient care, and operating theatres needed tightly controlled temperature, humidity and pressure.",
    solution: "UMS phased every tie-in with the hospital's facilities team, coordinated a combined services model to resolve clashes in advance, and commissioned theatre air handling zone by zone with witnessed tests.",
    outcome: "The block was handed over on programme with complete test records and no unplanned service interruptions to the existing hospital.",
    image: "wavyRoof",
    gallery: [["glassReflection"], ["facade", "center 40%"]],
  },
  {
    slug: "buch-international-hospital",
    name: "Buch International Hospital",
    featured: true,
    status: "completed",
    sector: "healthcare",
    services: ["hvac", "fire-fighting", "plumbing", "electrical-elv"],
    location: "Multan",
    year: 2021,
    areaSqFt: 310000,
    client: "Buch Medical Trust",
    mainContractor: "Crescent Developers",
    consultant: "Alpha Design Associates",
    umsRole: "HVAC, fire fighting, plumbing and electrical & ELV packages for a 400-bed tertiary hospital, including isolation-room ventilation.",
    durationMonths: 26,
    teamSize: 70,
    summary: "Four building-services packages for a 400-bed tertiary hospital, including pressure-controlled isolation rooms.",
    challenge: "Isolation rooms and critical care areas needed precise pressure cascades, and the programme left little room between ceiling closure and handover.",
    solution: "UMS front-loaded testing of ductwork and pipework before ceilings closed, and commissioned pressure regimes room by room against the design intent.",
    outcome: "All critical areas passed witnessed performance tests on the first attempt, and the hospital opened to patients on its planned date.",
    image: "glassTower",
    imagePosition: "center 30%",
    gallery: [["glassReflection"], ["highRise"]],
  },
  {
    slug: "elanza-mall",
    name: "Elanza Mall",
    featured: true,
    status: "completed",
    sector: "commercial-retail",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains"],
    location: "Lahore",
    year: 2022,
    areaSqFt: 640000,
    client: "Jinnah Retail Holdings",
    mainContractor: "Ravi Construct",
    consultant: "Meridian Engineering Consultants",
    umsRole: "Integrated MEP for a four-level retail and entertainment mall, including the atrium fountain and tenant fit-out services.",
    durationMonths: 34,
    teamSize: 120,
    summary: "A four-level mall with a central atrium, a feature fountain and over 150 tenant units supplied from shared plant.",
    challenge: "Hundreds of tenant fit-outs would join the base building services, so the central plant, risers and fire systems had to be built to accept changes without rework.",
    solution: "UMS delivered base-build services with tenant-ready connection points, coordinated risers early and kept a live drawing register so each fit-out connected cleanly.",
    outcome: "The mall opened with all tenant units energised and fire-certified, and the atrium fountain became the development's signature feature.",
    image: "facade",
    imagePosition: "center 40%",
    gallery: [["wavyRoof"], ["glassTower", "center 30%"]],
  },
  {
    slug: "pakistan-cricket-board-house",
    name: "Pakistan Cricket Board House",
    featured: true,
    status: "completed",
    sector: "education-institutional",
    services: ["hvac", "fire-fighting", "plumbing", "electrical-elv"],
    location: "Lahore",
    year: 2020,
    areaSqFt: 185000,
    client: "Sports Infrastructure Authority",
    mainContractor: "Pak Steel Structures",
    consultant: "Alpha Design Associates",
    umsRole: "HVAC, fire fighting, plumbing and electrical & ELV for the headquarters and training facilities, including media and broadcast areas.",
    durationMonths: 22,
    teamSize: 55,
    summary: "A national sports headquarters with offices, training halls and broadcast spaces, delivered to a fixed event deadline.",
    challenge: "Training halls and broadcast rooms demanded quiet, stable air conditioning and clean power, with a fixed opening date tied to a national event.",
    solution: "UMS specified low-noise air distribution, isolated critical power circuits and ran a compressed, staged commissioning programme agreed with the client.",
    outcome: "The facility opened for the event on schedule, and systems were handed over with training for the in-house facilities team.",
    image: "glassReflection",
    gallery: [["wavyRoof"], ["highRise"]],
  },
  {
    slug: "cggc-head-office-eighteen",
    name: "CGGC Head Office at Eighteen",
    featured: true,
    status: "completed",
    sector: "commercial-retail",
    services: ["integrated-mep", "hvac", "fire-fighting", "electrical-elv"],
    location: "Islamabad",
    year: 2023,
    areaSqFt: 260000,
    client: "CGGC Pakistan",
    mainContractor: "Capital Smart Towers",
    consultant: "Meridian Engineering Consultants",
    umsRole: "Integrated MEP for a corporate headquarters tower: VRF and chilled-water HVAC, sprinklers and fire alarm, power distribution and ELV.",
    durationMonths: 24,
    teamSize: 60,
    summary: "A corporate headquarters tower with open-plan floors, executive suites and a data room, delivered with fast-track coordination.",
    challenge: "A fast-track programme overlapped structure, services and fit-out, so services routes had to be locked early without delaying the floors above.",
    solution: "UMS issued coordinated drawings floor by floor, in step with the structure, and pre-fabricated risers and plant-room pipework off site.",
    outcome: "The headquarters was completed ahead of the client's relocation date, with pre-fabrication cutting installation time on typical floors.",
    image: "highRise",
    gallery: [["glassTower", "center 30%"], ["glassReflection"]],
  },
  {
    slug: "jazz-destiny",
    name: "Jazz Destiny",
    featured: true,
    status: "ongoing",
    sector: "commercial-retail",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv"],
    location: "Islamabad",
    year: 2025,
    areaSqFt: 480000,
    client: "Northern Hospitality",
    mainContractor: "Karakoram Infra",
    consultant: "Alpha Design Associates",
    umsRole: "Integrated MEP for a mixed office and retail campus: central plant, fire protection, power and ELV, plumbing and public health.",
    durationMonths: 28,
    teamSize: 90,
    summary: "A large mixed-use office and retail campus currently under construction, with shared central plant serving several buildings.",
    challenge: "Several buildings share central plant and underground services, so excavation, routing and phasing must be agreed with every contractor on the campus.",
    solution: "UMS runs a weekly cross-trade coordination meeting, maintains a combined underground services model and stages plant commissioning to match each building's completion.",
    outcome: "Phase one is energised and occupied, and the remaining buildings are progressing to the agreed programme.",
    image: "facade",
    imagePosition: "center 80%",
    gallery: [["glassTower", "center 60%"], ["highRise"]],
  },

  /* ---- 6 more ---- */
  {
    slug: "margalla-heights-residences",
    name: "Margalla Heights Residences",
    featured: false,
    status: "ongoing",
    sector: "residential-mixed-use",
    services: ["integrated-mep", "fire-fighting", "plumbing", "pools-fountains"],
    location: "Islamabad",
    year: 2025,
    areaSqFt: 390000,
    client: "Margalla Estates",
    mainContractor: "Crescent Developers",
    consultant: "Meridian Engineering Consultants",
    umsRole: "Fire fighting, plumbing and public health, and pool and fountain packages for two residential towers and a podium amenity deck.",
    durationMonths: 30,
    teamSize: 65,
    summary: "Two residential towers over a podium amenity deck with a swimming pool, fountains and landscaped water features.",
    challenge: "Pool plant and water features sit above occupied apartments, so leak-tightness and noise from pumps were the main risks.",
    solution: "UMS specified vibration-isolated pump mounts, tested every pool and fountain circuit before waterproofing sign-off and coordinated plant-room layout with the acoustic consultant.",
    outcome: "Podium services are complete and tested, and tower fit-out is proceeding on schedule.",
    image: "poolFountain",
    gallery: [["highRise"], ["facade", "center 40%"]],
  },
  {
    slug: "ravi-riverside-hotel",
    name: "Ravi Riverside Hotel",
    featured: false,
    status: "completed",
    sector: "hospitality",
    services: ["hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains"],
    location: "Lahore",
    year: 2022,
    areaSqFt: 275000,
    client: "Northern Hospitality",
    mainContractor: "Ravi Construct",
    consultant: "Alpha Design Associates",
    umsRole: "HVAC, fire fighting, plumbing, electrical and ELV, and pool packages for a 220-room hotel with banquet halls and a rooftop pool.",
    durationMonths: 24,
    teamSize: 58,
    summary: "A 220-room riverside hotel with banqueting, a spa and a rooftop pool, delivered with zero lost-time incidents.",
    challenge: "Guest rooms needed whisper-quiet air conditioning and reliable hot water, while banquet halls had large, variable cooling loads.",
    solution: "UMS used low-velocity air distribution in guest corridors, central hot-water plant with recirculation and variable-speed pumps sized for banquet peaks.",
    outcome: "The hotel opened on schedule with a clean safety record across the MEP package.",
    image: "poolFountain",
    imagePosition: "center 60%",
    gallery: [["facade"], ["glassTower", "center 30%"]],
  },
  {
    slug: "indus-institute-campus",
    name: "Indus Institute Campus",
    featured: false,
    status: "completed",
    sector: "education-institutional",
    services: ["integrated-mep", "hvac", "plumbing", "electrical-elv"],
    location: "Multan",
    year: 2021,
    areaSqFt: 350000,
    client: "Indus Education Foundation",
    mainContractor: "Indus Builders",
    consultant: "Meridian Engineering Consultants",
    umsRole: "Integrated MEP for four academic blocks, a library and a student centre, including campus-wide chilled water and ELV.",
    durationMonths: 27,
    teamSize: 62,
    summary: "A four-block academic campus served by a central chilled-water plant and a campus-wide ELV network.",
    challenge: "Multan's summer heat demanded efficient cooling across widely spaced buildings, and the campus had to open for the start of the academic year.",
    solution: "UMS installed a central chilled-water plant with a buried distribution loop and phased handover block by block ahead of term.",
    outcome: "All blocks were ready for the first intake, and the central plant has run efficiently through successive summers.",
    image: "wavyRoof",
    imagePosition: "center 60%",
    gallery: [["facade", "center 40%"], ["glassReflection"]],
  },
  {
    slug: "karakoram-logistics-park",
    name: "Karakoram Logistics Park",
    featured: false,
    status: "ongoing",
    sector: "industrial-warehousing",
    services: ["fire-fighting", "hvac", "electrical-elv"],
    location: "Karachi",
    year: 2025,
    areaSqFt: 720000,
    client: "Karakoram Infra",
    mainContractor: "Pak Steel Structures",
    consultant: "Alpha Design Associates",
    umsRole: "Fire fighting, ventilation and LT electrical for a multi-unit logistics park with high-bay warehouses and a cold-chain facility.",
    durationMonths: 20,
    teamSize: 48,
    summary: "A multi-unit logistics park with high-bay racked warehouses and a temperature-controlled cold-chain building.",
    challenge: "High-bay racked storage creates a demanding fire-protection design, and the cold-chain building needs reliable power and ventilation.",
    solution: "UMS is delivering in-rack and ceiling sprinkler systems fed by a dedicated pump house, with duty and standby power for refrigeration loads.",
    outcome: "The first two warehouse units are energised and tested, and the cold-chain building is under construction.",
    image: "redPipes",
    gallery: [["pumpRoom", "center 35%"], ["breakerPanel", "center 45%"]],
  },
  {
    slug: "gulberg-medical-centre",
    name: "Gulberg Medical Centre",
    featured: false,
    status: "completed",
    sector: "healthcare",
    services: ["hvac", "plumbing", "electrical-elv", "fire-fighting"],
    location: "Lahore",
    year: 2018,
    areaSqFt: 120000,
    client: "Summit Healthcare Group",
    mainContractor: "Crescent Developers",
    consultant: "Alpha Design Associates",
    umsRole: "HVAC, medical plumbing, electrical and fire fighting for a day-surgery and diagnostics centre.",
    durationMonths: 16,
    teamSize: 38,
    summary: "A day-surgery and diagnostics centre with imaging suites, operating rooms and a pharmacy store.",
    challenge: "Imaging and surgery rooms needed shielded power, stable temperature and filtered air in a compact floor plate.",
    solution: "UMS used dedicated air-handling units per critical zone, isolated power distribution for imaging equipment and a compact, well-labelled plant room.",
    outcome: "The centre passed all authority inspections first time and has been maintained by UMS under a service agreement since handover.",
    image: "ceilingServices",
    imagePosition: "center 40%",
    gallery: [["breakerPanel", "center 45%"], ["glassReflection"]],
  },
  {
    slug: "summit-business-square",
    name: "Summit Business Square",
    featured: false,
    status: "ongoing",
    sector: "commercial-retail",
    services: ["hvac", "fire-fighting", "plumbing", "electrical-elv"],
    location: "Islamabad",
    year: 2026,
    areaSqFt: 310000,
    client: "Capital Smart Towers",
    mainContractor: "Karakoram Infra",
    consultant: "Meridian Engineering Consultants",
    umsRole: "HVAC, fire fighting, plumbing and electrical & ELV for a Grade-A office building with retail podium and three basement levels.",
    durationMonths: 26,
    teamSize: 52,
    summary: "A Grade-A office building above a retail podium and three basement levels of parking and plant.",
    challenge: "Deep basements concentrate plant, pumps, tanks and electrical rooms, so coordination of space, drainage and ventilation is critical.",
    solution: "UMS is developing a coordinated basement model, setting out sleeves early and procuring long-lead plant ahead of structure completion.",
    outcome: "Basement and podium services are installed, with tower floors progressing in sequence.",
    image: "glassTower",
    imagePosition: "center 55%",
    gallery: [["highRise"], ["ceilingServices", "center 40%"]],
  },
];
