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
import { createBlogPostAction, deleteBlogPostAction, updateBlogPostAction } from "./actions";

export type BlogPostFormValues = {
  title: string;
  category: string;
  excerpt: string;
  body: string;
  featuredImage: string;
  author: string;
  publishedAt: string; // datetime-local value, e.g. "2026-09-21T14:30", or ""
  ctaLabel: string;
  ctaHref: string;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogPostEditor({
  mode,
  id,
  currentSlug,
  initial,
  existingCategories,
  media,
}: {
  mode: "create" | "edit";
  id?: string;
  currentSlug?: string;
  initial: BlogPostFormValues;
  existingCategories: string[];
  media: MediaPickerItem[];
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof BlogPostFormValues>(key: K, value: BlogPostFormValues[K]) {
    markDirty();
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    set("title", title);
    if (mode === "create" && !slugTouched) setSlug(slugify(title));
  }

  async function handleSave() {
    if (mode === "edit" && id) {
      await run(() => updateBlogPostAction(id, values));
      return;
    }
    await run(async () => {
      const result = await createBlogPostAction({ slug, ...values });
      if (result.ok) {
        router.push(`/admin/blog/${result.data.slug}`);
        return { ok: true };
      }
      return result;
    });
  }

  const isPublished = mode === "edit" && initial.status === "published";
  const canDelete = !isPublished || deleteConfirmText.trim() === currentSlug;

  async function handleDelete() {
    if (!id) return;
    if (!canDelete) return;
    if (!window.confirm(`Delete "${values.title}"? This can't be undone.`)) return;
    setDeleting(true);
    setDeleteError("");
    const result = await deleteBlogPostAction(id);
    setDeleting(false);
    if (!result.ok) {
      setDeleteError(result.error);
      return;
    }
    router.push("/admin/blog");
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        {mode === "create" ? "New Blog Post" : values.title}
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        {mode === "create"
          ? "Creates a new record in PostgreSQL. Set status to Draft until it's ready to go live."
          : "Editing the live post. Changes are saved to the database and appear on the public site immediately."}
      </p>

      <SaveBar
        status={status}
        errorMessage={errorMessage}
        onSave={handleSave}
        successMessage={mode === "create" ? "Created." : "Saved — the public site now reflects these changes."}
      />

      <Section title="Basics" defaultOpen>
        <TextField label="Title" value={values.title} onChange={handleTitleChange} />
        {mode === "create" ? (
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>
              Slug (public URL: /blog/{slug || "…"})
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
            Slug (public URL): <strong>/blog/{currentSlug}</strong> - not editable here, since changing it after
            creation would break the existing public link.
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Category</span>
            <input
              type="text"
              list="blog-categories"
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              style={inputStyle}
            />
            <datalist id="blog-categories">
              {existingCategories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <TextField label="Author" value={values.author} onChange={(v) => set("author", v)} />
        </div>
        <TextAreaField label="Excerpt" rows={2} value={values.excerpt} onChange={(v) => set("excerpt", v)} />
      </Section>

      <Section title="Featured Image" defaultOpen>
        <ImagePickerField
          label="Featured Image"
          value={values.featuredImage}
          onChange={(v) => set("featuredImage", v)}
          media={media}
          emptyHint="No featured image set - the public pages will show a generic placeholder."
        />
      </Section>

      <Section title="Article Body" defaultOpen>
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Plain text, not HTML or markdown. Separate paragraphs with a blank line - each becomes its own paragraph
          on the public page.
        </p>
        <TextAreaField label="Body" rows={16} value={values.body} onChange={(v) => set("body", v)} />
      </Section>

      <Section title="Closing Link">
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Optional inline link appended after the last paragraph (e.g. "Explore Milton real estate →"). Leave both
          blank to omit it.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Link Text" value={values.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
          <TextField label="Link URL" value={values.ctaHref} onChange={(v) => set("ctaHref", v)} />
        </div>
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
            <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>Published Date</span>
            <input
              type="datetime-local"
              value={values.publishedAt}
              onChange={(e) => set("publishedAt", e.target.value)}
              style={inputStyle}
            />
          </label>
        </div>
      </Section>

      <Section title="SEO">
        <TextField label="SEO Title" value={values.seoTitle} onChange={(v) => set("seoTitle", v)} />
        <TextAreaField label="Meta Description" rows={2} value={values.seoDescription} onChange={(v) => set("seoDescription", v)} />
      </Section>

      {mode === "edit" && (
        <div style={{ marginTop: "8px", paddingTop: "20px", borderTop: "1px solid oklch(89% 0.012 70)" }}>
          {isPublished && (
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", maxWidth: "320px" }}>
                <span style={{ color: "oklch(52% 0.02 60)" }}>
                  This post is published. Type its slug (<strong>{currentSlug}</strong>) to enable deletion.
                </span>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={currentSlug}
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
            {deleting ? "Deleting…" : "Delete Post"}
          </button>
          {deleteError && <p style={{ fontSize: "12px", color: "oklch(55% 0.2 25)", marginTop: "8px" }}>{deleteError}</p>}
        </div>
      )}
    </div>
  );
}
