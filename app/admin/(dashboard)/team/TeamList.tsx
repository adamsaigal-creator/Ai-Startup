"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type TeamListRow = {
  id: string;
  slug: string;
  name: string;
  role: string;
  photo: string | null;
  status: string;
  displayOrder: number;
};

export function TeamList({ initialItems }: { initialItems: TeamListRow[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return initialItems;
    return initialItems.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q));
  }, [initialItems, search]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
            Team
          </h1>
          <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: 0 }}>
            {initialItems.length} team members. Shown in this order on the Homepage carousel and the About page.
          </p>
        </div>
        <Link
          href="/admin/team/new"
          style={{
            padding: "10px 20px",
            background: "oklch(23% 0.012 60)",
            color: "oklch(99% 0.004 90)",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          + Add Team Member
        </Link>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or role…"
        style={{
          padding: "10px 12px",
          border: "1px solid oklch(85% 0.012 70)",
          borderRadius: "4px",
          fontSize: "14px",
          background: "oklch(99% 0.004 90)",
          maxWidth: "320px",
          margin: "20px 0",
          display: "block",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {filtered.map((m) => (
          <Link
            key={m.id}
            href={`/admin/team/${m.id}`}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid oklch(90% 0.012 70)",
              borderRadius: "4px",
              overflow: "hidden",
              textDecoration: "none",
              color: "oklch(23% 0.012 60)",
              background: "oklch(99% 0.004 90)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.photo || "/uploads/sraa.png"}
              alt=""
              style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>{m.name}</span>
              <span style={{ fontSize: "12px", color: "oklch(52% 0.02 60)" }}>{m.role}</span>
              <span
                style={{
                  marginTop: "4px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: m.status === "published" ? "oklch(38% 0.1 145)" : "oklch(48% 0.015 60)",
                }}
              >
                {m.status === "published" ? "Visible" : "Hidden"}
              </span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", gridColumn: "1 / -1", padding: "30px", textAlign: "center" }}>
            No team members match your search.
          </p>
        )}
      </div>
    </div>
  );
}
