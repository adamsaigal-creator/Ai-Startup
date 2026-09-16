import "server-only";
import { timingSafeEqual } from "crypto";
import { verifyAdminPassword } from "./password";

/** Constant-time string comparison so a wrong-length or wrong-content
 * username can't be distinguished by response timing. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA); // keep the failure path's cost similar
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Checks a username/password pair against ADMIN_USERNAME and
 * ADMIN_PASSWORD_HASH. This is the single place credentials are checked -
 * always server-side, never from client JavaScript. */
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  if (!expectedUsername) {
    throw new Error("ADMIN_USERNAME is not set");
  }
  const usernameOk = safeEqual(username, expectedUsername);
  const passwordOk = await verifyAdminPassword(password);
  return usernameOk && passwordOk;
}
