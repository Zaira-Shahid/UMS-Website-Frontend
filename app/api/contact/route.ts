import { contactSchema, fieldErrors } from "@/lib/forms/schemas";
import { deliverMail, parseRecipients } from "@/lib/server/mail";
import { guard, honeypotTripped, json, logServerError, makeReference } from "@/lib/server/http";
import { contactTeamEmail, contactVisitorEmail } from "@/lib/server/templates";

export const runtime = "nodejs";

/** POST /api/contact — JSON body with a hidden `website` honeypot. Same safeguards as /api/rfq. */
export async function POST(req: Request) {
  const blocked = guard(req, { route: "contact", max: 5, windowMs: 10 * 60_000, maxBytes: 64 * 1024 });
  if (blocked) return blocked;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "We could not read the submission. Please try again." }, 400);
  }
  if (typeof body !== "object" || body === null) {
    return json({ ok: false, error: "We could not read the submission. Please try again." }, 400);
  }

  if (honeypotTripped(body.website)) {
    console.warn("[contact] honeypot tripped - submission dropped");
    return json({ ok: true, reference: makeReference("MSG") });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, kind: "validation", errors: fieldErrors(parsed.error) }, 400);
  }

  const ref = makeReference("MSG");
  const team = parseRecipients(process.env.CONTACT_TO_EMAIL);
  try {
    await deliverMail(contactTeamEmail(parsed.data, ref, team));
  } catch (err) {
    logServerError("contact", err);
    return json({ ok: false, error: "We could not send your message just now. Please try again in a few minutes." }, 502);
  }
  try {
    await deliverMail(contactVisitorEmail(parsed.data, ref, team[0]));
  } catch (err) {
    logServerError("contact-confirmation", err);
  }
  return json({ ok: true, reference: ref });
}
