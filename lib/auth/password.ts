import "server-only";
import { verify } from "@node-rs/argon2";

/**
 * Verifies a plaintext password against ADMIN_PASSWORD_HASH_B64 (an
 * Argon2id hash, Base64-encoded - see scripts/hash-password.ts for how to
 * generate one). It's stored Base64-encoded rather than as the raw PHC
 * string because that string's literal `$` delimiters proved unreliable
 * to carry through a .env file unmangled; Base64 has no `$` in its
 * alphabet, so there's nothing for an env loader to misinterpret. The
 * plaintext password only ever exists in memory for the duration of this
 * call; it is never logged, stored, or returned.
 */
export async function verifyAdminPassword(plainPassword: string): Promise<boolean> {
  const encodedHash = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!encodedHash) {
    throw new Error("ADMIN_PASSWORD_HASH_B64 is not set");
  }
  try {
    const hash = Buffer.from(encodedHash, "base64").toString("utf8");
    return await verify(hash, plainPassword);
  } catch {
    // Malformed hash, algorithm mismatch, etc. - treat as invalid
    // credentials rather than leaking an error to the caller.
    return false;
  }
}
