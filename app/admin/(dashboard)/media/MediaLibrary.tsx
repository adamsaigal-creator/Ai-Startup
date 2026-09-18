"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import { deleteMediaAction, updateMediaDetailsAction, uploadMediaAction } from "./actions";

export type MediaLibraryRow = {
  id: string;
  storagePath: string;
  filename: string;
  altText: string;
  caption: string;
  width: number | null;
  height: number | null;
  mimeType: string | null;
  fileSizeLabel: string;
  uploadedAtLabel: string;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_CLIENT_SIDE_BYTES = 10 * 1024 * 1024;

const inputStyle: CSSProperties = {
  padding: "10px 12px",
  border: "1px solid oklch(85% 0.012 70)",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "var(--font-work-sans), sans-serif",
  background: "oklch(99% 0.004 90)",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle: CSSProperties = {
  padding: "10px 20px",
  background: "oklch(23% 0.012 60)",
  color: "oklch(99% 0.004 90)",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  background: "transparent",
  color: "oklch(35% 0.015 60)",
  border: "1px solid oklch(80% 0.012 70)",
};

type UploadState =
  | { phase: "idle" }
  | { phase: "selected"; file: File; previewUrl: string; altText: string; caption: string; error?: string }
  | { phase: "uploading"; file: File; previewUrl: string; altText: string; caption: string };

export function MediaLibrary({ initialItems }: { initialItems: MediaLibraryRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [upload, setUpload] = useState<UploadState>({ phase: "idle" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<Record<string, string>>({});
  const [pendingRowId, setPendingRowId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.filename.toLowerCase().includes(q) ||
        item.altText.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q)
    );
  }, [items, search]);

  function handleFileChosen(file: File | undefined) {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUpload({
        phase: "selected",
        file,
        previewUrl: "",
        altText: "",
        caption: "",
        error: "Unsupported file. Please choose a JPG, PNG, WebP, or GIF image.",
      });
      return;
    }
    if (file.size > MAX_CLIENT_SIDE_BYTES) {
      setUpload({
        phase: "selected",
        file,
        previewUrl: "",
        altText: "",
        caption: "",
        error: "File is too large (max 10MB).",
      });
      return;
    }
    setUpload({ phase: "selected", file, previewUrl: URL.createObjectURL(file), altText: "", caption: "" });
  }

  function cancelUpload() {
    if (upload.phase === "selected" && upload.previewUrl) URL.revokeObjectURL(upload.previewUrl);
    setUpload({ phase: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUploadSubmit() {
    if (upload.phase !== "selected" || upload.error) return;
    const { file, previewUrl, altText, caption } = upload;
    setUpload({ phase: "uploading", file, previewUrl, altText, caption });

    const formData = new FormData();
    formData.set("file", file);
    formData.set("altText", altText);
    formData.set("caption", caption);
    const result = await uploadMediaAction(formData);

    if (!result.ok) {
      setUpload({ phase: "selected", file, previewUrl, altText, caption, error: result.error });
      return;
    }

    const uploaded = result.data;
    setItems((prev) => [
      {
        id: uploaded.id,
        storagePath: uploaded.storagePath,
        filename: uploaded.filename,
        altText: uploaded.altText ?? "",
        caption: uploaded.caption ?? "",
        width: uploaded.width,
        height: uploaded.height,
        mimeType: null,
        fileSizeLabel: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAtLabel: "Just now",
      },
      ...prev,
    ]);
    URL.revokeObjectURL(previewUrl);
    setUpload({ phase: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSaveDetails(id: string, altText: string, caption: string) {
    setPendingRowId(id);
    setRowError((prev) => ({ ...prev, [id]: "" }));
    const result = await updateMediaDetailsAction(id, { altText, caption });
    setPendingRowId(null);
    if (!result.ok) {
      setRowError((prev) => ({ ...prev, [id]: result.error }));
      return;
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, altText, caption } : item)));
    setEditingId(null);
  }

  async function handleDelete(id: string, filename: string) {
    if (!window.confirm(`Delete "${filename}"? This can't be undone.`)) return;
    setPendingRowId(id);
    setRowError((prev) => ({ ...prev, [id]: "" }));
    const result = await deleteMediaAction(id);
    setPendingRowId(null);
    if (!result.ok) {
      setRowError((prev) => ({ ...prev, [id]: result.error }));
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        Media Library
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        Browse, upload, and manage the images used across the website. Uploaded files are stored on this server&apos;s
        own filesystem, not a third-party service.
      </p>

      <div
        style={{
          background: "oklch(99% 0.004 90)",
          border: "1px solid oklch(89% 0.012 70)",
          borderRadius: "4px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          style={{ display: "none" }}
          onChange={(e) => handleFileChosen(e.target.files?.[0])}
        />

        {upload.phase === "idle" && (
          <button type="button" style={buttonStyle} onClick={() => fileInputRef.current?.click()}>
            Upload Image
          </button>
        )}

        {upload.phase !== "idle" && (
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
            {upload.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={upload.previewUrl}
                alt="Preview"
                style={{ width: "140px", height: "140px", objectFit: "cover", borderRadius: "4px", border: "1px solid oklch(85% 0.012 70)" }}
              />
            ) : (
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "4px",
                  border: "1px dashed oklch(75% 0.012 70)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "oklch(55% 0.02 60)",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                No preview available
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, minWidth: "240px" }}>
              <span style={{ fontSize: "13px", color: "oklch(46% 0.02 60)" }}>{upload.file.name}</span>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
                <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Alt Text</span>
                <input
                  type="text"
                  value={upload.altText}
                  onChange={(e) => setUpload((prev) => (prev.phase === "idle" ? prev : { ...prev, altText: e.target.value }))}
                  style={inputStyle}
                  placeholder="Describe the image for accessibility"
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
                <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Caption (optional)</span>
                <input
                  type="text"
                  value={upload.caption}
                  onChange={(e) => setUpload((prev) => (prev.phase === "idle" ? prev : { ...prev, caption: e.target.value }))}
                  style={inputStyle}
                />
              </label>
              {upload.phase === "selected" && upload.error && (
                <span style={{ fontSize: "13px", color: "oklch(55% 0.2 25)", fontWeight: 600 }}>{upload.error}</span>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  style={{ ...buttonStyle, opacity: upload.phase === "uploading" || (upload.phase === "selected" && !!upload.error) ? 0.6 : 1 }}
                  disabled={upload.phase === "uploading" || (upload.phase === "selected" && !!upload.error)}
                  onClick={handleUploadSubmit}
                >
                  {upload.phase === "uploading" ? "Uploading…" : "Save to Media Library"}
                </button>
                <button type="button" style={secondaryButtonStyle} onClick={cancelUpload} disabled={upload.phase === "uploading"}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by filename, alt text, or caption…"
        style={{ ...inputStyle, maxWidth: "360px", marginBottom: "20px" }}
      />

      <p style={{ fontSize: "13px", color: "oklch(52% 0.02 60)", margin: "0 0 16px" }}>
        {filtered.length} of {items.length} file{items.length === 1 ? "" : "s"}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
        {filtered.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            editing={editingId === item.id}
            pending={pendingRowId === item.id}
            error={rowError[item.id] ?? ""}
            onEdit={() => setEditingId(item.id)}
            onCancelEdit={() => setEditingId(null)}
            onSaveDetails={(altText, caption) => handleSaveDetails(item.id, altText, caption)}
            onDelete={() => handleDelete(item.id, item.filename)}
          />
        ))}
      </div>
    </div>
  );
}

function MediaCard({
  item,
  editing,
  pending,
  error,
  onEdit,
  onCancelEdit,
  onSaveDetails,
  onDelete,
}: {
  item: MediaLibraryRow;
  editing: boolean;
  pending: boolean;
  error: string;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaveDetails: (altText: string, caption: string) => void;
  onDelete: () => void;
}) {
  const [altText, setAltText] = useState(item.altText);
  const [caption, setCaption] = useState(item.caption);

  return (
    <div
      style={{
        border: "1px solid oklch(90% 0.012 70)",
        borderRadius: "4px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "oklch(99% 0.004 90)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.storagePath} alt={item.altText} style={{ width: "100%", height: "150px", objectFit: "cover", display: "block" }} />
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "oklch(23% 0.012 60)", wordBreak: "break-word" }}>{item.filename}</span>
        <span style={{ fontSize: "11px", color: "oklch(55% 0.02 60)" }}>
          {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
          {item.fileSizeLabel} · {item.uploadedAtLabel}
        </span>

        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Alt text"
              style={{ ...inputStyle, fontSize: "12px", padding: "6px 8px" }}
            />
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption (optional)"
              style={{ ...inputStyle, fontSize: "12px", padding: "6px 8px" }}
            />
            {error && <span style={{ fontSize: "11px", color: "oklch(55% 0.2 25)" }}>{error}</span>}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                style={{ ...buttonStyle, padding: "6px 12px", fontSize: "12px", opacity: pending ? 0.6 : 1 }}
                disabled={pending}
                onClick={() => onSaveDetails(altText, caption)}
              >
                {pending ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                style={{ ...secondaryButtonStyle, padding: "6px 12px", fontSize: "12px" }}
                onClick={() => {
                  setAltText(item.altText);
                  setCaption(item.caption);
                  onCancelEdit();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <span style={{ fontSize: "12px", color: "oklch(46% 0.02 60)", fontStyle: item.altText ? "normal" : "italic" }}>
              {item.altText || "No alt text set"}
            </span>
            {error && <span style={{ fontSize: "11px", color: "oklch(55% 0.2 25)" }}>{error}</span>}
            <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
              <button type="button" style={{ ...secondaryButtonStyle, padding: "6px 12px", fontSize: "12px" }} onClick={onEdit}>
                Edit Details
              </button>
              <button
                type="button"
                style={{ ...secondaryButtonStyle, padding: "6px 12px", fontSize: "12px", color: "oklch(55% 0.2 25)", opacity: pending ? 0.6 : 1 }}
                disabled={pending}
                onClick={onDelete}
              >
                {pending ? "…" : "Delete"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
