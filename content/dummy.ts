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
