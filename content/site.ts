/**
 * Company-wide configuration.
 *
 * CONTACT DETAILS: every value in `contact` is intentionally empty. None of the company's phone numbers,
 * emails, street addresses, hours, WhatsApp number or social profiles have been verified, so none are
 * shown. Fill a value in here and it appears everywhere it is used (footer, contact page, mobile menu,
 * quote page); a field with no value renders nothing. See CONTENT_TO_VERIFY.md.
 */

export interface OfficeConfig {
  city: "Islamabad" | "Lahore";
  /** Street address, one line. */
  address: string;
  phone: string;
  email: string;
  /** Opening hours as plain text, e.g. "Mon–Sat, 9:00 AM – 6:00 PM". */
  hours: string;
  /** Link that opens the office in a map app. */
  mapUrl: string;
}

export const contact = {
  offices: [
    { city: "Islamabad", address: "", phone: "", email: "", hours: "", mapUrl: "" },
    { city: "Lahore", address: "", phone: "", email: "", hours: "", mapUrl: "" },
  ] satisfies OfficeConfig[],
  /** Company-wide mailboxes. */
  email: { general: "", tenders: "", careers: "" },
  /** Main phone number, if the company has one that is not an office line. */
  phone: "",
  /** International format, e.g. "+92 300 0000000". Used for the wa.me link. */
  whatsapp: "",
  /** Full profile URLs. */
  social: { linkedin: "", facebook: "", instagram: "", youtube: "", x: "", tiktok: "" },
};

export const site = {
  name: "UMS",
  fullName: "Ultimate Mechanical Solutions",
  domain: "umss.pk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://umss.pk",
  description:
    "UMS delivers MEP contracting for complex buildings: HVAC, fire fighting, electrical and ELV, plumbing and public health, and pools and fountains, with offices in Islamabad and Lahore.",
} as const;
