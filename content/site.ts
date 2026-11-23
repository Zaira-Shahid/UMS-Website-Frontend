/**
 * Company-wide configuration. Anything not supplied by UMS is `undefined`
 * and must be rendered as a clearly marked placeholder or hidden.
 */
export const site = {
  name: "UMS",
  fullName: "Ultimate Mechanical Solutions",
  domain: "umss.pk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://umss.pk",
  description:
    "UMS delivers MEP contracting for complex buildings — HVAC, fire fighting, electrical and ELV, plumbing and public health, and pools and fountains — from Islamabad and Lahore.",
  /** TODO: client to confirm — logo file at /public/brand/ums-logo.svg */
  logo: undefined as string | undefined,
  /** TODO: client to confirm — company profile PDF */
  companyProfileUrl: undefined as string | undefined,
  /** TODO: client to confirm — WhatsApp number */
  whatsapp: undefined as string | undefined,
  /** TODO: client to confirm — social profiles */
  social: {
    linkedin: undefined as string | undefined,
    facebook: undefined as string | undefined,
    instagram: undefined as string | undefined,
  },
  /**
   * Homepage credential band. Values are NOT confirmed — rendered with a
   * "to be confirmed" marker until UMS supplies verified figures.
   */
  stats: [
    { label: "Project entries", value: undefined as number | undefined },
    { label: "Service disciplines", value: 6 },
    { label: "Offices", value: 2 },
    { label: "PEC registration", value: undefined as number | undefined },
  ],
} as const;
