import { projects } from "@/content/projects";
import type { IndustrySlug, ServiceSlug } from "@/types";
import {
  PROJECT_STAGES,
  SECTOR_SLUGS,
  SERVICE_SLUGS,
  parseServiceParam,
  type RfqValues,
} from "./schemas";

export const RFQ_STEPS = ["Contact", "Project", "Services", "Tender", "Review"] as const;

export const RFQ_DRAFT_KEY = "ums-rfq-draft-v1";

export const RFQ_DEFAULTS = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectName: "",
  city: "",
  sector: "",
  stage: "",
  services: [],
  scope: "",
  deadline: "",
  relatedProject: "",
} as unknown as RfqValues;

/** What the URL asks the form to start with. Everything here has been validated. */
export interface RfqPreselect {
  services: ServiceSlug[];
  /** The case study the visitor came from (shown as "Enquiry related to …"). */
  project: { slug: string; name: string } | null;
  /** Only set when the project's sector is confirmed in /content. */
  sector?: IndustrySlug;
}

/**
 * Resolve ?service=<slug>[,<slug>] and ?project=<slug>. Invalid values are ignored.
 * From a project we only take CONFIRMED data (sector, services) — never guesses. The
 * project's name and city are deliberately not copied into the form: the visitor's own
 * project is usually a different one ("Need similar work?").
 */
export function resolveQuotePreselect(params: {
  service?: string | string[];
  project?: string | string[];
}): RfqPreselect {
  const projectSlug = Array.isArray(params.project) ? params.project[0] : params.project;
  const project = projects.find((p) => p.slug === projectSlug);
  const fromParam = parseServiceParam(params.service);
  const fromProject = project?.services ?? [];
  const services = [...new Set([...fromParam, ...fromProject])] as ServiceSlug[];
  return {
    services,
    project: project ? { slug: project.slug, name: project.name } : null,
    sector: project?.sector,
  };
}

/** Initial form values for a preselection. */
export const defaultsFor = (pre: RfqPreselect): RfqValues => ({
  ...RFQ_DEFAULTS,
  services: pre.services,
  sector: (pre.sector ?? "") as RfqValues["sector"],
  relatedProject: pre.project?.slug ?? "",
});

/* ───────────── Draft (localStorage) ───────────── */

export interface RfqDraft {
  values: Partial<RfqValues>;
  step: number;
  savedAt: number;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

/** Validate whatever came out of localStorage — it may be stale, edited or corrupt. */
export function sanitizeDraft(raw: unknown): RfqDraft | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as { values?: Record<string, unknown>; step?: unknown; savedAt?: unknown };
  const v = r.values;
  if (typeof v !== "object" || v === null) return null;

  const stages = PROJECT_STAGES.map((s) => s.value) as string[];
  const values: Partial<RfqValues> = {
    name: str(v.name, 100),
    company: str(v.company, 120),
    email: str(v.email, 254),
    phone: str(v.phone, 30),
    projectName: str(v.projectName, 120),
    city: str(v.city, 80),
    sector: (SECTOR_SLUGS as readonly string[]).includes(str(v.sector, 40))
      ? (str(v.sector, 40) as RfqValues["sector"])
      : ("" as RfqValues["sector"]),
    stage: stages.includes(str(v.stage, 20)) ? str(v.stage, 20) : "",
    services: Array.isArray(v.services)
      ? ((v.services as unknown[]).filter((s): s is ServiceSlug => (SERVICE_SLUGS as readonly unknown[]).includes(s)) as ServiceSlug[])
      : [],
    scope: str(v.scope, 2000),
    deadline: str(v.deadline, 10),
  };
  const step = typeof r.step === "number" && r.step >= 0 && r.step <= 3 ? Math.floor(r.step) : 0;
  return { values, step, savedAt: typeof r.savedAt === "number" ? r.savedAt : Date.now() };
}

/** A draft is worth offering to resume only if the visitor actually typed something. */
export const draftHasContent = (d: RfqDraft) =>
  [d.values.name, d.values.company, d.values.email, d.values.phone, d.values.projectName, d.values.city, d.values.scope].some(
    (x) => !!x && x.trim() !== "",
  );
