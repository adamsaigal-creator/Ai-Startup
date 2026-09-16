import "server-only";
import { verify } from "@node-rs/argon2";

/**
 * Verifies a plaintext password against ADMIN_PASSWORD_HASH (an Argon2id
 * hash - see the Phase 4B report for how to generate one). The plaintext
 * password only ever exists in memory for the duration of this call; it is
 * never logged, stored, or returned.
 */
export async function verifyAdminPassword(plainPassword: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error("ADMIN_PASSWORD_HASH is not set");
  }
  try {
    return await verify(hash, plainPassword);
  } catch {
    // Malformed hash, algorithm mismatch, etc. - treat as invalid
    // credentials rather than leaking an error to the caller.
    return false;
  }
}
