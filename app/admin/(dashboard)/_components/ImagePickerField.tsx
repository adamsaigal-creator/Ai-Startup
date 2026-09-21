"use client";

import { useState } from "react";
import { MediaPicker } from "./MediaPicker";
import type { MediaPickerItem } from "@/lib/media/picker";
import { updateMediaDetailsAction } from "../media/actions";

// Combines the Phase 4F MediaPicker with an inline editor for the
// currently-selected image's own alt text - used by Neighbourhoods and
// Team (Phase 4G), and anywhere else that needs "pick an image, then make
// sure its alt text is right" as one unit. Alt text belongs to the Media
// row itself (not to whatever record references it), so saving it here
// calls the same updateMediaDetailsAction the Media Library page uses -
// there's only one place alt text is ever written.

export function ImagePickerField({
  label = "Image",
  value,
  onChange,
  media,
  emptyHint,
}: {
  label?: string;
  value: string;
  onChange: (storagePath: string) => void;
  media: MediaPickerItem[];
  emptyHint?: string;
}) {
  const selected = media.find((m) => m.storagePath === value);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <MediaPicker label={label} value={value} onChange={onChange} media={media} />
        </div>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              padding: "10px 14px",
              background: "transparent",
              color: "oklch(55% 0.2 25)",
              border: "1px solid oklch(80% 0.05 25)",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Clear
          </button>
        )}
      </div>
      {!value && emptyHint && (
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>{emptyHint}</p>
      )}
      {value && selected && <SelectedImageAltText key={selected.id} item={selected} />}
      {value && !selected && (
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          This image isn&apos;t in the Media Library catalog (a legacy path), so its alt text can&apos;t be edited
          here.
        </p>
      )}
    </div>
  );
}

function SelectedImageAltText({ item }: { item: MediaPickerItem }) {
  const [altText, setAltText] = useState(item.altText ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSave() {
    setStatus("saving");
    setError("");
    const result = await updateMediaDetailsAction(item.id, { altText, caption: item.caption ?? "" });
    if (result.ok) {
      setStatus("saved");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", flex: 1 }}>
        <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Alt Text for This Image</span>
        <input
          type="text"
          value={altText}
          onChange={(e) => {
            setAltText(e.target.value);
            setStatus("idle");
          }}
          placeholder="Describe the image for accessibility"
          style={{
            padding: "8px 10px",
            border: "1px solid oklch(85% 0.012 70)",
            borderRadius: "4px",
            fontSize: "13px",
            background: "oklch(99% 0.004 90)",
          }}
        />
      </label>
      <button
        type="button"
        onClick={handleSave}
        disabled={status === "saving"}
        style={{
          padding: "8px 14px",
          background: "transparent",
          color: "oklch(35% 0.015 60)",
          border: "1px solid oklch(80% 0.012 70)",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 600,
          cursor: status === "saving" ? "default" : "pointer",
        }}
      >
        {status === "saving" ? "Saving…" : "Save Alt Text"}
      </button>
      {status === "saved" && <span style={{ fontSize: "12px", color: "oklch(50% 0.14 145)" }}>Saved</span>}
      {status === "error" && <span style={{ fontSize: "12px", color: "oklch(55% 0.2 25)" }}>{error}</span>}
    </div>
  );
}
