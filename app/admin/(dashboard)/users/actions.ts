"use server";

import "server-only";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAuthenticated, readSessionCookie, clearSessionCookie } from "@/lib/auth/cookies";
import {
  getSessionRecordByToken,
  deleteAllSessionsExcept,
  deleteAllSessions,
} from "@/lib/auth/session";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

/** Logs out every session except the one making this request - safe to
 * run from the admin's own current session, since it's explicitly
 * excluded. Useful after e.g. signing in from a shared or borrowed
 * device and forgetting to log out. */
export async function revokeOtherSessionsAction(): Promise<ActionResult<{ revoked: number }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const token = await readSessionCookie();
  const current = await getSessionRecordByToken(token);
  if (!current) {
    return { ok: false, error: "Could not identify your current session." };
  }
  const revoked = await deleteAllSessionsExcept(current.id);
  revalidatePath("/admin/users");
  return { ok: true, data: { revoked } };
}

/** Logs out every session, including the one making this request. Ends
 * with a redirect to /admin/login, since the caller's own session no
 * longer exists after this runs. */
export async function revokeAllSessionsAction(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
  await deleteAllSessions();
  await clearSessionCookie();
  redirect("/admin/login");
}
