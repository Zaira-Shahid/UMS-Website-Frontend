/**
 * Email bodies for the three forms. Every user-supplied value goes through
 * esc() for HTML and oneLine() for subjects, so submissions cannot inject markup
 * or headers. Server-only.
 */
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { PROJECT_STAGES, type CareersValues, type ContactValues, type RfqValues } from "@/lib/forms/schemas";
import { oneLine, type MailMessage } from "./mail";

const esc = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

type Row = [label: string, value: string];

function layout(heading: string, intro: string, rows: Row[], outro?: string) {
  const html = `<!doctype html><html><body style="margin:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;color:#1e2b37">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-top:4px solid #173f60">
<tr><td style="padding:28px 28px 8px"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#008ccb;font-weight:bold">${esc(site.name)} — ${esc(site.fullName)}</div>
<h1 style="margin:12px 0 8px;font-size:22px;color:#173f60">${esc(heading)}</h1><p style="margin:0;line-height:1.5">${esc(intro)}</p></td></tr>
<tr><td style="padding:16px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;width:34%;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#5b6b7a;border-top:1px solid #d9e4ec">${esc(k)}</td><td style="padding:8px 0;vertical-align:top;border-top:1px solid #d9e4ec;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table></td></tr>
${outro ? `<tr><td style="padding:8px 28px 28px;line-height:1.5;color:#5b6b7a">${esc(outro)}</td></tr>` : ""}
</table></td></tr></table></body></html>`;
  const text = [heading, "", intro, "", ...rows.map(([k, v]) => `${k}: ${v}`), ...(outro ? ["", outro] : [])].join("\n");
  return { html, text };
}

const serviceNames = (slugs: string[]) =>
  slugs.map((s) => services.find((x) => x.slug === s)?.name ?? s).join(", ");
const sectorName = (slug: string) => industries.find((i) => i.slug === slug)?.name ?? slug;
const stageName = (v: string) => PROJECT_STAGES.find((s) => s.value === v)?.label ?? v;

/* ── RFQ ── */

export function rfqTeamEmail(
  d: RfqValues,
  ref: string,
  to: string[],
  relatedProjectName: string | undefined,
  attachments: MailMessage["attachments"],
): MailMessage {
  const rows: Row[] = [
    ["Reference", ref],
    ["Name", d.name],
    ["Company", d.company || "—"],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Project", d.projectName],
    ["City", d.city],
    ["Sector", sectorName(d.sector)],
    ["Stage", stageName(d.stage)],
    ["Services", serviceNames(d.services)],
    ["Scope", d.scope || "—"],
    ["Tender deadline", d.deadline || "—"],
    ...(relatedProjectName ? ([["Enquiry related to", relatedProjectName]] as Row[]) : []),
    ["Attachments", attachments?.length ? attachments.map((a) => a.filename).join(", ") : "None"],
  ];
  const { html, text } = layout(`New quote request ${ref}`, "A visitor submitted the Request a Quote form.", rows);
  return {
    to,
    subject: oneLine(`[RFQ ${ref}] ${d.projectName} — ${d.name}`),
    html,
    text,
    replyTo: d.email,
    attachments,
  };
}

export function rfqVisitorEmail(d: RfqValues, ref: string, replyTo: string | undefined): MailMessage {
  const { html, text } = layout(
    "We have received your quote request",
    `Thank you, ${oneLine(d.name, 80)}. Your request for ${oneLine(d.projectName, 120)} is with the UMS team.`,
    [
      ["Reference", ref],
      ["Services", serviceNames(d.services)],
      ["City", d.city],
      ["Tender deadline", d.deadline || "Not given"],
    ],
    "What happens next: we review your brief, contact you if anything is missing, and then prepare the quotation. Please quote your reference in any correspondence.",
  );
  return { to: [d.email], subject: oneLine(`We received your quote request (${ref})`), html, text, replyTo };
}

/* ── Contact ── */

export function contactTeamEmail(d: ContactValues, ref: string, to: string[]): MailMessage {
  const { html, text } = layout(`New enquiry ${ref}`, "A visitor used the Contact form.", [
    ["Reference", ref],
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Subject", d.subject],
    ["Message", d.message],
  ]);
  return { to, subject: oneLine(`[Contact ${ref}] ${d.subject}`), html, text, replyTo: d.email };
}

export function contactVisitorEmail(d: ContactValues, ref: string, replyTo: string | undefined): MailMessage {
  const { html, text } = layout(
    "We have received your message",
    `Thank you, ${oneLine(d.name, 80)}. The UMS team will read your message and reply.`,
    [
      ["Reference", ref],
      ["Subject", d.subject],
    ],
  );
  return { to: [d.email], subject: oneLine(`We received your message (${ref})`), html, text, replyTo };
}

/* ── Careers ── */

export function careersTeamEmail(
  d: CareersValues,
  ref: string,
  to: string[],
  cv: NonNullable<MailMessage["attachments"]>,
): MailMessage {
  const { html, text } = layout(`New application ${ref}`, "A candidate used the Careers application form.", [
    ["Reference", ref],
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Position", d.position],
    ["Message", d.message || "—"],
    ["CV", cv.map((a) => a.filename).join(", ")],
  ]);
  return { to, subject: oneLine(`[Application ${ref}] ${d.position} — ${d.name}`), html, text, replyTo: d.email, attachments: cv };
}

export function careersVisitorEmail(d: CareersValues, ref: string, replyTo: string | undefined): MailMessage {
  const { html, text } = layout(
    "We have received your application",
    `Thank you, ${oneLine(d.name, 80)}. We have your application for ${oneLine(d.position, 120)}.`,
    [["Reference", ref]],
    "We will be in touch if your profile matches an opening. Please keep your reference for any follow-up.",
  );
  return { to: [d.email], subject: oneLine(`We received your application (${ref})`), html, text, replyTo };
}
