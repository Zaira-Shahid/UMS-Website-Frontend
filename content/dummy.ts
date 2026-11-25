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
import type { CareerType, Stat, Testimonial } from "@/types";

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

/**
 * Project names confirmed by the owner. Only the name is stored; every other detail that used to be
 * here (sector, city, year, area, package, challenge/solution/outcome, photos) was invented and removed.
 */
export const confirmedProjects = [
  { slug: "lady-reading-hospital", name: "Lady Reading Hospital" },
  { slug: "buch-international-hospital", name: "Buch International Hospital" },
  { slug: "elanza-mall", name: "Elanza Mall" },
  { slug: "pakistan-cricket-board-house", name: "Pakistan Cricket Board House" },
  { slug: "cggc-head-office-eighteen", name: "CGGC Head Office at Eighteen" },
  { slug: "jazz-destiny", name: "Jazz Destiny" },
] as const;
