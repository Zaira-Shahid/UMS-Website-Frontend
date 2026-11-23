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
   * Homepage credential band. TODO: client to confirm — every value here.
   * Unconfirmed values stay `undefined` and render as "To be confirmed";
   * values that are set are counted from the site structure, not claims,
   * and are still flagged until UMS signs them off.
   */
  stats: [
    // TODO: client to confirm
    { label: "Project entries", value: undefined as number | undefined, suffix: "" },
    // TODO: client to confirm (matches the six service pages)
    { label: "Service disciplines", value: 6, suffix: "" },
    // TODO: client to confirm (Islamabad and Lahore)
    { label: "Offices", value: 2, suffix: "" },
    // TODO: client to confirm — PEC registration details
    { label: "PEC registration", value: undefined as number | undefined, suffix: "" },
  ],
} as const;
