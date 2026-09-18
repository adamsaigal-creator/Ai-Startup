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
  FaqItemsEditor,
  NumberedItemsEditor,
  StatsEditor,
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateStandardPageContentAction } from "../_lib/standard-page-actions";
import type { LuxuryContent } from "../_lib/standard-page-schemas";

export function LuxuryEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: LuxuryContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<LuxuryContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof LuxuryContent>(key: K, updater: (prev: LuxuryContent[K]) => LuxuryContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
    return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }

  const handleSave = () => run(() => updateStandardPageContentAction("luxury", { content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Hero" defaultOpen>
        <HeroFields value={content.hero} onChange={(v) => set("hero", () => v)} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Intro">
        <TextAreaField label="Body" rows={5} value={content.intro.body} onChange={(v) => set("intro", () => ({ body: v }))} />
      </Section>

      <Section title="Image Grid">
        {content.imageGrid.images.map((img, i) => (
          <ItemCard key={i} title={img.alt || `Image ${i + 1}`}>
            <ImageField
              label="Image"
              value={img.src}
              onChange={(v) => set("imageGrid", (s) => ({ images: updateItem(s.images, i, { src: v }) }))}
              mediaPaths={mediaPaths}
            />
            <TextField
              label="Alt Text"
              value={img.alt}
              onChange={(v) => set("imageGrid", (s) => ({ images: updateItem(s.images, i, { alt: v }) }))}
            />
          </ItemCard>
        ))}
      </Section>

      <Section title="Stats">
        <StatsEditor items={content.stats.items} onChange={(items) => set("stats", () => ({ items }))} />
      </Section>

      <Section title="Luxury Pockets">
        <TextField label="Eyebrow" value={content.pockets.eyebrow} onChange={(v) => set("pockets", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.pockets.headline} onChange={(v) => set("pockets", (s) => ({ ...s, headline: v }))} />
        {content.pockets.items.map((item, i) => (
          <ItemCard key={i} title={item.title || `Pocket ${i + 1}`}>
            <TextField label="Title" value={item.title} onChange={(v) => set("pockets", (s) => ({ ...s, items: updateItem(s.items, i, { title: v }) }))} />
            <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => set("pockets", (s) => ({ ...s, items: updateItem(s.items, i, { body: v }) }))} />
          </ItemCard>
        ))}
      </Section>

      <Section title="Signature Marketing Program">
        <TextField label="Eyebrow" value={content.program.eyebrow} onChange={(v) => set("program", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.program.headline} onChange={(v) => set("program", (s) => ({ ...s, headline: v }))} />
        <NumberedItemsEditor items={content.program.items} onChange={(items) => set("program", (s) => ({ ...s, items }))} />
      </Section>

      <Section title="Luxury FAQ">
        <TextField label="Eyebrow" value={content.faq.eyebrow} onChange={(v) => set("faq", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.faq.headline} onChange={(v) => set("faq", (s) => ({ ...s, headline: v }))} />
        <FaqItemsEditor items={content.faq.items} onChange={(items) => set("faq", (s) => ({ ...s, items }))} />
      </Section>

      <Section title="Global Network">
        <TextField
          label="Eyebrow"
          value={content.globalNetwork.eyebrow}
          onChange={(v) => set("globalNetwork", (s) => ({ ...s, eyebrow: v }))}
        />
        <TextField
          label="Headline"
          value={content.globalNetwork.headline}
          onChange={(v) => set("globalNetwork", (s) => ({ ...s, headline: v }))}
        />
        <TextAreaField
          label="Body"
          rows={3}
          value={content.globalNetwork.body}
          onChange={(v) => set("globalNetwork", (s) => ({ ...s, body: v }))}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField
            label="Link Label"
            value={content.globalNetwork.linkLabel}
            onChange={(v) => set("globalNetwork", (s) => ({ ...s, linkLabel: v }))}
          />
          <TextField
            label="Link URL"
            value={content.globalNetwork.linkHref}
            onChange={(v) => set("globalNetwork", (s) => ({ ...s, linkHref: v }))}
          />
        </div>
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
