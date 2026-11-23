/** Browser-side helpers shared by the RFQ, contact and careers forms. */

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; kind: "validation"; errors: Record<string, string> }
  | { ok: false; kind: "rate"; message: string }
  | { ok: false; kind: "error"; message: string };

const GENERIC = "Something went wrong sending your submission. Please try again.";

/** POST a JSON object or FormData and normalise every outcome into a SubmitResult. */
export async function submitForm(url: string, body: FormData | Record<string, unknown>): Promise<SubmitResult> {
  try {
    const isForm = body instanceof FormData;
    const res = await fetch(url, {
      method: "POST",
      headers: isForm ? undefined : { "Content-Type": "application/json" },
      body: isForm ? body : JSON.stringify(body),
    });
    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      reference?: string;
      kind?: string;
      errors?: Record<string, string>;
      error?: string;
    } | null;

    if (res.ok && data?.ok && data.reference) return { ok: true, reference: data.reference };
    if (res.status === 400 && data?.errors) return { ok: false, kind: "validation", errors: data.errors };
    if (res.status === 429) return { ok: false, kind: "rate", message: data?.error ?? "Too many submissions. Please try again shortly." };
    return { ok: false, kind: "error", message: data?.error ?? GENERIC };
  } catch {
    return { ok: false, kind: "error", message: "We could not reach the server. Check your connection and try again." };
  }
}

/** Safe localStorage access: private windows and blocked storage throw, so never let that break a form. */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable — the draft simply is not saved */
    }
  },
  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
