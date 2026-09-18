"use client";

import { useMemo, useState } from "react";
import type { MediaPickerItem } from "@/lib/media/picker";

// Reusable media-selection foundation (Phase 4F). Future editors -
// Neighbourhoods, Team/Realtor photos, Blog images, Listing images, and
// eventually the standard pages' own image fields - can drop this in as a
// visual alternative to the plain-text ImageField datalist introduced in
// Phase 4E, without duplicating picker UI six more times. It is data-in /
// callback-out: the caller (a Server Component) loads media rows with
// lib/media/picker.ts's getMediaForPicker() and passes them down, and this
// component only ever reports back the chosen storagePath string - it
// never talks to Prisma itself.
//
// Not wired into any editor yet, per Phase 4F's scope - see the Phase 4F
// report for how a future editor would adopt it.

const overlayButtonStyle = {
  padding: "10px 18px",
  background: "oklch(23% 0.012 60)",
  color: "oklch(99% 0.004 90)",
  border: "none",
  borderRadius: "4px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
} as const;

export function MediaPicker({
  label = "Image",
  value,
  onChange,
  media,
}: {
  label?: string;
  value: string;
  onChange: (storagePath: string) => void;
  media: MediaPickerItem[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return media;
    return media.filter(
      (item) => item.filename.toLowerCase().includes(q) || (item.altText ?? "").toLowerCase().includes(q)
    );
  }, [media, search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
      <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>{label}</span>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "4px", border: "1px solid oklch(85% 0.012 70)", flexShrink: 0 }}
          />
        ) : null}
        <button type="button" onClick={() => setOpen(true)} style={overlayButtonStyle}>
          Choose from Media Library
        </button>
        {value && <span style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", wordBreak: "break-all" }}>{value}</span>}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose media"
          style={{
            position: "fixed",
            inset: 0,
            background: "oklch(20% 0 0 / 0.45)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "oklch(99% 0.004 90)",
              borderRadius: "6px",
              padding: "20px",
              width: "min(800px, 100%)",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search media…"
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "1px solid oklch(85% 0.012 70)",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ ...overlayButtonStyle, background: "transparent", color: "oklch(35% 0.015 60)", border: "1px solid oklch(80% 0.012 70)" }}
              >
                Close
              </button>
            </div>
            <div style={{ overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "10px" }}>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChange(item.storagePath);
                    setOpen(false);
                  }}
                  title={item.filename}
                  style={{
                    padding: 0,
                    cursor: "pointer",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: item.storagePath === value ? "2px solid oklch(58% 0.16 45)" : "1px solid oklch(88% 0.012 70)",
                    background: "none",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.storagePath} alt={item.altText ?? ""} style={{ width: "100%", height: "90px", objectFit: "cover", display: "block" }} />
                </button>
              ))}
              {filtered.length === 0 && (
                <p style={{ gridColumn: "1 / -1", fontSize: "13px", color: "oklch(52% 0.02 60)", padding: "20px 0", textAlign: "center" }}>
                  No media found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
