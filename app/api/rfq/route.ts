import { projects } from "@/content/projects";
import { fieldErrors, rfqSchema, RFQ_UPLOAD_RULES } from "@/lib/forms/schemas";
import { deliverMail, MAIL_UNAVAILABLE_MESSAGE, MailNotConfiguredError, parseRecipients } from "@/lib/server/mail";
import { guard, honeypotTripped, json, logServerError, makeReference, readUploads } from "@/lib/server/http";
import { rfqTeamEmail, rfqVisitorEmail } from "@/lib/server/templates";

export const runtime = "nodejs";

const UPLOADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_UPLOADS === "true";
const MAX_BODY = RFQ_UPLOAD_RULES.maxBytes * RFQ_UPLOAD_RULES.maxFiles + 512 * 1024;

/**
 * POST /api/rfq — multipart form: `payload` (JSON), optional `files`, honeypot `website`.
 * Safeguards: origin check, body cap, per-IP rate limit, honeypot, shared zod schema,
 * file type + size + signature checks (only when uploads are enabled).
 */
export async function POST(req: Request) {
  const blocked = guard(req, { route: "rfq", max: 5, windowMs: 10 * 60_000, maxBytes: MAX_BODY });
  if (blocked) return blocked;

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return json({ ok: false, error: "We could not read the submission. Please try again." }, 400);
  }

  // Bots fill the hidden field. Pretend success so they learn nothing, and send nothing.
  if (honeypotTripped(fd.get("website"))) {
    console.warn("[rfq] honeypot tripped - submission dropped");
    return json({ ok: true, reference: makeReference("RFQ") });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(String(fd.get("payload") ?? ""));
  } catch {
    return json({ ok: false, error: "We could not read the submission. Please try again." }, 400);
  }
  const parsed = rfqSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, kind: "validation", errors: fieldErrors(parsed.error) }, 400);
  }
  const data = parsed.data;
  // An unknown related-project slug is ignored, never trusted.
  const related = projects.find((p) => p.slug === data.relatedProject);
  data.relatedProject = related?.slug ?? "";

  let attachments: { filename: string; content: Buffer }[] = [];
  if (fd.getAll("files").some((f) => typeof f !== "string" && f.size > 0)) {
    if (!UPLOADS_ENABLED) {
      return json({ ok: false, kind: "validation", errors: { files: "File uploads are not available right now." } }, 400);
    }
    const { files, error } = await readUploads(fd, "files", RFQ_UPLOAD_RULES);
    if (error) return json({ ok: false, kind: "validation", errors: { files: error } }, 400);
    attachments = files;
  }

  const ref = makeReference("RFQ");
  const team = parseRecipients(process.env.RFQ_TO_EMAIL);
  try {
    await deliverMail(rfqTeamEmail(data, ref, team, related?.name, attachments));
  } catch (err) {
    logServerError("rfq", err);
    if (err instanceof MailNotConfiguredError) return json({ ok: false, error: MAIL_UNAVAILABLE_MESSAGE }, 503);
    return json({ ok: false, error: "We could not send your request just now. Please try again in a few minutes." }, 502);
  }
  // The visitor confirmation is a courtesy: if it fails, the request itself still succeeded.
  try {
    await deliverMail(rfqVisitorEmail(data, ref, team[0]));
  } catch (err) {
    logServerError("rfq-confirmation", err);
  }
  return json({ ok: true, reference: ref });
}
