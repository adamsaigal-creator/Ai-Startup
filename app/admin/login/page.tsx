import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/cookies";
import { loginAction } from "../actions";

export const metadata: Metadata = {
  title: "Admin Login — Saigal Realty",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  // Authoritative check (in addition to proxy.ts's own redirect) - an
  // already-authenticated visitor never sees the login form.
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  const { error, retry } = await searchParams;
  const retrySeconds = Array.isArray(retry) ? retry[0] : retry;
  const retryMinutes = retrySeconds ? Math.max(1, Math.ceil(Number(retrySeconds) / 60)) : null;

  return (
    <div
      style={{
        fontFamily: "var(--font-work-sans), sans-serif",
        color: "oklch(23% 0.012 60)",
        background: "oklch(97% 0.012 75)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "oklch(99% 0.004 90)",
          borderRadius: "4px",
          boxShadow: "0 10px 30px oklch(20% 0.01 60 / 0.08)",
          padding: "40px 36px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant-garamond), serif",
            fontSize: "26px",
            fontWeight: "600",
            margin: "0 0 8px",
            textAlign: "center",
          }}
        >
          Saigal Realty Admin
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "oklch(46% 0.02 60)",
            textAlign: "center",
            margin: "0 0 28px",
          }}
        >
          Sign in to continue
        </p>

        {error === "rate_limited" ? (
          <p
            role="alert"
            style={{
              fontSize: "13px",
              color: "oklch(55% 0.2 25)",
              background: "oklch(93% 0.05 25)",
              borderRadius: "2px",
              padding: "10px 14px",
              margin: "0 0 20px",
            }}
          >
            Too many failed attempts. Please try again in about {retryMinutes ?? 15} minute{retryMinutes === 1 ? "" : "s"}.
          </p>
        ) : error ? (
          <p
            role="alert"
            style={{
              fontSize: "13px",
              color: "oklch(55% 0.2 25)",
              background: "oklch(93% 0.05 25)",
              borderRadius: "2px",
              padding: "10px 14px",
              margin: "0 0 20px",
            }}
          >
            Invalid username or password.
          </p>
        ) : null}

        <form
          action={loginAction}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="username" style={{ fontSize: "12px", fontWeight: "600" }}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              style={{
                padding: "12px 14px",
                border: "1px solid oklch(83% 0.015 70)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-work-sans), sans-serif",
                background: "oklch(99% 0.004 90)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="password" style={{ fontSize: "12px", fontWeight: "600" }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={{
                padding: "12px 14px",
                border: "1px solid oklch(83% 0.015 70)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-work-sans), sans-serif",
                background: "oklch(99% 0.004 90)",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "13px 24px",
              background: "oklch(23% 0.012 60)",
              color: "oklch(99% 0.004 90)",
              border: "none",
              borderRadius: "2px",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "0.03em",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
