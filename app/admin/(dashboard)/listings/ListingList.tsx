"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ListingListRow = {
  id: string;
  address: string;
  city: string;
  propertyType: string | null;
  price: number | null;
  status: string;
  featured: boolean;
  image: string | null;
  updatedAtLabel: string;
};

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid oklch(85% 0.012 70)",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "var(--font-work-sans), sans-serif",
  background: "oklch(99% 0.004 90)",
} as const;

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  pending: "Pending",
  sold: "Sold",
  inactive: "Inactive",
};

function StatusBadge({ status }: { status: string }) {
  const live = status === "published";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 9px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        background: live ? "oklch(94% 0.03 145)" : "oklch(93% 0.008 70)",
        color: live ? "oklch(38% 0.1 145)" : "oklch(48% 0.015 60)",
        whiteSpace: "nowrap",
      }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function formatPrice(price: number | null): string {
  return price ? `$${price.toLocaleString()}` : "Price on request";
}

export function ListingList({ initialItems }: { initialItems: ListingListRow[] }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [status, setStatus] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const cities = useMemo(() => Array.from(new Set(initialItems.map((l) => l.city))).sort(), [initialItems]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialItems.filter((l) => {
      if (city !== "all" && l.city !== city) return false;
      if (status !== "all" && l.status !== status) return false;
      if (featuredFilter === "featured" && !l.featured) return false;
      if (featuredFilter === "not-featured" && l.featured) return false;
      if (!q) return true;
      return l.address.toLowerCase().includes(q) || (l.propertyType ?? "").toLowerCase().includes(q);
    });
  }, [initialItems, search, city, status, featuredFilter]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
            Listings
          </h1>
          <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: 0, maxWidth: "620px" }}>
            {initialItems.length} listing{initialItems.length === 1 ? "" : "s"}. These are manually curated sample
            listings, not a live MLS/IDX feed - addresses and photos are placeholders until replaced with real
            listing data.
          </p>
        </div>
        <Link
          href="/admin/listings/new"
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
          + New Listing
        </Link>
      </div>

      <div style={{ display: "flex", gap: "12px", margin: "20px 0", flexWrap: "wrap" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by address or property type…"
          style={{ ...inputStyle, flex: 1, maxWidth: "300px" }}
        />
        <select value={city} onChange={(e) => setCity(e.target.value)} style={{ ...inputStyle, minWidth: "140px" }}>
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, minWidth: "140px" }}>
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select value={featuredFilter} onChange={(e) => setFeaturedFilter(e.target.value)} style={{ ...inputStyle, minWidth: "140px" }}>
          <option value="all">Featured &amp; Not</option>
          <option value="featured">Featured Only</option>
          <option value="not-featured">Not Featured</option>
        </select>
      </div>

      <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: "0 0 12px" }}>
        {filtered.length} of {initialItems.length}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((listing) => (
          <Link
            key={listing.id}
            href={`/admin/listings/${listing.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 16px",
              border: "1px solid oklch(90% 0.012 70)",
              borderRadius: "4px",
              background: "oklch(99% 0.004 90)",
              textDecoration: "none",
              color: "oklch(23% 0.012 60)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.image || "/uploads/sraa.png"}
              alt=""
              style={{ width: "64px", height: "48px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>{listing.address}</div>
              <div style={{ fontSize: "12px", color: "oklch(52% 0.02 60)" }}>
                {listing.city}
                {listing.propertyType ? ` · ${listing.propertyType}` : ""}
              </div>
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, width: "110px" }}>{formatPrice(listing.price)}</div>
            <div style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", width: "100px" }}>Updated {listing.updatedAtLabel}</div>
            {listing.featured && (
              <span style={{ fontSize: "11px", fontWeight: 600, color: "oklch(58% 0.16 45)", whiteSpace: "nowrap" }}>★ Featured</span>
            )}
            <StatusBadge status={listing.status} />
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ padding: "30px", textAlign: "center", fontSize: "13px", color: "oklch(52% 0.02 60)", border: "1px solid oklch(90% 0.012 70)", borderRadius: "4px" }}>
            No listings match your search.
          </p>
        )}
      </div>
    </div>
  );
}
