import { careers } from "@/content/careers";
import { careersSchema, CV_UPLOAD_RULES, fieldErrors, GENERAL_APPLICATION } from "@/lib/forms/schemas";
import { deliverMail, MAIL_UNAVAILABLE_MESSAGE, MailNotConfiguredError, parseRecipients } from "@/lib/server/mail";
import { guard, honeypotTripped, json, logServerError, makeReference, readUploads } from "@/lib/server/http";
import { careersTeamEmail, careersVisitorEmail } from "@/lib/server/templates";

export const runtime = "nodejs";

/** POST /api/careers — multipart form: `payload` (JSON), required `cv` (PDF up to 5 MB), honeypot `website`. */
export async function POST(req: Request) {
  const blocked = guard(req, {
    route: "careers",
    max: 3,
    windowMs: 10 * 60_000,
    maxBytes: CV_UPLOAD_RULES.maxBytes + 512 * 1024,
  });
  if (blocked) return blocked;

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return json({ ok: false, error: "We could not read the submission. Please try again." }, 400);
  }

  if (honeypotTripped(fd.get("website"))) {
    console.warn("[careers] honeypot tripped - submission dropped");
    return json({ ok: true, reference: makeReference("APP") });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(String(fd.get("payload") ?? ""));
  } catch {
    return json({ ok: false, error: "We could not read the submission. Please try again." }, 400);
  }
  const parsed = careersSchema.safeParse(payload);
  const errors: Record<string, string> = parsed.success ? {} : fieldErrors(parsed.error);

  if (parsed.success) {
    const allowed = [GENERAL_APPLICATION, ...careers.map((c) => c.title)];
    if (!allowed.includes(parsed.data.position)) errors.position = "Choose one of the listed positions.";
  }

  const { files, error: fileError } = await readUploads(fd, "cv", CV_UPLOAD_RULES);
  if (fileError) errors.cv = fileError;
  else if (files.length === 0) errors.cv = "Attach your CV as a PDF.";

  if (!parsed.success || Object.keys(errors).length > 0) {
    return json({ ok: false, kind: "validation", errors }, 400);
  }

  const ref = makeReference("APP");
  const team = parseRecipients(process.env.CAREERS_TO_EMAIL);
  try {
    await deliverMail(careersTeamEmail(parsed.data, ref, team, files));
  } catch (err) {
    logServerError("careers", err);
    if (err instanceof MailNotConfiguredError) return json({ ok: false, error: MAIL_UNAVAILABLE_MESSAGE }, 503);
    return json({ ok: false, error: "We could not send your application just now. Please try again in a few minutes." }, 502);
  }
  try {
    await deliverMail(careersVisitorEmail(parsed.data, ref, team[0]));
  } catch (err) {
    logServerError("careers-confirmation", err);
  }
  return json({ ok: true, reference: ref });
}
