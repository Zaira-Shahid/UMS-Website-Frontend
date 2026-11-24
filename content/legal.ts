/**
 * Privacy policy TEMPLATE. Not legal advice and not approved for publication.
 *
 * Each section has two parts:
 *  - `facts`: what this website actually does today (verifiable from the code), written
 *    plainly. A lawyer should still confirm they are complete and correctly worded.
 *  - `todo`: statements only UMS and its legal adviser can supply (legal entity, legal
 *    basis, retention periods, rights, contact). Rendered as clearly marked placeholders.
 *
 * TODO: legal review — the whole document, before launch.
 */
export interface PolicySection {
  id: string;
  title: string;
  facts?: string[];
  todo: string[];
}

export const privacyMeta = {
  title: "Privacy Policy",
  /** TODO: legal review — set once the policy is approved. */
  lastUpdated: undefined as string | undefined,
};

export const privacySections: PolicySection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    facts: [
      "This website is operated by Ultimate Mechanical Solutions (UMS), a mechanical, electrical and plumbing contractor with offices in Islamabad and Lahore.",
    ],
    todo: [
      "Registered legal name, registration number and registered address of the company that controls your personal data.",
      "The name and contact details of the person responsible for privacy questions.",
    ],
  },
  {
    id: "forms",
    title: "Information you send us through our forms",
    facts: [
      "Request a Quote: your name, company (optional), email address and phone number; the project name, city, sector and stage; the services you want priced; an optional scope description; an optional tender deadline; and, only if uploads are enabled, attached BOQ and drawing files.",
      "Contact: your name, email address, phone number (optional), a subject and your message.",
      "Careers: your name, email address, phone number, the position you are applying for, an optional message and your CV.",
      "When you submit a form, we send you a confirmation email with a reference number.",
    ],
    todo: [
      "Confirm this list matches the forms live on the site when the policy is published.",
    ],
  },
  {
    id: "file-uploads",
    title: "Files you upload",
    facts: [
      "Quote requests can include PDF, DWG or ZIP files (up to three files, 10 MB each) when uploads are switched on. Applications must include a CV as a PDF of up to 5 MB.",
      "Files are checked for type and size and are delivered to UMS by email as attachments.",
    ],
    todo: [
      "How long uploaded files are kept, who at UMS can access them, and how they are deleted.",
    ],
  },
  {
    id: "job-applications",
    title: "Job applications",
    facts: [
      "Your application details and CV are used to consider you for the position you applied for, or for future openings if you sent a general application.",
    ],
    todo: [
      "How long applications are kept and whether candidates are asked for consent to keep them for future openings.",
      "Whether any information is shared with recruitment partners.",
    ],
  },
  {
    id: "automatic",
    title: "Information collected automatically",
    facts: [
      "To limit spam, the server keeps a short-lived, in-memory count of recent form submissions against your IP address. It is not written to a database.",
      "Your hosting provider may keep standard server logs.",
    ],
    todo: [
      "What the hosting provider logs, for how long, and where it is stored.",
    ],
  },
  {
    id: "cookies-storage",
    title: "Cookies and browser storage",
    facts: [
      "While you fill in the Request a Quote form, your answers are saved in your own browser's local storage so you can resume later. They stay on your device and are not sent to UMS until you submit the form. The draft is removed when you submit, or when you choose to start fresh.",
    ],
    todo: [
      "Confirm whether any cookies are set by the site or by third-party services, and add a cookie notice if required.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    facts: [
      "No analytics service is configured on the site at the moment.",
    ],
    todo: [
      "If analytics is added, name the tool, what it collects, whether it uses cookies and how visitors can opt out. This section must be completed before any analytics tool goes live.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    facts: [
      "To reply to enquiries, prepare quotations, consider job applications, send confirmation emails and protect the site from abuse.",
    ],
    todo: [
      "The legal basis for each use, as required by the laws that apply to UMS.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    facts: [
      "Form submissions are delivered to UMS by an email delivery service (Resend).",
    ],
    todo: [
      "The full list of service providers that process personal data (email, hosting, analytics) and where they operate.",
      "Whether data is transferred outside Pakistan and what safeguards apply.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    todo: [
      "Retention periods for enquiries, quote requests, uploaded files and job applications.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    todo: [
      "The rights available to visitors (access, correction, deletion and so on) and how to exercise them.",
      "How and when UMS will respond to requests.",
    ],
  },
  {
    id: "security",
    title: "Security",
    todo: [
      "A description of the technical and organisational measures protecting personal data, confirmed with UMS's technical team.",
    ],
  },
  {
    id: "contact",
    title: "Contact us about privacy",
    todo: [
      "The email address and postal address for privacy questions and complaints.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    todo: [
      "How visitors will be told about changes, and the date the current version took effect.",
    ],
  },
];
