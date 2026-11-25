/**
 * Privacy policy: a neutral, general statement of what this website does with information. The factual parts are
 * taken from how the site actually works (forms, uploads, in-memory rate limiting, local-storage drafts, no
 * analytics). Statements about retention and rights are general and need the owner's confirmation and legal review
 * before launch (see CONTENT_TO_VERIFY.md).
 */
export interface PolicySection {
  id: string;
  title: string;
  paragraphs: string[];
}

export const privacyMeta = {
  title: "Privacy Policy",
  intro: "This page explains what information this website collects, why, and what happens to it.",
};

export const privacySections: PolicySection[] = [
  {
    id: "who",
    title: "Who runs this website",
    paragraphs: [
      "This website is operated by Ultimate Mechanical Solutions (UMS), a mechanical, electrical and plumbing contractor with offices in Islamabad and Lahore. You can reach UMS through the contact page.",
    ],
  },
  {
    id: "forms",
    title: "Information you send through the forms",
    paragraphs: [
      "Request a Quote: your name, company (optional), email address and phone number; the project name, city, sector and stage; the services you want priced; an optional description of the scope; and an optional tender deadline.",
      "Contact: your name, email address, phone number (optional), a subject and your message.",
      "Careers: your name, email address, phone number, the position you are applying for, an optional message and your CV.",
      "After you submit a form you receive a confirmation email with a reference number.",
    ],
  },
  {
    id: "files",
    title: "Files you upload",
    paragraphs: [
      "An application must include a CV as a PDF of up to 5 MB. Quote requests can include PDF, DWG or ZIP files when uploads are switched on. Files are checked for type and size and are sent to UMS by email as attachments.",
    ],
  },
  {
    id: "automatic",
    title: "Information collected automatically",
    paragraphs: [
      "To limit spam, the server keeps a short-lived count of recent form submissions against your IP address, in memory only. It is not written to a database.",
      "The company that hosts the website may keep standard server logs.",
    ],
  },
  {
    id: "browser",
    title: "Cookies and browser storage",
    paragraphs: [
      "While you fill in the Request a Quote form, your answers are saved in your own browser's local storage so that you can come back to them. They stay on your device and are not sent to UMS until you submit the form. The draft is removed after a successful submission.",
      "This website does not use advertising cookies.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    paragraphs: ["No analytics service is used on this website at the moment."],
  },
  {
    id: "use",
    title: "How the information is used",
    paragraphs: ["To reply to enquiries, prepare quotations, consider job applications, send confirmation emails and protect the website from abuse."],
  },
  {
    id: "sharing",
    title: "Who receives it",
    paragraphs: ["Form submissions are delivered to UMS through an email delivery service. Your information is not sold, and it is not shared for advertising."],
  },
  {
    id: "keeping",
    title: "How long it is kept",
    paragraphs: [
      "Enquiries, quote requests and applications are kept for as long as needed to respond to them and to keep ordinary business records. A CV may be kept on file for future openings if you send a general application.",
    ],
  },
  {
    id: "choices",
    title: "Your choices",
    paragraphs: ["You can ask what information UMS holds about you, ask for it to be corrected, or ask for it to be deleted, by writing through the contact page."],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "Forms are checked on the server, limited in how often they can be submitted, and sent over an encrypted connection. No method of transmission or storage is completely secure.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: ["This page will be updated if the way the website handles information changes."],
  },
];
