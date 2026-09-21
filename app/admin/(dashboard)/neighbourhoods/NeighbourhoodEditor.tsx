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
import { createNeighbourhoodAction, deleteNeighbourhoodAction, updateNeighbourhoodAction } from "./actions";

export type NeighbourhoodFormValues = {
  name: string;
  city: string;
  headline: string;
  introduction: string;
  description: string;
  housing: string;
  lifestyle: string;
  schools: string;
  amenities: string;
  commute: string;
  ctaLabel: string;
  ctaHref: string;
  customImage: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
  displayOrder: number;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NeighbourhoodEditor({
  mode,
  id,
  currentSlug,
  initial,
  existingCities,
  media,
}: {
  mode: "create" | "edit";
  id?: string;
  currentSlug?: string;
  initial: NeighbourhoodFormValues;
  existingCities: string[];
  media: MediaPickerItem[];
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof NeighbourhoodFormValues>(key: K, value: NeighbourhoodFormValues[K]) {
    markDirty();
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (mode === "create" && !slugTouched) setSlug(slugify(name));
  }

  async function handleSave() {
    if (mode === "edit" && id) {
      await run(() => updateNeighbourhoodAction(id, values));
      return;
    }
    await run(async () => {
      const result = await createNeighbourhoodAction({ slug, ...values });
      if (result.ok) {
        router.push(`/admin/neighbourhoods/${result.data.slug}`);
        return { ok: true };
      }
      return result;
    });
  }

  async function handleDelete() {
    if (!id) return;
    if (!window.confirm(`Delete "${values.name}"? This can't be undone.`)) return;
    setDeleting(true);
    setDeleteError("");
    const result = await deleteNeighbourhoodAction(id);
    setDeleting(false);
    if (!result.ok) {
      setDeleteError(result.error);
      return;
    }
    router.push("/admin/neighbourhoods");
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        {mode === "create" ? "New Neighbourhood" : values.name}
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        {mode === "create"
          ? "Creates a new record in PostgreSQL. Set status to Draft until it's ready to go live."
          : "Editing the live neighbourhood record. Changes are saved to the database and appear on the public site immediately."}
      </p>

      <SaveBar
        status={status}
        errorMessage={errorMessage}
        onSave={handleSave}
        successMessage={mode === "create" ? "Created." : "Saved — the public page now reflects these changes."}
      />

      <Section title="Basics" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Name" value={values.name} onChange={handleNameChange} />
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>City</span>
            <input
              type="text"
              list="neighbourhood-cities"
              value={values.city}
              onChange={(e) => set("city", e.target.value)}
              style={inputStyle}
            />
            <datalist id="neighbourhood-cities">
              {existingCities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
        </div>
        {mode === "create" ? (
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>
              Slug (public URL: saigalrealty.ca/{slug || "…"})
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugTouched(true);
              }}
              style={inputStyle}
            />
          </label>
        ) : (
          <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
            Slug (public URL): <strong>/{currentSlug}</strong> - not editable here, since changing it after creation
            would break the existing public link. See the Phase 4G report.
          </p>
        )}
      </Section>

      <Section title="Hero Image" defaultOpen>
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          If left empty, this neighbourhood falls back to its city&apos;s shared photo (or a generic placeholder for
          cities without one).
        </p>
        <ImagePickerField
          label="Custom Hero Image"
          value={values.customImage}
          onChange={(v) => set("customImage", v)}
          media={media}
          emptyHint="No custom image set - currently showing the city default."
        />
      </Section>

      <Section title="Content">
        <TextField label="Headline" value={values.headline} onChange={(v) => set("headline", v)} />
        <TextAreaField label="Introduction" rows={3} value={values.introduction} onChange={(v) => set("introduction", v)} />
        <TextAreaField label="Description" rows={5} value={values.description} onChange={(v) => set("description", v)} />
        <TextAreaField label="Housing" rows={3} value={values.housing} onChange={(v) => set("housing", v)} />
        <TextAreaField label="Lifestyle / Parks & Recreation" rows={3} value={values.lifestyle} onChange={(v) => set("lifestyle", v)} />
        <TextAreaField label="Schools" rows={3} value={values.schools} onChange={(v) => set("schools", v)} />
        <TextAreaField label="Amenities" rows={3} value={values.amenities} onChange={(v) => set("amenities", v)} />
        <TextAreaField label="Commute" rows={3} value={values.commute} onChange={(v) => set("commute", v)} />
      </Section>

      <Section title="Closing CTA Override">
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Optional. Leave blank to use the sitewide default (&quot;Book a Consultation&quot; → /contact).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Button Label" value={values.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
          <TextField label="Button URL" value={values.ctaHref} onChange={(v) => set("ctaHref", v)} />
        </div>
      </Section>

      <Section title="SEO">
        <TextField label="SEO Title" value={values.seoTitle} onChange={(v) => set("seoTitle", v)} />
        <TextAreaField label="Meta Description" rows={2} value={values.seoDescription} onChange={(v) => set("seoDescription", v)} />
      </Section>

      <Section title="Publishing" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Status</span>
            <select
              value={values.status}
              onChange={(e) => set("status", e.target.value as "draft" | "published")}
              style={inputStyle}
            >
              <option value="draft">Draft (not shown on the public site)</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Display Order (within its city)</span>
            <input
              type="number"
              value={values.displayOrder}
              onChange={(e) => set("displayOrder", Number(e.target.value))}
              style={inputStyle}
            />
          </label>
        </div>
      </Section>

      {mode === "edit" && (
        <div style={{ marginTop: "8px", paddingTop: "20px", borderTop: "1px solid oklch(89% 0.012 70)" }}>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            style={{
              padding: "9px 16px",
              background: "transparent",
              color: "oklch(55% 0.2 25)",
              border: "1px solid oklch(80% 0.05 25)",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: deleting ? "default" : "pointer",
            }}
          >
            {deleting ? "Deleting…" : "Delete Neighbourhood"}
          </button>
          {deleteError && <p style={{ fontSize: "12px", color: "oklch(55% 0.2 25)", marginTop: "8px" }}>{deleteError}</p>}
        </div>
      )}
    </div>
  );
}
