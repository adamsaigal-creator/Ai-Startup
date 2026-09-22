import "server-only";

/**
 * In-memory brute-force protection for the admin login form. Deliberately
 * simple (no Redis/external store): this is a single-admin, low-traffic
 * internal tool, and the deployment target (docs/DEPLOYMENT.md) runs PM2
 * in fork mode (one Node process), so a single in-memory Map is genuinely
 * shared across every request. It resets on process restart and would NOT
 * be shared across multiple PM2 cluster instances - fine for this app's
 * actual traffic/threat profile, but worth knowing if that ever changes
 * (see the Phase 4K report).
 *
 * Keyed by client IP (from X-Forwarded-For, set by Nginx in production) -
 * never by username, since there is only one username and keying by it
 * alone would let an attacker lock out the real admin just by failing
 * repeatedly from anywhere.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // failures older than this don't count
const LOCKOUT_MS = 15 * 60 * 1000; // temporary, not permanent - see the module doc above

type Bucket = { failures: number; windowStartedAt: number; lockedUntil: number | null };

const buckets = new Map<string, Bucket>();

/** Bounds memory if this ever saw heavy scanning traffic - opportunistic,
 * not scheduled, since a low-traffic admin login doesn't need a timer. */
function evictStale(now: number) {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    const expired = bucket.lockedUntil ? now > bucket.lockedUntil : now - bucket.windowStartedAt > WINDOW_MS;
    if (expired) buckets.delete(key);
  }
}

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function checkLoginRateLimit(key: string): RateLimitResult {
  const bucket = buckets.get(key);
  if (!bucket?.lockedUntil) return { allowed: true };
  const now = Date.now();
  if (now >= bucket.lockedUntil) {
    buckets.delete(key);
    return { allowed: true };
  }
  return { allowed: false, retryAfterSeconds: Math.ceil((bucket.lockedUntil - now) / 1000) };
}

export function recordFailedLogin(key: string): void {
  const now = Date.now();
  evictStale(now);
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStartedAt > WINDOW_MS) {
    buckets.set(key, { failures: 1, windowStartedAt: now, lockedUntil: null });
    return;
  }
  bucket.failures += 1;
  if (bucket.failures >= MAX_ATTEMPTS) {
    bucket.lockedUntil = now + LOCKOUT_MS;
  }
}

export function clearLoginAttempts(key: string): void {
  buckets.delete(key);
}

/** The left-most entry in X-Forwarded-For is the original client, as set
 * by Nginx's `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for`
 * (see docs/DEPLOYMENT.md) when there's no further proxy chain upstream of
 * it. Falls back to a single shared bucket when the header is absent
 * (local dev without Nginx in front) - acceptable there since it's not the
 * production threat model this exists for. */
export function clientKeyFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}
