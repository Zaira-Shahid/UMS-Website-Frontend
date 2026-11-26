/**
 * Company-wide configuration.
 *
 * CONTACT DETAILS: the two office addresses, the office phone number and the email addresses below are the ones published on
 * the company's own website (https://umss.pk, "Get in Touch"). Hours, a map link, a WhatsApp number and social profiles are
 * still empty because none has been supplied. Fill a value in here and it appears everywhere it is used (footer, contact
 * page, mobile menu, quote page); a field with no value renders nothing. See CONTENT_TO_VERIFY.md.
 */

export interface OfficeConfig {
  city: "Islamabad" | "Lahore";
  /** Street address, one line. */
  address: string;
  phone: string;
  email: string;
  /** A second mailbox for the same office, if it has one. */
  email2?: string;
  /** Opening hours as plain text, e.g. "Mon–Sat, 9:00 AM – 6:00 PM". */
  hours: string;
  /** Link that opens the office in a map app. */
  mapUrl: string;
}

export const contact = {
  offices: [
    {
      city: "Islamabad",
      address: "Office # 1, 1st Floor, Abdullah Plaza, Main Road, Ghouri Garden, Islamabad.",
      phone: "(0333) 1811113",
      email: "info@umss.pk",
      email2: "ums.isb@gmail.com",
      hours: "",
      mapUrl: "",
    },
    {
      city: "Lahore",
      address: "Suite # 7, Second Floor, MI Tower Phase-1, Khyaban-e-Jinnah Road, Nasheman-e-Iqbal Lahore.",
      phone: "(0333) 1811113",
      email: "info@umss.pk",
      hours: "",
      mapUrl: "",
    },
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
