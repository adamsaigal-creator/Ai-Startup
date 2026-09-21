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
import { createTeamMemberAction, deleteTeamMemberAction, updateTeamMemberAction } from "./actions";

export type TeamMemberFormValues = {
  name: string;
  role: string;
  photo: string;
  languages: string;
  phone: string;
  email: string;
  bio: string;
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

export function TeamMemberEditor({
  mode,
  id,
  currentSlug,
  initial,
  media,
}: {
  mode: "create" | "edit";
  id?: string;
  currentSlug?: string;
  initial: TeamMemberFormValues;
  media: MediaPickerItem[];
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof TeamMemberFormValues>(key: K, value: TeamMemberFormValues[K]) {
    markDirty();
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (mode === "create" && !slugTouched) setSlug(slugify(name));
  }

  async function handleSave() {
    if (mode === "edit" && id) {
      await run(() => updateTeamMemberAction(id, values));
      return;
    }
    await run(async () => {
      const result = await createTeamMemberAction({ slug, ...values });
      if (result.ok) {
        router.push(`/admin/team/${result.data.id}`);
        return { ok: true };
      }
      return result;
    });
  }

  async function handleDelete() {
    if (!id) return;
    if (!window.confirm(`Remove "${values.name}" from the team roster? This can't be undone.`)) return;
    setDeleting(true);
    setDeleteError("");
    const result = await deleteTeamMemberAction(id);
    setDeleting(false);
    if (!result.ok) {
      setDeleteError(result.error);
      return;
    }
    router.push("/admin/team");
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        {mode === "create" ? "Add Team Member" : values.name}
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        {mode === "create"
          ? "Creates a new record in PostgreSQL. Set status to Hidden until it's ready to appear publicly."
          : "Changes appear on the Homepage carousel and the About page immediately - no redeploy needed."}
      </p>

      <SaveBar
        status={status}
        errorMessage={errorMessage}
        onSave={handleSave}
        successMessage={mode === "create" ? "Created." : "Saved — the public pages now reflect this change."}
      />

      <Section title="Photo" defaultOpen>
        <ImagePickerField
          label="Headshot"
          value={values.photo}
          onChange={(v) => set("photo", v)}
          media={media}
          emptyHint="No photo set - the public pages will show a generic placeholder."
        />
      </Section>

      <Section title="Basics" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Name" value={values.name} onChange={handleNameChange} />
          <TextField label="Title / Role" value={values.role} onChange={(v) => set("role", v)} />
        </div>
        {mode === "create" ? (
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Slug (internal identifier)</span>
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
            Internal identifier: <strong>{currentSlug}</strong> - not editable here, since other references (element
            ids on the public pages) are keyed to it. See the Phase 4G report.
          </p>
        )}
      </Section>

      <Section title="Contact & Languages">
        <TextField label="Languages" value={values.languages} onChange={(v) => set("languages", v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Phone" value={values.phone} onChange={(v) => set("phone", v)} />
          <TextField label="Email" value={values.email} onChange={(v) => set("email", v)} />
        </div>
      </Section>

      <Section title="Bio">
        <TextAreaField label="Short Bio" rows={4} value={values.bio} onChange={(v) => set("bio", v)} />
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Not currently shown on the public site - stored here for a future bio section.
        </p>
      </Section>

      <Section title="Visibility & Order" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Status</span>
            <select
              value={values.status}
              onChange={(e) => set("status", e.target.value as "draft" | "published")}
              style={inputStyle}
            >
              <option value="published">Visible on the public site</option>
              <option value="draft">Hidden</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Display Order</span>
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
            {deleting ? "Removing…" : "Remove from Roster"}
          </button>
          {deleteError && <p style={{ fontSize: "12px", color: "oklch(55% 0.2 25)", marginTop: "8px" }}>{deleteError}</p>}
        </div>
      )}
    </div>
  );
}
