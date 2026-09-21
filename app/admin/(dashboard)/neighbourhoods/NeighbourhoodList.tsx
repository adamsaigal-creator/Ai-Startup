"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type NeighbourhoodListRow = {
  id: string;
  slug: string;
  name: string;
  city: string;
  status: string;
  displayOrder: number;
  hasCustomImage: boolean;
  usesGenericFallback: boolean;
};

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid oklch(85% 0.012 70)",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "var(--font-work-sans), sans-serif",
  background: "oklch(99% 0.004 90)",
} as const;

function Badge({ children, tone }: { children: React.ReactNode; tone: "neutral" | "warn" | "muted" }) {
  const colors = {
    neutral: { bg: "oklch(94% 0.03 145)", fg: "oklch(38% 0.1 145)" },
    warn: { bg: "oklch(94% 0.05 45)", fg: "oklch(45% 0.16 45)" },
    muted: { bg: "oklch(93% 0.008 70)", fg: "oklch(48% 0.015 60)" },
  }[tone];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 9px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        background: colors.bg,
        color: colors.fg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function NeighbourhoodList({ initialItems }: { initialItems: NeighbourhoodListRow[] }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");

  const cities = useMemo(() => Array.from(new Set(initialItems.map((n) => n.city))).sort(), [initialItems]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialItems.filter((n) => {
      if (city !== "all" && n.city !== city) return false;
      if (!q) return true;
      return n.name.toLowerCase().includes(q) || n.slug.toLowerCase().includes(q);
    });
  }, [initialItems, search, city]);

  const missingCount = initialItems.filter((n) => n.usesGenericFallback).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
            Neighbourhoods
          </h1>
          <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: 0 }}>
            {initialItems.length} neighbourhoods across {cities.length} cities.
            {missingCount > 0 && (
              <> <strong style={{ color: "oklch(45% 0.16 45)" }}>{missingCount} have no city-specific photo at all</strong> - look for the &quot;No Photo&quot; badge below.</>
            )}
          </p>
        </div>
        <Link
          href="/admin/neighbourhoods/new"
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
          + New Neighbourhood
        </Link>
      </div>

      <div style={{ display: "flex", gap: "12px", margin: "20px 0" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or slug…"
          style={{ ...inputStyle, flex: 1, maxWidth: "320px" }}
        />
        <select value={city} onChange={(e) => setCity(e.target.value)} style={{ ...inputStyle, minWidth: "160px" }}>
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: "0 0 12px" }}>
        {filtered.length} of {initialItems.length}
      </p>

      <div style={{ border: "1px solid oklch(89% 0.012 70)", borderRadius: "4px", overflow: "hidden" }}>
        {filtered.map((n, i) => (
          <Link
            key={n.id}
            href={`/admin/neighbourhoods/${n.slug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "13px 18px",
              borderTop: i === 0 ? "none" : "1px solid oklch(92% 0.01 70)",
              background: "oklch(99% 0.004 90)",
              textDecoration: "none",
              color: "oklch(23% 0.012 60)",
            }}
          >
            <span style={{ flex: 1, fontSize: "14px", fontWeight: 600 }}>{n.name}</span>
            <span style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", width: "120px" }}>{n.city}</span>
            <Badge tone={n.status === "published" ? "neutral" : "muted"}>{n.status}</Badge>
            {n.usesGenericFallback ? (
              <Badge tone="warn">No Photo</Badge>
            ) : n.hasCustomImage ? (
              <Badge tone="neutral">Custom Photo</Badge>
            ) : (
              <Badge tone="muted">City Default</Badge>
            )}
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ padding: "30px", textAlign: "center", fontSize: "13px", color: "oklch(52% 0.02 60)" }}>
            No neighbourhoods match your search.
          </p>
        )}
      </div>
    </div>
  );
}
