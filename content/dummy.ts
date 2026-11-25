/**
 * DUMMY DATA — single source for every placeholder fact on the site (spec §5).
 *
 * Everything here except `confirmedProjects` is unverified. Company contact details live in
 * content/site.ts (empty until supplied). CONTENT_TO_VERIFY.md tracks what must be confirmed or
 * replaced before launch. Nothing in the UI is labelled "dummy" or "to be confirmed".
 *
 * Article bodies live in ./dummy-articles.ts to keep this file readable; they are
 * re-exported from here.
 */
import type { CareerType } from "@/types";

export { dummyArticles } from "./dummy-articles";
export type { DummyArticle } from "./dummy-articles";

/* ------------------------------------------------------------ company */

export const company = {
  name: "Ultimate Mechanical Solutions",
  shortName: "UMS",
  tagline: "MEP Contracting for Complex Buildings",
} as const;

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
