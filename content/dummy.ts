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
/* ------------------------------------------------------------ company */

export const company = {
  name: "Ultimate Mechanical Solutions",
  shortName: "UMS",
  tagline: "MEP Contracting for Complex Buildings",
} as const;

/* Mission and values: deliberately general wording. The owner still has to approve or replace it (CONTENT_TO_VERIFY.md). */

export const dummyMission = {
  statement:
    "To deliver the systems inside buildings (air, water, power and life safety) so that they work from the first day and keep working.",
  vision: "To be a contractor that clients and consultants can rely on for complex buildings.",
};

export const dummyValues = [
  { title: "Precision", description: "Services are drawn, checked and measured before they are built, because details decide whether a complex building works." },
  { title: "Safety", description: "Safe methods are planned, briefed and followed on every site." },
  { title: "Integrity", description: "Say what will be done, price it plainly and report progress honestly." },
  { title: "Collaboration", description: "Building services share every ceiling and shaft, so the trades need to work openly with each other and with consultants." },
  { title: "Reliability", description: "Complete records and a clean handover matter as much as the installation." },
  { title: "Craft", description: "Well-trained people install systems that last." },
];

/* ------------------------------------------------------------ projects */

/**
 * Project names confirmed by the owner. Only the name is stored; every other detail that used to be
 * here (sector, city, year, area, package, challenge/solution/outcome, photos) was invented and removed.
 */
export const confirmedProjects: readonly { slug: string; name: string; sector?: "healthcare"; city?: string }[] = [
  { slug: "buch-international-hospital", name: "Buch International Hospital", sector: "healthcare", city: "Multan" },
  { slug: "lady-reading-hospital", name: "Lady Reading Hospital", sector: "healthcare", city: "Peshawar" },
  { slug: "elanza-mall", name: "Elanza Mall" },
  { slug: "pakistan-cricket-board-house", name: "Pakistan Cricket Board House" },
  { slug: "cggc-head-office-eighteen", name: "CGGC Head Office at Eighteen" },
  { slug: "jazz-destiny", name: "Jazz Destiny" },
] as const;
