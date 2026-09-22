"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { updatePageSeoAction } from "./actions";

export type SeoRow = {
  key: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** Link to a dedicated content editor that already has its own SEO
   * fields. Mutually exclusive with inlineSlug. */
  editHref?: string;
  /** Page slug for records with no dedicated editor - renders an inline
   * quick-edit for just seoTitle/seoDescription instead of a link. */
  inlineSlug?: string;
};

const TITLE_SOFT_MAX = 60;
const DESCRIPTION_SOFT_MAX = 160;

const inputStyle = {
  padding: "8px 10px",
  border: "1px solid oklch(85% 0.012 70)",
  borderRadius: "4px",
  fontSize: "13px",
  fontFamily: "var(--font-work-sans), sans-serif",
  background: "oklch(99% 0.004 90)",
  width: "100%",
  boxSizing: "border-box",
} as const;

function isMissing(value: string): boolean {
  return value.trim() === "";
}

function CharCount({ value, softMax }: { value: string; softMax: number }) {
  const len = value.length;
  const over = len > softMax;
  return (
    <span style={{ fontSize: "11px", color: over ? "oklch(58% 0.16 45)" : "oklch(55% 0.02 60)" }}>
      {len} / {softMax} characters{over ? " (longer than recommended)" : ""}
    </span>
  );
}

function MissingBadge() {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        background: "oklch(94% 0.05 45)",
        color: "oklch(45% 0.16 45)",
      }}
    >
      Missing
    </span>
  );
}

function SeoRowView({ row }: { row: SeoRow }) {
  const [editing, setEditing] = useState(false);
  const [seoTitle, setSeoTitle] = useState(row.seoTitle);
  const [seoDescription, setSeoDescription] = useState(row.seoDescription);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSave() {
    if (!row.inlineSlug) return;
    setStatus("saving");
    setError("");
    const result = await updatePageSeoAction(row.inlineSlug, { seoTitle, seoDescription });
    if (result.ok) {
      setStatus("saved");
      setEditing(false);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <div
      data-testid={`seo-row-${row.key}`}
      style={{ padding: "14px 16px", border: "1px solid oklch(90% 0.012 70)", borderRadius: "4px", background: "oklch(99% 0.004 90)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600 }}>{row.title}</span>
        {row.editHref && (
          <Link href={row.editHref} style={{ fontSize: "12px", fontWeight: 600, color: "oklch(58% 0.16 45)", whiteSpace: "nowrap" }}>
            Edit Full Page →
          </Link>
        )}
        {row.inlineSlug && !editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            style={{ fontSize: "12px", fontWeight: 600, color: "oklch(58% 0.16 45)", background: "none", border: "none", cursor: "pointer", padding: 0, whiteSpace: "nowrap" }}
          >
            Edit SEO →
          </button>
        )}
      </div>

      {editing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "oklch(35% 0.015 60)" }}>SEO Title</span>
            <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} style={inputStyle} />
            <CharCount value={seoTitle} softMax={TITLE_SOFT_MAX} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Meta Description</span>
            <textarea rows={2} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
            <CharCount value={seoDescription} softMax={DESCRIPTION_SOFT_MAX} />
          </label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              onClick={handleSave}
              disabled={status === "saving"}
              style={{
                padding: "7px 14px",
                background: "oklch(23% 0.012 60)",
                color: "oklch(99% 0.004 90)",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: status === "saving" ? "default" : "pointer",
              }}
            >
              {status === "saving" ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSeoTitle(row.seoTitle);
                setSeoDescription(row.seoDescription);
                setEditing(false);
                setStatus("idle");
              }}
              style={{ padding: "7px 14px", background: "transparent", border: "1px solid oklch(80% 0.012 70)", borderRadius: "4px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
            >
              Cancel
            </button>
            {status === "error" && <span style={{ fontSize: "12px", color: "oklch(55% 0.2 25)" }}>{error}</span>}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(52% 0.02 60)", marginBottom: "3px" }}>
              SEO Title
            </div>
            {isMissing(row.seoTitle) ? (
              <MissingBadge />
            ) : (
              <>
                <div style={{ fontSize: "13px", color: "oklch(30% 0.015 60)" }}>{row.seoTitle}</div>
                <CharCount value={row.seoTitle} softMax={TITLE_SOFT_MAX} />
              </>
            )}
          </div>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(52% 0.02 60)", marginBottom: "3px" }}>
              Meta Description
            </div>
            {isMissing(row.seoDescription) ? (
              <MissingBadge />
            ) : (
              <>
                <div style={{ fontSize: "13px", color: "oklch(30% 0.015 60)" }}>{row.seoDescription}</div>
                <CharCount value={row.seoDescription} softMax={DESCRIPTION_SOFT_MAX} />
              </>
            )}
          </div>
        </div>
      )}
      {status === "saved" && !editing && <p style={{ fontSize: "12px", color: "oklch(50% 0.14 145)", margin: "8px 0 0" }}>Saved — the public page now reflects this change.</p>}
    </div>
  );
}

export function SeoDashboard({ sections }: { sections: { label: string; rows: SeoRow[] }[] }) {
  const [search, setSearch] = useState("");
  const [missingOnly, setMissingOnly] = useState(false);

  const allRows = useMemo(() => sections.flatMap((s) => s.rows), [sections]);
  const missingTitleCount = allRows.filter((r) => isMissing(r.seoTitle)).length;
  const missingDescCount = allRows.filter((r) => isMissing(r.seoDescription)).length;

  const filteredSections = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sections.map((section) => ({
      ...section,
      rows: section.rows.filter((r) => {
        if (missingOnly && !isMissing(r.seoTitle) && !isMissing(r.seoDescription)) return false;
        if (!q) return true;
        return r.title.toLowerCase().includes(q);
      }),
    }));
  }, [sections, search, missingOnly]);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        SEO
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 20px", maxWidth: "640px" }}>
        Overview of the SEO title and meta description already stored on every page, neighbourhood, and blog post.
        This isn&apos;t a separate SEO record - editing here (or in a page&apos;s own editor) writes to the exact
        same PostgreSQL columns.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
        <StatCard label="Total Records" value={String(allRows.length)} />
        <StatCard label="Missing SEO Title" value={String(missingTitleCount)} warn={missingTitleCount > 0} />
        <StatCard label="Missing Meta Description" value={String(missingDescCount)} warn={missingDescCount > 0} />
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title…"
          style={{ ...inputStyle, maxWidth: "280px" }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
          <input type="checkbox" checked={missingOnly} onChange={(e) => setMissingOnly(e.target.checked)} />
          Show only records missing SEO title or description
        </label>
      </div>

      {filteredSections.map((section) => (
        <details key={section.label} open={section.label !== "Neighbourhoods"} style={{ marginBottom: "20px" }}>
          <summary
            style={{
              cursor: "pointer",
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontSize: "19px",
              fontWeight: 600,
              padding: "8px 0",
            }}
          >
            {section.label} ({section.rows.length})
          </summary>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px", maxHeight: section.label === "Neighbourhoods" ? "700px" : undefined, overflowY: section.label === "Neighbourhoods" ? "auto" : undefined }}>
            {section.rows.map((row) => (
              <SeoRowView key={row.key} row={row} />
            ))}
            {section.rows.length === 0 && (
              <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", padding: "16px", textAlign: "center" }}>No records match.</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

function StatCard({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div
      style={{
        background: "oklch(99% 0.004 90)",
        border: "1px solid oklch(89% 0.012 70)",
        borderRadius: "4px",
        padding: "14px 20px",
        minWidth: "150px",
      }}
    >
      <div style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(52% 0.02 60)" }}>{label}</div>
      <div
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "26px",
          fontWeight: 600,
          marginTop: "4px",
          color: warn ? "oklch(55% 0.2 25)" : "oklch(58% 0.16 45)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
