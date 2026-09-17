"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { updateHomepageContentAction } from "./actions";
import type { HomepageContent } from "./homepage-schema";

type LinkValue = { label: string; href: string };

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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
      <span style={{ fontWeight: 600, color: "oklch(35% 0.015 60)" }}>{label}</span>
      {children}
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </Field>
  );
}

function TextAreaField({
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

function ImageField({
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

function LinkFields({
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

function Section({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
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

function ItemCard({ title, children }: { title: string; children: ReactNode }) {
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

export function HomepageEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: HomepageContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<HomepageContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function set<K extends keyof HomepageContent>(key: K, updater: (prev: HomepageContent[K]) => HomepageContent[K]) {
    setStatus("idle");
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
    return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMessage("");
    const result = await updateHomepageContentAction({ content, seoTitle, seoDescription });
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <div>
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
          onClick={handleSave}
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
          <span style={{ fontSize: "13px", color: "oklch(50% 0.14 145)", fontWeight: 600 }}>
            Saved — the public homepage now reflects these changes.
          </span>
        )}
        {status === "error" && (
          <span style={{ fontSize: "13px", color: "oklch(55% 0.2 25)", fontWeight: 600 }}>Error: {errorMessage}</span>
        )}
      </div>

      <Section title="Hero" defaultOpen>
        <TextField label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => set("hero", (h) => ({ ...h, eyebrow: v }))} />
        <TextField label="Headline" value={content.hero.headline} onChange={(v) => set("hero", (h) => ({ ...h, headline: v }))} />
        <TextAreaField label="Subhead" value={content.hero.subhead} onChange={(v) => set("hero", (h) => ({ ...h, subhead: v }))} />
        <ImageField
          label="Hero Image"
          value={content.hero.image}
          onChange={(v) => set("hero", (h) => ({ ...h, image: v }))}
          mediaPaths={mediaPaths}
        />
        <LinkFields labelPrefix="Primary Button" value={content.hero.ctaPrimary} onChange={(v) => set("hero", (h) => ({ ...h, ctaPrimary: v }))} />
        <LinkFields
          labelPrefix="Secondary Button"
          value={content.hero.ctaSecondary}
          onChange={(v) => set("hero", (h) => ({ ...h, ctaSecondary: v }))}
        />
      </Section>

      <Section title="Featured Cities">
        <TextField label="Eyebrow" value={content.featuredCities.eyebrow} onChange={(v) => set("featuredCities", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.featuredCities.headline} onChange={(v) => set("featuredCities", (s) => ({ ...s, headline: v }))} />
        <LinkFields
          labelPrefix="'View All' Button"
          value={{ label: content.featuredCities.viewAllLabel, href: content.featuredCities.viewAllHref }}
          onChange={(v) => set("featuredCities", (s) => ({ ...s, viewAllLabel: v.label, viewAllHref: v.href }))}
        />
        {content.featuredCities.items.map((item, i) => (
          <ItemCard key={i} title={item.name || `City ${i + 1}`}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <TextField label="City Name" value={item.name} onChange={(v) => set("featuredCities", (s) => ({ ...s, items: updateItem(s.items, i, { name: v }) }))} />
              <TextField label="Tagline" value={item.tagline} onChange={(v) => set("featuredCities", (s) => ({ ...s, items: updateItem(s.items, i, { tagline: v }) }))} />
            </div>
            <ImageField
              label="City Image"
              value={item.image}
              onChange={(v) => set("featuredCities", (s) => ({ ...s, items: updateItem(s.items, i, { image: v }) }))}
              mediaPaths={mediaPaths}
            />
          </ItemCard>
        ))}
      </Section>

      <Section title="Services (Buy / Sell / Invest / Commercial)">
        <TextField label="Eyebrow" value={content.services.eyebrow} onChange={(v) => set("services", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.services.headline} onChange={(v) => set("services", (s) => ({ ...s, headline: v }))} />
        {content.services.items.map((item, i) => (
          <ItemCard key={i} title={item.title || `Service ${i + 1}`}>
            <TextField label="Title" value={item.title} onChange={(v) => set("services", (s) => ({ ...s, items: updateItem(s.items, i, { title: v }) }))} />
            <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => set("services", (s) => ({ ...s, items: updateItem(s.items, i, { body: v }) }))} />
            <ImageField
              label="Image"
              value={item.image}
              onChange={(v) => set("services", (s) => ({ ...s, items: updateItem(s.items, i, { image: v }) }))}
              mediaPaths={mediaPaths}
            />
            <LinkFields
              labelPrefix="Button"
              value={{ label: item.ctaLabel, href: item.ctaHref }}
              onChange={(v) => set("services", (s) => ({ ...s, items: updateItem(s.items, i, { ctaLabel: v.label, ctaHref: v.href }) }))}
            />
          </ItemCard>
        ))}
      </Section>

      <Section title="Philosophy / About">
        <TextField label="Eyebrow" value={content.philosophy.eyebrow} onChange={(v) => set("philosophy", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.philosophy.headline} onChange={(v) => set("philosophy", (s) => ({ ...s, headline: v }))} />
        <TextAreaField label="Body" rows={5} value={content.philosophy.body} onChange={(v) => set("philosophy", (s) => ({ ...s, body: v }))} />
        <ImageField
          label="Image"
          value={content.philosophy.image}
          onChange={(v) => set("philosophy", (s) => ({ ...s, image: v }))}
          mediaPaths={mediaPaths}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {content.pillars.items.map((item, i) => (
            <ItemCard key={i} title={item.title || `Pillar ${i + 1}`}>
              <TextField label="Number" value={item.number} onChange={(v) => set("pillars", (s) => ({ ...s, items: updateItem(s.items, i, { number: v }) }))} />
              <TextField label="Title" value={item.title} onChange={(v) => set("pillars", (s) => ({ ...s, items: updateItem(s.items, i, { title: v }) }))} />
              <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => set("pillars", (s) => ({ ...s, items: updateItem(s.items, i, { body: v }) }))} />
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section title="Team">
        <TextField label="Eyebrow" value={content.team.eyebrow} onChange={(v) => set("team", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.team.headline} onChange={(v) => set("team", (s) => ({ ...s, headline: v }))} />
        <LinkFields labelPrefix="Button" value={{ label: content.team.ctaLabel, href: content.team.ctaHref }} onChange={(v) => set("team", (s) => ({ ...s, ctaLabel: v.label, ctaHref: v.href }))} />
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          The team member roster itself (photos, names, roles) isn&apos;t stored in this content record - see the Phase 4D report.
        </p>
      </Section>

      <Section title="Testimonials">
        <TextField label="Eyebrow" value={content.testimonials.eyebrow} onChange={(v) => set("testimonials", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.testimonials.headline} onChange={(v) => set("testimonials", (s) => ({ ...s, headline: v }))} />
        {content.testimonials.items.map((item, i) => (
          <ItemCard key={i} title={item.author || `Testimonial ${i + 1}`}>
            <TextAreaField label="Quote" rows={3} value={item.quote} onChange={(v) => set("testimonials", (s) => ({ ...s, items: updateItem(s.items, i, { quote: v }) }))} />
            <TextField label="Author" value={item.author} onChange={(v) => set("testimonials", (s) => ({ ...s, items: updateItem(s.items, i, { author: v }) }))} />
          </ItemCard>
        ))}
      </Section>

      <Section title="All Neighbourhoods Directory">
        <TextField label="Eyebrow" value={content.allNeighbourhoods.eyebrow} onChange={(v) => set("allNeighbourhoods", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.allNeighbourhoods.headline} onChange={(v) => set("allNeighbourhoods", (s) => ({ ...s, headline: v }))} />
        <TextAreaField label="Body" rows={2} value={content.allNeighbourhoods.body} onChange={(v) => set("allNeighbourhoods", (s) => ({ ...s, body: v }))} />
        <LinkFields
          labelPrefix="Directory Button"
          value={{ label: content.allNeighbourhoods.ctaLabel, href: content.allNeighbourhoods.ctaHref }}
          onChange={(v) => set("allNeighbourhoods", (s) => ({ ...s, ctaLabel: v.label, ctaHref: v.href }))}
        />
        {content.allNeighbourhoods.columns.map((col, i) => (
          <ItemCard key={i} title={col.heading || `Column ${i + 1}`}>
            <TextField label="Heading" value={col.heading} onChange={(v) => set("allNeighbourhoods", (s) => ({ ...s, columns: updateItem(s.columns, i, { heading: v }) }))} />
            <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
              {col.links.length} link{col.links.length === 1 ? "" : "s"} in this column - individual neighbourhood links aren&apos;t editable from this form yet.
            </p>
          </ItemCard>
        ))}
      </Section>

      <Section title="Featured Blog / Insights">
        <TextField label="Eyebrow" value={content.blogPreview.eyebrow} onChange={(v) => set("blogPreview", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.blogPreview.headline} onChange={(v) => set("blogPreview", (s) => ({ ...s, headline: v }))} />
        <LinkFields
          labelPrefix="'View All' Button"
          value={{ label: content.blogPreview.ctaLabel, href: content.blogPreview.ctaHref }}
          onChange={(v) => set("blogPreview", (s) => ({ ...s, ctaLabel: v.label, ctaHref: v.href }))}
        />
        {content.blogPreview.slugs.map((slug, i) => (
          <TextField
            key={i}
            label={`Featured Post ${i + 1} Slug`}
            value={slug}
            onChange={(v) =>
              set("blogPreview", (s) => ({
                ...s,
                slugs: s.slugs.map((existing, idx) => (idx === i ? v : existing)),
              }))
            }
          />
        ))}
      </Section>

      <Section title="FAQ Preview">
        <TextField label="Eyebrow" value={content.faqPreview.eyebrow} onChange={(v) => set("faqPreview", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.faqPreview.headline} onChange={(v) => set("faqPreview", (s) => ({ ...s, headline: v }))} />
        <LinkFields
          labelPrefix="'View All' Button"
          value={{ label: content.faqPreview.ctaLabel, href: content.faqPreview.ctaHref }}
          onChange={(v) => set("faqPreview", (s) => ({ ...s, ctaLabel: v.label, ctaHref: v.href }))}
        />
        {content.faqPreview.items.map((item, i) => (
          <ItemCard key={i} title={`Question ${i + 1}`}>
            <TextField label="Question" value={item.question} onChange={(v) => set("faqPreview", (s) => ({ ...s, items: updateItem(s.items, i, { question: v }) }))} />
            <TextAreaField label="Answer" rows={3} value={item.answer} onChange={(v) => set("faqPreview", (s) => ({ ...s, items: updateItem(s.items, i, { answer: v }) }))} />
          </ItemCard>
        ))}
      </Section>

      <Section title="International Reach">
        <TextField label="Eyebrow" value={content.internationalReach.eyebrow} onChange={(v) => set("internationalReach", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.internationalReach.headline} onChange={(v) => set("internationalReach", (s) => ({ ...s, headline: v }))} />
        <TextAreaField label="Body" rows={3} value={content.internationalReach.body} onChange={(v) => set("internationalReach", (s) => ({ ...s, body: v }))} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {content.internationalReach.offices.map((office, i) => (
            <ItemCard key={i} title={office.city || `Office ${i + 1}`}>
              <TextField label="City" value={office.city} onChange={(v) => set("internationalReach", (s) => ({ ...s, offices: updateItem(s.offices, i, { city: v }) }))} />
              <TextField label="Country" value={office.country} onChange={(v) => set("internationalReach", (s) => ({ ...s, offices: updateItem(s.offices, i, { country: v }) }))} />
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section title="Final CTA / Contact">
        <TextField label="Headline" value={content.finalCta.headline} onChange={(v) => set("finalCta", (s) => ({ ...s, headline: v }))} />
        <TextAreaField label="Body" rows={2} value={content.finalCta.body} onChange={(v) => set("finalCta", (s) => ({ ...s, body: v }))} />
      </Section>

      <Section title="SEO" defaultOpen>
        <TextField label="SEO Title" value={seoTitle} onChange={(v) => { setStatus("idle"); setSeoTitle(v); }} />
        <TextAreaField label="Meta Description" rows={2} value={seoDescription} onChange={(v) => { setStatus("idle"); setSeoDescription(v); }} />
      </Section>
    </div>
  );
}
