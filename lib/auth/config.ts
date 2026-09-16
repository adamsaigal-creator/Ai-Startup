import "server-only";

export const ADMIN_SESSION_COOKIE = "admin_session";

/** Fixed session lifetime - no sliding renewal in this foundation phase.
 * Signing back in after expiry is the only way to extend a session. */
export const ADMIN_SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours
