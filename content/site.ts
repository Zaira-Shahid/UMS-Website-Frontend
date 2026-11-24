import { companyProfileUrl, dummyStats, social, whatsapp } from "./dummy";

/** Company-wide configuration. Placeholder facts come from content/dummy.ts. */
export const site = {
  name: "UMS",
  fullName: "Ultimate Mechanical Solutions",
  domain: "umss.pk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://umss.pk",
  description:
    "UMS delivers MEP contracting for complex buildings: HVAC, fire fighting, electrical and ELV, plumbing and public health, and pools and fountains, from Islamabad and Lahore.",
  /** Logo file at /public/brand/ums-logo.svg once supplied; a typographic wordmark stands in. */
  logo: undefined as string | undefined,
  companyProfileUrl,
  whatsapp,
  social,
  /** Homepage stats band. */
  stats: dummyStats,
} as const;
