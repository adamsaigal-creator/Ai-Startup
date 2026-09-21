"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogListRow = {
  id: string;
  slug: string;
  title: string;
  status: string;
  featuredImage: string | null;
  publishedAtLabel: string;
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

function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 9px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        background: published ? "oklch(94% 0.03 145)" : "oklch(93% 0.008 70)",
        color: published ? "oklch(38% 0.1 145)" : "oklch(48% 0.015 60)",
        whiteSpace: "nowrap",
      }}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function BlogList({ initialItems }: { initialItems: BlogListRow[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialItems.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    });
  }, [initialItems, search, statusFilter]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
            Blog
          </h1>
          <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: 0 }}>
            {initialItems.length} post{initialItems.length === 1 ? "" : "s"}.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
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
          + New Post
        </Link>
      </div>

      <div style={{ display: "flex", gap: "12px", margin: "20px 0" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or slug…"
          style={{ ...inputStyle, flex: 1, maxWidth: "320px" }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ ...inputStyle, minWidth: "160px" }}>
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: "0 0 12px" }}>
        {filtered.length} of {initialItems.length}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/admin/blog/${post.slug}`}
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
              src={post.featuredImage || "/uploads/sraa.png"}
              alt=""
              style={{ width: "64px", height: "48px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>{post.title}</div>
              <div style={{ fontSize: "12px", color: "oklch(52% 0.02 60)" }}>/blog/{post.slug}</div>
            </div>
            <div style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", width: "110px" }}>Published {post.publishedAtLabel}</div>
            <div style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", width: "110px" }}>Updated {post.updatedAtLabel}</div>
            <StatusBadge status={post.status} />
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ padding: "30px", textAlign: "center", fontSize: "13px", color: "oklch(52% 0.02 60)", border: "1px solid oklch(90% 0.012 70)", borderRadius: "4px" }}>
            No posts match your search.
          </p>
        )}
      </div>
    </div>
  );
}
