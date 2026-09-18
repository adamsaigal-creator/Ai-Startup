"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";

// Shared building blocks for every /admin/pages/[slug] content editor
// (Homepage, and the six standard pages added in Phase 4E). Extracted from
// the original Homepage editor so every editor gets the same look, field
// behavior, and save mechanics without six near-identical copies.

export type LinkValue = { label: string; href: string };
export type NumberedItem = { number: string; title: string; body: string };
export type StatItem = { value: string; label: string };
export type FaqLink = { text: string; href: string };
export type FaqItem = { question: string; answer: string; links?: FaqLink[] };

export const inputStyle: CSSProperties = {
  padding: "10px 12px",
  border: "1px solid oklch(85% 0.012 70)",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "var(--font-work-sans), sans-serif",
  background: "oklch(99% 0.004 90)",
  width: "100%",
  boxSizing: "border-box",
};

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
      <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>{label}</span>
      {children}
    </label>
  );
}

export function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
      />
    </Field>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  mediaPaths,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mediaPaths: string[];
}) {
  const listId = useId();
  return (
    <Field label={label}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? (
          <img
            src={value}
            alt=""
            style={{
              width: "44px",
              height: "44px",
              objectFit: "cover",
              borderRadius: "4px",
              border: "1px solid oklch(85% 0.012 70)",
              flexShrink: 0,
            }}
          />
        ) : null}
        <input
          type="text"
          list={listId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/example.png"
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>
      <datalist id={listId}>
        {mediaPaths.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
    </Field>
  );
}

export function LinkFields({
  labelPrefix,
  value,
  onChange,
}: {
  labelPrefix: string;
  value: LinkValue;
  onChange: (v: LinkValue) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <TextField label={`${labelPrefix} Label`} value={value.label} onChange={(label) => onChange({ ...value, label })} />
      <TextField label={`${labelPrefix} URL`} value={value.href} onChange={(href) => onChange({ ...value, href })} />
    </div>
  );
}

export function Section({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details
      open={defaultOpen}
      style={{
        background: "oklch(99% 0.004 90)",
        border: "1px solid oklch(89% 0.012 70)",
        borderRadius: "4px",
        marginBottom: "16px",
      }}
    >
      <summary
        style={{
          padding: "16px 20px",
          cursor: "pointer",
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "oklch(23% 0.012 60)",
        }}
      >
        {title}
      </summary>
      <div style={{ padding: "4px 20px 22px", display: "flex", flexDirection: "column", gap: "16px" }}>{children}</div>
    </details>
  );
}

export function ItemCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid oklch(90% 0.012 70)",
        borderRadius: "4px",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
        {title}
      </span>
      {children}
    </div>
  );
}

/** Page heading + intro line shared by every content editor. */
export function PageEditorShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "28px",
          fontWeight: 600,
          margin: "0 0 8px",
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        Editing the live {title} page. Changes are saved to the database and appear on the public site immediately.
      </p>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composite editors for content shapes that repeat, unmodified, across
// several of the six standard pages (hero / cta / faq / numbered-step
// groups / stat groups). These aren't a forced common schema - each page's
// Zod schema and saved JSON keep their own real shape; these components
// just avoid re-typing the same field markup once per page when the
// underlying section really is identical.
// ---------------------------------------------------------------------------

export function HeroFields<T extends { eyebrow: string; headline: string; subhead?: string; image: string }>({
  value,
  onChange,
  mediaPaths,
}: {
  value: T;
  onChange: (v: T) => void;
  mediaPaths: string[];
}) {
  return (
    <>
      <TextField label="Eyebrow" value={value.eyebrow} onChange={(v) => onChange({ ...value, eyebrow: v })} />
      <TextField label="Headline" value={value.headline} onChange={(v) => onChange({ ...value, headline: v })} />
      {value.subhead !== undefined && (
        <TextAreaField label="Subhead" value={value.subhead} onChange={(v) => onChange({ ...value, subhead: v })} />
      )}
      <ImageField label="Hero Image" value={value.image} onChange={(v) => onChange({ ...value, image: v })} mediaPaths={mediaPaths} />
    </>
  );
}

export function CtaFields({
  value,
  onChange,
}: {
  value: { headline: string; body: string; buttonLabel: string; buttonHref: string };
  onChange: (v: { headline: string; body: string; buttonLabel: string; buttonHref: string }) => void;
}) {
  return (
    <>
      <TextField label="Headline" value={value.headline} onChange={(v) => onChange({ ...value, headline: v })} />
      <TextAreaField label="Body" rows={2} value={value.body} onChange={(v) => onChange({ ...value, body: v })} />
      <LinkFields
        labelPrefix="Button"
        value={{ label: value.buttonLabel, href: value.buttonHref }}
        onChange={(lv) => onChange({ ...value, buttonLabel: lv.label, buttonHref: lv.href })}
      />
    </>
  );
}

export function FaqItemsEditor({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  function updateItem(i: number, patch: Partial<FaqItem>) {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }
  return (
    <>
      {items.map((item, i) => (
        <ItemCard key={i} title={`Question ${i + 1}`}>
          <TextField label="Question" value={item.question} onChange={(v) => updateItem(i, { question: v })} />
          <TextAreaField label="Answer" rows={3} value={item.answer} onChange={(v) => updateItem(i, { answer: v })} />
          {item.links && item.links.length > 0 && (
            <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
              This answer has {item.links.length} inline link{item.links.length === 1 ? "" : "s"} - not editable in this form yet.
            </p>
          )}
        </ItemCard>
      ))}
    </>
  );
}

export function NumberedItemsEditor({ items, onChange }: { items: NumberedItem[]; onChange: (items: NumberedItem[]) => void }) {
  function updateItem(i: number, patch: Partial<NumberedItem>) {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`, gap: "12px" }}>
      {items.map((item, i) => (
        <ItemCard key={i} title={item.title || `Item ${i + 1}`}>
          <TextField label="Number" value={item.number} onChange={(v) => updateItem(i, { number: v })} />
          <TextField label="Title" value={item.title} onChange={(v) => updateItem(i, { title: v })} />
          <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => updateItem(i, { body: v })} />
        </ItemCard>
      ))}
    </div>
  );
}

export function StatsEditor({ items, onChange }: { items: StatItem[]; onChange: (items: StatItem[]) => void }) {
  function updateItem(i: number, patch: Partial<StatItem>) {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`, gap: "12px" }}>
      {items.map((item, i) => (
        <ItemCard key={i} title={`Stat ${i + 1}`}>
          <TextField label="Value" value={item.value} onChange={(v) => updateItem(i, { value: v })} />
          <TextAreaField label="Label" rows={2} value={item.label} onChange={(v) => updateItem(i, { label: v })} />
        </ItemCard>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Save bar + status
// ---------------------------------------------------------------------------

export type SaveResult = { ok: true } | { ok: false; error: string };
export type SaveStatus = "idle" | "saving" | "success" | "error";

export function useSaveStatus() {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function run(save: () => Promise<SaveResult>) {
    setStatus("saving");
    setErrorMessage("");
    const result = await save();
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  function markDirty() {
    setStatus("idle");
  }

  return { status, errorMessage, run, markDirty };
}

export function SaveBar({
  status,
  errorMessage,
  onSave,
  successMessage = "Saved — the public page now reflects these changes.",
}: {
  status: SaveStatus;
  errorMessage: string;
  onSave: () => void;
  successMessage?: string;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: "-36px",
        zIndex: 5,
        background: "oklch(97% 0.012 75)",
        padding: "0 0 16px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <button
        type="button"
        onClick={onSave}
        disabled={status === "saving"}
        style={{
          padding: "11px 26px",
          background: "oklch(23% 0.012 60)",
          color: "oklch(99% 0.004 90)",
          border: "none",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          cursor: status === "saving" ? "default" : "pointer",
          opacity: status === "saving" ? 0.6 : 1,
        }}
      >
        {status === "saving" ? "Saving…" : "Save Changes"}
      </button>
      {status === "success" && (
        <span style={{ fontSize: "13px", color: "oklch(50% 0.14 145)", fontWeight: 600 }}>{successMessage}</span>
      )}
      {status === "error" && (
        <span style={{ fontSize: "13px", color: "oklch(55% 0.2 25)", fontWeight: 600 }}>Error: {errorMessage}</span>
      )}
    </div>
  );
}
