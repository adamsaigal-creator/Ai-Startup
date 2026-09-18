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
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateStandardPageContentAction } from "../_lib/standard-page-actions";
import type { CommercialContent } from "../_lib/standard-page-schemas";

export function CommercialEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: CommercialContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<CommercialContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof CommercialContent>(key: K, updater: (prev: CommercialContent[K]) => CommercialContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
    return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }
  function updateStringItem(items: string[], index: number, value: string): string[] {
    return items.map((item, i) => (i === index ? value : item));
  }

  const handleSave = () => run(() => updateStandardPageContentAction("commercial", { content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Hero" defaultOpen>
        <HeroFields value={content.hero} onChange={(v) => set("hero", () => v)} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Sectors We Serve">
        <TextField label="Eyebrow" value={content.sectors.eyebrow} onChange={(v) => set("sectors", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.sectors.headline} onChange={(v) => set("sectors", (s) => ({ ...s, headline: v }))} />
        {content.sectors.items.map((item, i) => (
          <ItemCard key={i} title={item.title || `Sector ${i + 1}`}>
            <TextField label="Title" value={item.title} onChange={(v) => set("sectors", (s) => ({ ...s, items: updateItem(s.items, i, { title: v }) }))} />
            <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => set("sectors", (s) => ({ ...s, items: updateItem(s.items, i, { body: v }) }))} />
            <ImageField
              label="Image"
              value={item.image}
              onChange={(v) => set("sectors", (s) => ({ ...s, items: updateItem(s.items, i, { image: v }) }))}
              mediaPaths={mediaPaths}
            />
          </ItemCard>
        ))}
      </Section>

      <Section title="Why Us">
        <TextField label="Eyebrow" value={content.whyUs.eyebrow} onChange={(v) => set("whyUs", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.whyUs.headline} onChange={(v) => set("whyUs", (s) => ({ ...s, headline: v }))} />
        {content.whyUs.body.map((p, i) => (
          <TextAreaField
            key={i}
            label={`Paragraph ${i + 1}`}
            rows={3}
            value={p}
            onChange={(v) => set("whyUs", (s) => ({ ...s, body: updateStringItem(s.body, i, v) }))}
          />
        ))}
        <ItemCard title="Checklist">
          {content.whyUs.checklist.map((item, i) => (
            <TextField
              key={i}
              label={`Item ${i + 1}`}
              value={item}
              onChange={(v) => set("whyUs", (s) => ({ ...s, checklist: updateStringItem(s.checklist, i, v) }))}
            />
          ))}
        </ItemCard>
      </Section>

      <Section title="Our Commercial Process">
        <TextField label="Eyebrow" value={content.process.eyebrow} onChange={(v) => set("process", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.process.headline} onChange={(v) => set("process", (s) => ({ ...s, headline: v }))} />
        <NumberedItemsEditor items={content.process.items} onChange={(items) => set("process", (s) => ({ ...s, items }))} />
      </Section>

      <Section title="Commercial FAQ">
        <TextField label="Eyebrow" value={content.faq.eyebrow} onChange={(v) => set("faq", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.faq.headline} onChange={(v) => set("faq", (s) => ({ ...s, headline: v }))} />
        <FaqItemsEditor items={content.faq.items} onChange={(items) => set("faq", (s) => ({ ...s, items }))} />
      </Section>

      <Section title="Recent Work">
        <TextField label="Eyebrow" value={content.recentWork.eyebrow} onChange={(v) => set("recentWork", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.recentWork.headline} onChange={(v) => set("recentWork", (s) => ({ ...s, headline: v }))} />
        {content.recentWork.items.map((item, i) => (
          <ItemCard key={i} title={item.tag || `Item ${i + 1}`}>
            <TextField label="Tag" value={item.tag} onChange={(v) => set("recentWork", (s) => ({ ...s, items: updateItem(s.items, i, { tag: v }) }))} />
            <TextAreaField label="Body" rows={3} value={item.body} onChange={(v) => set("recentWork", (s) => ({ ...s, items: updateItem(s.items, i, { body: v }) }))} />
          </ItemCard>
        ))}
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
