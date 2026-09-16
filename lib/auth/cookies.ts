import "server-only";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "./config";
import { verifySessionToken } from "./session";

const isProduction = process.env.NODE_ENV === "production";

/** Server Actions / Server Components only - cookies() from next/headers
 * requires a request context, which proxy.ts does not share (it uses the
 * NextRequest/NextResponse cookies API directly instead). */
export async function setSessionCookie(token: string, expiresAt: Date) {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/admin",
    expires: expiresAt,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
}

export async function readSessionCookie(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value;
}

/** Authoritative auth check for use inside protected Server Components,
 * in addition to proxy.ts's own check - see the Next.js proxy docs' own
 * warning that a matcher change could silently remove proxy coverage, so
 * each protected page verifies its own session rather than trusting proxy
 * alone. */
export async function isAuthenticated(): Promise<boolean> {
  return verifySessionToken(await readSessionCookie());
}
