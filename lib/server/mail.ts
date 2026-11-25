/**
 * Mail delivery via the Resend HTTP API (plain fetch — no SDK needed).
 *
 * In development, if RESEND_API_KEY or MAIL_FROM is missing, or a message has no recipient, the
 * message is printed to the server console so forms still work locally. In production the same
 * situation throws MailNotConfiguredError and the routes answer with an honest error: a visitor is
 * never told a submission succeeded when nothing was sent. Secrets are never logged: only the
 * *reason* is.
 * Server-only — import from route handlers, never from client components.
 */

export interface MailAttachment {
  filename: string;
  content: Buffer;
}

export interface MailMessage {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

export type MailResult = { mode: "resend" | "console" };

/** Thrown in production when email delivery is not configured (missing key, sender or recipient). */
export class MailNotConfiguredError extends Error {}

/** What the visitor sees when delivery is not configured. */
export const MAIL_UNAVAILABLE_MESSAGE =
  "Online submissions are not available right now. Please email or call us directly instead.";

/** Split a comma/semicolon separated env value into trimmed, non-empty addresses. */
export const parseRecipients = (value: string | undefined): string[] =>
  (value ?? "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

/** Strip control characters so user input can never inject mail headers. */
export const oneLine = (value: string, max = 150) =>
  value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

function consoleFallback(msg: MailMessage, reason: string): MailResult {
  if (process.env.NODE_ENV === "production") throw new MailNotConfiguredError(reason);
  console.info(
    [
      `\n[mail:console] ${reason} — message not sent, printed instead.`,
      `  To:      ${msg.to.length ? msg.to.join(", ") : "(no recipient configured)"}`,
      msg.replyTo ? `  Reply-To: ${msg.replyTo}` : null,
      `  Subject: ${msg.subject}`,
      msg.attachments?.length
        ? `  Files:   ${msg.attachments.map((a) => `${a.filename} (${a.content.length} bytes)`).join(", ")}`
        : null,
      "  ------",
      msg.text
        .split("\n")
        .map((l) => `  ${l}`)
        .join("\n"),
      "",
    ]
      .filter((l): l is string => l !== null)
      .join("\n"),
  );
  return { mode: "console" };
}

export async function deliverMail(msg: MailMessage): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.MAIL_FROM?.trim();

  if (!key) return consoleFallback(msg, "RESEND_API_KEY is not set");
  if (!from) return consoleFallback(msg, "MAIL_FROM is not set");
  if (msg.to.length === 0) return consoleFallback(msg, "no recipient address is configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      ...(msg.attachments?.length
        ? {
            attachments: msg.attachments.map((a) => ({
              filename: a.filename,
              content: a.content.toString("base64"),
            })),
          }
        : {}),
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    // Resend error bodies describe the problem; they never echo the API key.
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    throw new Error(`Resend responded ${res.status}${detail ? `: ${detail}` : ""}`);
  }
  return { mode: "resend" };
}
