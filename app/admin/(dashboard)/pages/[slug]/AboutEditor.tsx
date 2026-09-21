"use client";

import { useState } from "react";
import {
  Section,
  ItemCard,
  TextField,
  TextAreaField,
  ImageField,
  HeroFields,
  CtaFields,
  StatsEditor,
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateStandardPageContentAction } from "../_lib/standard-page-actions";
import type { AboutContent } from "../_lib/standard-page-schemas";

export function AboutEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: AboutContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<AboutContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof AboutContent>(key: K, updater: (prev: AboutContent[K]) => AboutContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
    return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }
  function updateStringItem(items: string[], index: number, value: string): string[] {
    return items.map((item, i) => (i === index ? value : item));
  }

  const handleSave = () => run(() => updateStandardPageContentAction("about", { content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Hero" defaultOpen>
        <HeroFields value={content.hero} onChange={(v) => set("hero", () => v)} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Philosophy">
        <TextField label="Eyebrow" value={content.philosophy.eyebrow} onChange={(v) => set("philosophy", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.philosophy.headline} onChange={(v) => set("philosophy", (s) => ({ ...s, headline: v }))} />
        <TextAreaField label="Body" rows={5} value={content.philosophy.body} onChange={(v) => set("philosophy", (s) => ({ ...s, body: v }))} />
      </Section>

      <Section title="Stats">
        <StatsEditor items={content.stats.items} onChange={(items) => set("stats", () => ({ items }))} />
      </Section>

      <Section title="Boutique Difference">
        <TextField label="Eyebrow" value={content.boutique.eyebrow} onChange={(v) => set("boutique", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.boutique.headline} onChange={(v) => set("boutique", (s) => ({ ...s, headline: v }))} />
        {content.boutique.body.map((p, i) => (
          <TextAreaField
            key={i}
            label={`Paragraph ${i + 1}`}
            rows={3}
            value={p}
            onChange={(v) => set("boutique", (s) => ({ ...s, body: updateStringItem(s.body, i, v) }))}
          />
        ))}
        <ImageField label="Image" value={content.boutique.image} onChange={(v) => set("boutique", (s) => ({ ...s, image: v }))} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Pillars">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {content.pillars.items.map((item, i) => (
            <ItemCard key={i} title={item.title || `Pillar ${i + 1}`}>
              <TextField label="Number" value={item.number} onChange={(v) => set("pillars", (s) => ({ items: updateItem(s.items, i, { number: v }) }))} />
              <TextField label="Title" value={item.title} onChange={(v) => set("pillars", (s) => ({ items: updateItem(s.items, i, { title: v }) }))} />
              <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => set("pillars", (s) => ({ items: updateItem(s.items, i, { body: v }) }))} />
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section title="Team">
        <TextField label="Eyebrow" value={content.team.eyebrow} onChange={(v) => set("team", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.team.headline} onChange={(v) => set("team", (s) => ({ ...s, headline: v }))} />
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          The roster shown below this heading (names, roles, photos, languages, phone numbers) is managed at{" "}
          <a href="/admin/team" style={{ fontWeight: 600 }}>Team</a> - see the Phase 4G report for why it moved out of
          this page&apos;s content.
        </p>
      </Section>

      <Section title="International Reach">
        <TextField
          label="Eyebrow"
          value={content.internationalReach.eyebrow}
          onChange={(v) => set("internationalReach", (s) => ({ ...s, eyebrow: v }))}
        />
        <TextField
          label="Headline"
          value={content.internationalReach.headline}
          onChange={(v) => set("internationalReach", (s) => ({ ...s, headline: v }))}
        />
        <TextAreaField
          label="Body"
          rows={3}
          value={content.internationalReach.body}
          onChange={(v) => set("internationalReach", (s) => ({ ...s, body: v }))}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {content.internationalReach.offices.map((office, i) => (
            <ItemCard key={i} title={office.city || `Office ${i + 1}`}>
              <TextField
                label="City"
                value={office.city}
                onChange={(v) => set("internationalReach", (s) => ({ ...s, offices: updateItem(s.offices, i, { city: v }) }))}
              />
              <TextField
                label="Country"
                value={office.country}
                onChange={(v) => set("internationalReach", (s) => ({ ...s, offices: updateItem(s.offices, i, { country: v }) }))}
              />
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section title="Careers CTA">
        <TextField
          label="Eyebrow"
          value={content.careersCta.eyebrow}
          onChange={(v) => set("careersCta", (s) => ({ ...s, eyebrow: v }))}
        />
        <CtaFields
          value={content.careersCta}
          onChange={(v) => set("careersCta", (s) => ({ ...s, ...v }))}
        />
      </Section>

      <Section title="Closing CTA">
        <CtaFields value={content.cta} onChange={(v) => set("cta", () => v)} />
      </Section>

      <Section title="SEO" defaultOpen>
        <TextField
          label="SEO Title"
          value={seoTitle}
          onChange={(v) => {
            markDirty();
            setSeoTitle(v);
          }}
        />
        <TextAreaField
          label="Meta Description"
          rows={2}
          value={seoDescription}
          onChange={(v) => {
            markDirty();
            setSeoDescription(v);
          }}
        />
      </Section>
    </div>
  );
}
