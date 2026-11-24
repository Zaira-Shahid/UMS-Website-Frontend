/**
 * In-memory sliding-window rate limiter.
 *
 * Good enough for a single Node process. On serverless or multi-instance hosting
 * each instance keeps its own counters, so the effective limit is looser — swap
 * the Map for a shared store (e.g. Redis/Upstash) if that matters (see README).
 */
interface Limit {
  max: number;
  windowMs: number;
}

type Store = Map<string, number[]>;
const g = globalThis as unknown as { __umsRateLimit?: Store };
// Kept on globalThis so dev hot-reloads do not reset the counters.
const store: Store = (g.__umsRateLimit ??= new Map());

export type RateResult = { ok: true; remaining: number } | { ok: false; retryAfter: number };

export function rateLimit(key: string, { max, windowMs }: Limit, now = Date.now()): RateResult {
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    store.set(key, hits);
    return { ok: false, retryAfter: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)) };
  }
  hits.push(now);
  store.set(key, hits);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t >= windowMs)) store.delete(k);
    }
  }
  return { ok: true, remaining: max - hits.length };
}

/**
 * Best-effort client IP. x-forwarded-for is only trustworthy behind a proxy that
 * sets it; direct callers can spoof it, which only lets them pick their own bucket.
 */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || headers.get("x-real-ip")?.trim() || "unknown";
}
