"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createSessionToken, destroySessionToken } from "@/lib/auth/session";
import { setSessionCookie, clearSessionCookie, readSessionCookie } from "@/lib/auth/cookies";

/**
 * Server Action bound to the login form. Credentials are read from
 * FormData and checked entirely server-side (verifyAdminCredentials) -
 * nothing about the check is ever sent to or run in client JavaScript.
 */
export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const ok = await verifyAdminCredentials(username, password);
  if (!ok) {
    redirect("/admin/login?error=1");
  }

  const { token, expiresAt } = await createSessionToken();
  await setSessionCookie(token, expiresAt);
  redirect("/admin");
}

/** Deletes the session row server-side (real invalidation, not just
 * clearing the cookie) and clears the cookie. */
export async function logoutAction() {
  const token = await readSessionCookie();
  await destroySessionToken(token);
  await clearSessionCookie();
  redirect("/admin/login");
}
