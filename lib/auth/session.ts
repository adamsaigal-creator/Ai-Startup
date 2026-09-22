import "server-only";
import { randomBytes, createHmac } from "crypto";
import { prisma } from "@/lib/db/client";
import { ADMIN_SESSION_DURATION_MS } from "./config";

/**
 * HMAC-SHA256 keyed with ADMIN_SESSION_SECRET, rather than a plain hash -
 * this gives the secret a real job: a database-only leak of tokenHash
 * values can't be used to forge a valid cookie without also knowing the
 * secret, and rotating ADMIN_SESSION_SECRET instantly invalidates every
 * existing session (a cheap "log everyone out" incident-response lever).
 */
function hashToken(token: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return createHmac("sha256", secret).update(token).digest("hex");
}

/**
 * Creates a new server-side session row and returns the raw token to store
 * in the client's cookie. Only the token's SHA-256 hash is persisted - the
 * raw token itself is never written to the database.
 *
 * Framework-agnostic (no next/headers dependency) so it can be called both
 * from Server Actions and from proxy.ts, which use different cookie APIs.
 */
export async function createSessionToken(): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_MS);
  await prisma.adminSession.create({
    data: { tokenHash: hashToken(token), expiresAt },
  });
  return { token, expiresAt };
}

/** Verifies a raw session token against the database. Opportunistically
 * deletes the row if it has expired, so expired sessions don't linger. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const tokenHash = hashToken(token);
  const session = await prisma.adminSession.findUnique({ where: { tokenHash } });
  if (!session) return false;
  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.delete({ where: { tokenHash } }).catch(() => {});
    return false;
  }
  return true;
}

/** Deletes a session row by its raw token - a real, immediate logout, not
 * just discarding the cookie client-side. */
export async function destroySessionToken(token: string | undefined | null): Promise<void> {
  if (!token) return;
  await prisma.adminSession.delete({ where: { tokenHash: hashToken(token) } }).catch(() => {});
}

export type SessionRecord = { id: string; createdAt: Date; expiresAt: Date };

/** Looks up the AdminSession row for the current cookie's raw token -
 * used by /admin/users to show "this is your current session" and to
 * exclude it from a "log out other sessions" action. Returns null for a
 * missing/expired/invalid token (mirrors verifySessionToken's checks)
 * rather than throwing, since callers use this for display, not as a
 * security gate - isAuthenticated()/proxy.ts remain the actual gate. */
export async function getSessionRecordByToken(token: string | undefined | null): Promise<SessionRecord | null> {
  if (!token) return null;
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: hashToken(token) },
    select: { id: true, createdAt: true, expiresAt: true },
  });
  if (!session || session.expiresAt <= new Date()) return null;
  return session;
}

/** Counts only non-expired sessions - expired rows may still be sitting
 * in the table until their next verification attempt opportunistically
 * deletes them (see verifySessionToken), so a raw count() would overstate
 * how many sessions are actually active. */
export async function countActiveSessions(): Promise<number> {
  return prisma.adminSession.count({ where: { expiresAt: { gt: new Date() } } });
}

/** Deletes every session row except the one given - "log out everywhere
 * else," safe to run from the session doing the logging-out since it
 * never touches its own row. */
export async function deleteAllSessionsExcept(currentSessionId: string): Promise<number> {
  const result = await prisma.adminSession.deleteMany({ where: { id: { not: currentSessionId } } });
  return result.count;
}

/** Deletes every session row, including the caller's own - a real "log
 * out everywhere," which also ends the current session (the caller must
 * clear its own cookie and redirect to login afterward). */
export async function deleteAllSessions(): Promise<number> {
  const result = await prisma.adminSession.deleteMany({});
  return result.count;
}
