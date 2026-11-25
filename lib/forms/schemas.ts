/**
 * Shared form schemas and rules. Imported by BOTH the browser forms and the
 * /api route handlers, so client and server can never disagree. Keep this file
 * free of server-only or browser-only imports.
 */
import { z } from "zod";
import type { IndustrySlug, ServiceSlug } from "@/types";

/* ───────────── Constants ───────────── */

export const SERVICE_SLUGS = [
  "integrated-mep",
  "hvac",
  "fire-fighting",
  "plumbing",
  "electrical-elv",
  "pools-fountains",
] as const satisfies readonly ServiceSlug[];

export const SECTOR_SLUGS = [
  "healthcare",
  "commercial-retail",
  "residential-mixed-use",
  "hospitality",
  "education-institutional",
  "industrial-warehousing",
] as const satisfies readonly IndustrySlug[];

// Compile-time guard: adding a slug to the content types without updating the lists above fails here.
type Missing<A, B> = Exclude<A, B>;
const _servicesComplete: Missing<ServiceSlug, (typeof SERVICE_SLUGS)[number]> extends never ? true : never = true;
const _sectorsComplete: Missing<IndustrySlug, (typeof SECTOR_SLUGS)[number]> extends never ? true : never = true;
void _servicesComplete;
void _sectorsComplete;

export const PROJECT_STAGES = [
  { value: "concept", label: "Concept / feasibility" },
  { value: "design", label: "Design / pre-tender" },
  { value: "tender", label: "Tender stage" },
  { value: "construction", label: "Under construction" },
  { value: "existing", label: "Existing building (retrofit / upgrade)" },
] as const;
const STAGE_VALUES = PROJECT_STAGES.map((s) => s.value) as [string, ...string[]];

export const GENERAL_APPLICATION = "General application";

/* ───────────── Uploads ───────────── */

export interface UploadRules {
  /** Lower-case extensions including the dot. */
  extensions: readonly string[];
  maxBytes: number;
  maxFiles: number;
}

export const RFQ_UPLOAD_RULES: UploadRules = {
  extensions: [".pdf", ".dwg", ".zip"],
  maxBytes: 10 * 1024 * 1024,
  maxFiles: 3,
};

export const CV_UPLOAD_RULES: UploadRules = {
  extensions: [".pdf"],
  maxBytes: 5 * 1024 * 1024,
  maxFiles: 1,
};

export const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${+(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

export const extensionOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
};

/** Validate one file's name and size against the rules. Returns a message or null. */
export function validateUpload(file: { name: string; size: number }, rules: UploadRules): string | null {
  const ext = extensionOf(file.name);
  if (!rules.extensions.includes(ext)) {
    return `${file.name}: only ${rules.extensions.map((e) => e.slice(1).toUpperCase()).join(", ")} files are accepted.`;
  }
  if (file.size === 0) return `${file.name} is empty.`;
  if (file.size > rules.maxBytes) {
    return `${file.name} is ${formatBytes(file.size)} — the limit is ${formatBytes(rules.maxBytes)} per file.`;
  }
  return null;
}

/* ───────────── Field rules ───────────── */

const required = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const name = required("Full name", 100).refine((v) => v.length >= 2, "Enter your full name.");

const email = z
  .string()
  .trim()
  .min(1, "Email address is required.")
  .max(254, "Email address is too long.")
  .pipe(z.email("Enter a valid email address, like name@company.com."));

const PHONE_CHARS = /^[+0-9\s().-]+$/;
const phoneDigits = (v: string) => v.replace(/\D/g, "").length;
const phoneRule = (v: string) => PHONE_CHARS.test(v) && phoneDigits(v) >= 7 && phoneDigits(v) <= 15;
const phoneMessage = "Enter a phone number with 7–15 digits, including the country code.";

const phone = z.string().trim().min(1, "Phone number is required.").refine(phoneRule, phoneMessage);
const optionalPhone = z
  .string()
  .trim()
  .default("")
  .refine((v) => v === "" || phoneRule(v), phoneMessage);

/** Optional free text: may be omitted or empty, and is then "" so downstream code never sees undefined. */
const optionalText = (label: string, max: number) =>
  z.string().trim().max(max, `${label} must be ${max} characters or fewer.`).default("");

/** Deadline is optional; if given it must be a real date, not in the past, within five years. */
export function isDeadlineOk(value: string, now = new Date()): boolean {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return false;
  // One day of slack so timezones ahead of UTC (e.g. Pakistan) can pick "today".
  const floor = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - 86_400_000;
  const ceiling = Date.UTC(now.getUTCFullYear() + 5, now.getUTCMonth(), now.getUTCDate());
  return d.getTime() >= floor && d.getTime() <= ceiling;
}

/* ───────────── RFQ ───────────── */

export const rfqContactSchema = z.object({
  name,
  company: optionalText("Company", 120),
  email,
  phone,
});

export const rfqProjectSchema = z.object({
  projectName: required("Project name", 120),
  city: required("City", 80),
  sector: z.enum(SECTOR_SLUGS, { error: "Choose the sector that best fits the project." }),
  stage: z.enum(STAGE_VALUES, { error: "Choose the current project stage." }),
});

export const rfqServicesSchema = z.object({
  services: z
    .array(z.enum(SERVICE_SLUGS))
    .min(1, "Select at least one service.")
    .max(SERVICE_SLUGS.length),
  scope: optionalText("Scope description", 2000),
});

export const rfqTenderSchema = z.object({
  deadline: z.string().trim().default("").refine(isDeadlineOk, "Enter a valid date that is not in the past."),
  /** Slug of the case study the enquiry came from; validated against content on the server. */
  relatedProject: optionalText("Related project", 80),
});

export const rfqSchema = z.object({
  ...rfqContactSchema.shape,
  ...rfqProjectSchema.shape,
  ...rfqServicesSchema.shape,
  ...rfqTenderSchema.shape,
});

export type RfqValues = z.infer<typeof rfqSchema>;
/** What the form holds while editing (optional text may be absent); RfqValues is what validation outputs. */
export type RfqInput = z.input<typeof rfqSchema>;

/** The fields each RFQ step owns — used for per-step validation and error routing. */
export const RFQ_STEP_FIELDS = [
  ["name", "company", "email", "phone"],
  ["projectName", "city", "sector", "stage"],
  ["services", "scope"],
  ["deadline"],
  [],
] as const satisfies readonly (readonly (keyof RfqValues)[])[];

/* ───────────── Contact ───────────── */

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  subject: required("Subject", 120),
  message: required("Message", 3000).refine((v) => v.length >= 10, "Tell us a little more (at least 10 characters)."),
});
export type ContactValues = z.infer<typeof contactSchema>;
export type ContactInput = z.input<typeof contactSchema>;

/* ───────────── Careers ───────────── */

export const careersSchema = z.object({
  name,
  email,
  phone,
  position: required("Position", 120),
  message: optionalText("Message", 2000),
});
export type CareersValues = z.infer<typeof careersSchema>;
export type CareersInput = z.input<typeof careersSchema>;

/* ───────────── Helpers ───────────── */

/** Flatten zod issues to { field: firstMessage } for inline display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

/** Parse a comma-separated and/or repeated query value into valid, unique service slugs. */
export function parseServiceParam(value: string | string[] | undefined): ServiceSlug[] {
  const raw = (Array.isArray(value) ? value : value ? [value] : []).flatMap((v) => v.split(","));
  const valid = new Set<string>(SERVICE_SLUGS);
  return [...new Set(raw.map((s) => s.trim()).filter((s) => valid.has(s)))] as ServiceSlug[];
}
