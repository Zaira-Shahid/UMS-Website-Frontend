/**
 * Helpers shared by the /api form routes. Server-only.
 */
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { extensionOf, validateUpload, type UploadRules } from "@/lib/forms/schemas";
import { clientIp, rateLimit } from "./rate-limit";

export const json = (body: unknown, status = 200, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/** Browser callers must come from this site. Non-browser callers send no Origin and fall through to the rate limit. */
function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

export interface GuardOptions {
  /** Short name used to keep one bucket per route and IP. */
  route: string;
  max: number;
  windowMs: number;
  /** Reject bodies larger than this (from Content-Length). */
  maxBytes: number;
}

/** Origin check, body-size cap and per-IP rate limit. Returns a Response to send, or null to continue. */
export function guard(req: Request, o: GuardOptions): Response | null {
  if (!originAllowed(req)) {
    return json({ ok: false, error: "Request origin not allowed." }, 403);
  }
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > o.maxBytes) {
    return json({ ok: false, error: "The submission is too large. Please reduce the file sizes." }, 413);
  }
  const limited = rateLimit(`${o.route}:${clientIp(req.headers)}`, { max: o.max, windowMs: o.windowMs });
  if (!limited.ok) {
    return json(
      {
        ok: false,
        kind: "rate",
        retryAfter: limited.retryAfter,
        error: `Too many submissions. Please try again in ${Math.ceil(limited.retryAfter / 60)} minute(s).`,
      },
      429,
      { "Retry-After": String(limited.retryAfter) },
    );
  }
  return null;
}

/** Calendar date used in references. UMS operates in Pakistan, so it is the Asia/Karachi day, not the UTC day. */
const karachiDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Karachi",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Reference like UMS-RFQ-20261124-K7M2 (unambiguous alphabet, unbiased: 32 symbols per byte & 31). */
export function makeReference(prefix: string, now = new Date()): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const day = karachiDay.format(now).replaceAll("-", ""); // en-CA formats as YYYY-MM-DD
  const suffix = [...randomBytes(4)].map((b) => alphabet[b & 31]).join("");
  return `UMS-${prefix}-${day}-${suffix}`;
}

export interface UploadedFile {
  filename: string;
  content: Buffer;
}

/** A file's first bytes must match its extension, so a renamed .exe is not accepted as a PDF. */
function signatureMatches(ext: string, b: Buffer): boolean {
  switch (ext) {
    case ".pdf":
      return b.subarray(0, 5).toString("latin1") === "%PDF-";
    case ".zip":
      return b[0] === 0x50 && b[1] === 0x4b && [0x03, 0x05, 0x07].includes(b[2]) && [0x04, 0x06, 0x08].includes(b[3]);
    case ".dwg":
      return /^AC[0-9]/.test(b.subarray(0, 3).toString("latin1"));
    default:
      return false;
  }
}

/** Strip path parts and odd characters from a client-supplied file name. */
const safeFilename = (name: string) =>
  name.replace(/^.*[\\/]/, "").replace(/[^\w.\- ()]/g, "_").slice(0, 120) || "file";

/** Read and validate the uploaded files in a multipart field. */
export async function readUploads(
  fd: FormData,
  field: string,
  rules: UploadRules,
): Promise<{ files: UploadedFile[]; error?: string }> {
  const entries = fd.getAll(field).filter((v): v is File => typeof v !== "string" && v.size > 0);
  if (entries.length > rules.maxFiles) {
    return { files: [], error: `Attach at most ${rules.maxFiles} file${rules.maxFiles > 1 ? "s" : ""}.` };
  }
  const files: UploadedFile[] = [];
  for (const f of entries) {
    const problem = validateUpload(f, rules);
    if (problem) return { files: [], error: problem };
    const content = Buffer.from(await f.arrayBuffer());
    if (!signatureMatches(extensionOf(f.name), content)) {
      return { files: [], error: `${safeFilename(f.name)} does not look like a valid ${extensionOf(f.name).slice(1).toUpperCase()} file.` };
    }
    files.push({ filename: safeFilename(f.name), content });
  }
  return { files };
}

/** Honeypot: a hidden field that humans never fill. Any value marks the submission as a bot. */
export const honeypotTripped = (value: unknown) => typeof value === "string" && value.trim() !== "";

/** Never expose internals: log the real error server-side, return a generic message. */
export function logServerError(scope: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[${scope}] delivery failed: ${message}`);
}
