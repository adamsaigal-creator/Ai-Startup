import type { Metadata } from "next";
import { readSessionCookie } from "@/lib/auth/cookies";
import { getSessionRecordByToken, countActiveSessions } from "@/lib/auth/session";
import { ADMIN_SESSION_DURATION_MS } from "@/lib/auth/config";
import { UsersSecurityPage } from "./UsersSecurityPage";

export const metadata: Metadata = {
  title: "Users — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

function formatDuration(ms: number): string {
  const hours = ms / (60 * 60 * 1000);
  return Number.isInteger(hours) ? `${hours} hours` : `${(ms / 60000).toFixed(0)} minutes`;
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default async function AdminUsersPage() {
  const token = await readSessionCookie();
  const [current, activeSessionCount] = await Promise.all([
    getSessionRecordByToken(token),
    countActiveSessions(),
  ]);

  return (
    <UsersSecurityPage
      adminUsername={process.env.ADMIN_USERNAME ?? "(not set)"}
      sessionDurationLabel={formatDuration(ADMIN_SESSION_DURATION_MS)}
      activeSessionCount={activeSessionCount}
      currentSession={
        current
          ? { createdAtLabel: dateTimeFormatter.format(current.createdAt), expiresAtLabel: dateTimeFormatter.format(current.expiresAt) }
          : null
      }
    />
  );
}
