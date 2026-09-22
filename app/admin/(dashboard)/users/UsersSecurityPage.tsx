"use client";

import { useState } from "react";
import { revokeAllSessionsAction, revokeOtherSessionsAction } from "./actions";

const cardStyle = {
  background: "oklch(99% 0.004 90)",
  border: "1px solid oklch(89% 0.012 70)",
  borderRadius: "4px",
  padding: "20px 22px",
} as const;

const codeStyle = {
  display: "block",
  padding: "10px 14px",
  background: "oklch(21% 0.045 260)",
  color: "oklch(90% 0.02 90)",
  borderRadius: "4px",
  fontSize: "12.5px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  overflowX: "auto",
  margin: "6px 0",
} as const;

export function UsersSecurityPage({
  adminUsername,
  sessionDurationLabel,
  activeSessionCount,
  currentSession,
}: {
  adminUsername: string;
  sessionDurationLabel: string;
  activeSessionCount: number;
  currentSession: { createdAtLabel: string; expiresAtLabel: string } | null;
}) {
  const [revokeStatus, setRevokeStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [revokeMessage, setRevokeMessage] = useState("");

  async function handleRevokeOthers() {
    setRevokeStatus("working");
    setRevokeMessage("");
    const result = await revokeOtherSessionsAction();
    if (result.ok) {
      setRevokeStatus("done");
      setRevokeMessage(
        result.data.revoked > 0
          ? `Logged out ${result.data.revoked} other session${result.data.revoked === 1 ? "" : "s"}.`
          : "No other sessions were active."
      );
    } else {
      setRevokeStatus("error");
      setRevokeMessage(result.error);
    }
  }

  function handleRevokeAllClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!window.confirm("Log out every admin session, including this one? You'll need to sign in again.")) {
      e.preventDefault();
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        Users
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px", maxWidth: "640px" }}>
        There is a single admin identity, configured through environment variables - not a database of user
        accounts. This page shows session/security information and never displays your password hash, session
        tokens, the session secret, or database credentials.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "28px" }}>
        <div style={{ ...cardStyle, minWidth: "150px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(52% 0.02 60)" }}>
            Admin Username
          </div>
          <div style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: 600, marginTop: "6px" }}>
            {adminUsername}
          </div>
        </div>
        <div style={{ ...cardStyle, minWidth: "150px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(52% 0.02 60)" }}>
            Session Duration
          </div>
          <div style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: 600, marginTop: "6px" }}>
            {sessionDurationLabel}
          </div>
        </div>
        <div style={{ ...cardStyle, minWidth: "150px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(52% 0.02 60)" }}>
            Active Sessions
          </div>
          <div style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: 600, marginTop: "6px", color: "oklch(58% 0.16 45)" }}>
            {activeSessionCount}
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, marginBottom: "20px" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 14px", color: "oklch(35% 0.015 60)" }}>
          Current Session
        </h2>
        {currentSession ? (
          <div style={{ fontSize: "14px", color: "oklch(30% 0.015 60)", display: "flex", flexDirection: "column", gap: "4px" }}>
            <span>Signed in: {currentSession.createdAtLabel}</span>
            <span>Expires: {currentSession.expiresAtLabel}</span>
          </div>
        ) : (
          <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: 0 }}>Could not identify the current session.</p>
        )}
      </div>

      <div style={{ ...cardStyle, marginBottom: "20px" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 6px", color: "oklch(35% 0.015 60)" }}>
          Session Management
        </h2>
        <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: "0 0 16px" }}>
          Useful if you signed in from a device you no longer have, or want to be sure nothing else is still logged
          in.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={handleRevokeOthers}
            disabled={revokeStatus === "working"}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: "oklch(35% 0.015 60)",
              border: "1px solid oklch(80% 0.012 70)",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: revokeStatus === "working" ? "default" : "pointer",
            }}
          >
            {revokeStatus === "working" ? "Working…" : "Log Out Other Sessions"}
          </button>
          <form action={revokeAllSessionsAction}>
            <button
              type="submit"
              onClick={handleRevokeAllClick}
              style={{
                padding: "10px 18px",
                background: "transparent",
                color: "oklch(55% 0.2 25)",
                border: "1px solid oklch(80% 0.05 25)",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Log Out All Sessions (Including This One)
            </button>
          </form>
        </div>
        {revokeMessage && (
          <p style={{ fontSize: "13px", marginTop: "12px", color: revokeStatus === "error" ? "oklch(55% 0.2 25)" : "oklch(50% 0.14 145)" }}>
            {revokeMessage}
          </p>
        )}
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 6px", color: "oklch(35% 0.015 60)" }}>
          Changing the Admin Password or Username
        </h2>
        <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: "0 0 12px", maxWidth: "620px" }}>
          There&apos;s no in-admin password change yet - the password hash and username are read from environment
          variables at server startup, so a change here couldn&apos;t be saved anywhere the server would pick it up
          without a redeploy anyway. To change them:
        </p>
        <ol style={{ fontSize: "13px", color: "oklch(30% 0.015 60)", lineHeight: "1.9", paddingLeft: "20px", margin: "0 0 12px" }}>
          <li>
            Generate a new password hash:
            <code style={codeStyle}>npx tsx scripts/hash-password.ts &quot;your-new-password&quot;</code>
          </li>
          <li>
            Copy the printed <code>ADMIN_PASSWORD_HASH_B64=&quot;...&quot;</code> line into your environment
            configuration (<code>.env</code> locally, or your host&apos;s environment variable settings in
            production).
          </li>
          <li>
            To change the username too, set <code>ADMIN_USERNAME</code> to the new value in the same place.
          </li>
          <li>Restart the app so it picks up the new environment variables.</li>
          <li>Sign back in with the new credentials - this also invalidates any existing sessions.</li>
        </ol>
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          See the Phase 4J report for why an in-admin password-change form isn&apos;t built here, and what a safe
          version of one would look like.
        </p>
      </div>
    </div>
  );
}
