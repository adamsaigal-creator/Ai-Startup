"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Section,
  TextField,
  TextAreaField,
  SaveBar,
  useSaveStatus,
  inputStyle,
} from "../pages/_components/AdminEditorKit";
import { ImagePickerField } from "../_components/ImagePickerField";
import type { MediaPickerItem } from "@/lib/media/picker";
import { createListingAction, deleteListingAction, updateListingAction } from "./actions";

export type ListingFormValues = {
  address: string;
  city: string;
  neighbourhood: string;
  price: string;
  beds: string;
  baths: string;
  propertyType: string;
  description: string;
  image: string;
  listingUrl: string;
  featured: boolean;
  status: "draft" | "published" | "pending" | "sold" | "inactive";
};

const STATUS_OPTIONS: { value: ListingFormValues["status"]; label: string }[] = [
  { value: "draft", label: "Draft (not shown on the public site)" },
  { value: "published", label: "Published (shown publicly if also Featured)" },
  { value: "pending", label: "Pending (offer accepted - not shown publicly)" },
  { value: "sold", label: "Sold (not shown publicly)" },
  { value: "inactive", label: "Inactive / Off-Market (not shown publicly)" },
];

export function ListingEditor({
  mode,
  id,
  initial,
  existingCities,
  existingNeighbourhoods,
  existingPropertyTypes,
  media,
}: {
  mode: "create" | "edit";
  id?: string;
  initial: ListingFormValues;
  existingCities: string[];
  existingNeighbourhoods: string[];
  existingPropertyTypes: string[];
  media: MediaPickerItem[];
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof ListingFormValues>(key: K, value: ListingFormValues[K]) {
    markDirty();
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (mode === "edit" && id) {
      await run(() => updateListingAction(id, values));
      return;
    }
    await run(async () => {
      const result = await createListingAction(values);
      if (result.ok) {
        router.push(`/admin/listings/${result.data.id}`);
        return { ok: true };
      }
      return result;
    });
  }

  const needsTypedConfirmation = mode === "edit" && initial.status !== "draft";
  const canDelete = !needsTypedConfirmation || deleteConfirmText.trim() === initial.address;

  async function handleDelete() {
    if (!id || !canDelete) return;
    if (!window.confirm(`Delete "${values.address}"? This can't be undone.`)) return;
    setDeleting(true);
    setDeleteError("");
    const result = await deleteListingAction(id);
    setDeleting(false);
    if (!result.ok) {
      setDeleteError(result.error);
      return;
    }
    router.push("/admin/listings");
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        {mode === "create" ? "New Listing" : values.address}
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        {mode === "create"
          ? "Creates a new record in PostgreSQL. This is a manually curated sample listing, not a live MLS/IDX feed - set status to Draft until it's ready."
          : "Editing the live listing. Changes are saved to the database and appear on the public site immediately."}
      </p>

      <SaveBar
        status={status}
        errorMessage={errorMessage}
        onSave={handleSave}
        successMessage={mode === "create" ? "Created." : "Saved — the public site now reflects these changes."}
      />

      <Section title="Photo" defaultOpen>
        <ImagePickerField
          label="Primary Photo"
          value={values.image}
          onChange={(v) => set("image", v)}
          media={media}
          emptyHint="No photo set - the public pages will show a generic placeholder."
        />
      </Section>

      <Section title="Basics" defaultOpen>
        <TextField label="Address / Title" value={values.address} onChange={(v) => set("address", v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>City</span>
            <input type="text" list="listing-cities" value={values.city} onChange={(e) => set("city", e.target.value)} style={inputStyle} />
            <datalist id="listing-cities">
              {existingCities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Neighbourhood</span>
            <input
              type="text"
              list="listing-neighbourhoods"
              value={values.neighbourhood}
              onChange={(e) => set("neighbourhood", e.target.value)}
              style={inputStyle}
            />
            <datalist id="listing-neighbourhoods">
              {existingNeighbourhoods.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </label>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
          <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Property Type</span>
          <input
            type="text"
            list="listing-property-types"
            value={values.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            style={{ ...inputStyle, maxWidth: "260px" }}
          />
          <datalist id="listing-property-types">
            {existingPropertyTypes.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>
      </Section>

      <Section title="Details" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Price (CAD)</span>
            <input type="number" min="0" step="1000" value={values.price} onChange={(e) => set("price", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Bedrooms</span>
            <input type="number" min="0" step="1" value={values.beds} onChange={(e) => set("beds", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Bathrooms</span>
            <input type="number" min="0" step="0.5" value={values.baths} onChange={(e) => set("baths", e.target.value)} style={inputStyle} />
          </label>
        </div>
        <TextAreaField label="Description" rows={5} value={values.description} onChange={(v) => set("description", v)} />
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Square footage isn&apos;t part of the current listing data model, so it isn&apos;t editable here yet - see
          the Phase 4I report.
        </p>
      </Section>

      <Section title="External Link">
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Optional MLS/external listing URL. Stored, but not yet linked from the public listing cards - see the
          Phase 4I report.
        </p>
        <TextField label="Listing URL" value={values.listingUrl} onChange={(v) => set("listingUrl", v)} />
      </Section>

      <Section title="Status & Visibility" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "end" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Status</span>
            <select value={values.status} onChange={(e) => set("status", e.target.value as ListingFormValues["status"])} style={inputStyle}>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", paddingBottom: "10px" }}>
            <input type="checkbox" checked={values.featured} onChange={(e) => set("featured", e.target.checked)} style={{ width: "16px", height: "16px" }} />
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Featured</span>
          </label>
        </div>
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Only listings that are both <strong>Published</strong> and <strong>Featured</strong> appear on /search and
          on their city&apos;s overview page.
        </p>
      </Section>

      {mode === "edit" && (
        <div style={{ marginTop: "8px", paddingTop: "20px", borderTop: "1px solid oklch(89% 0.012 70)" }}>
          {needsTypedConfirmation && (
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", maxWidth: "360px" }}>
                <span style={{ color: "oklch(52% 0.02 60)" }}>
                  This listing isn&apos;t a draft. Type its address (<strong>{initial.address}</strong>) to enable
                  deletion.
                </span>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={initial.address}
                  style={{ ...inputStyle, fontSize: "13px" }}
                />
              </label>
            </div>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || !canDelete}
            style={{
              padding: "9px 16px",
              background: "transparent",
              color: "oklch(55% 0.2 25)",
              border: "1px solid oklch(80% 0.05 25)",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: deleting || !canDelete ? "default" : "pointer",
              opacity: !canDelete ? 0.5 : 1,
            }}
          >
            {deleting ? "Deleting…" : "Delete Listing"}
          </button>
          {deleteError && <p style={{ fontSize: "12px", color: "oklch(55% 0.2 25)", marginTop: "8px" }}>{deleteError}</p>}
        </div>
      )}
    </div>
  );
}
