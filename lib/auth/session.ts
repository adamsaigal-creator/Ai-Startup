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
