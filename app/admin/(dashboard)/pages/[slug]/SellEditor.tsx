"use client";

import { useState } from "react";
import {
  Section,
  TextField,
  TextAreaField,
  HeroFields,
  CtaFields,
  FaqItemsEditor,
  NumberedItemsEditor,
  StatsEditor,
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateStandardPageContentAction } from "../_lib/standard-page-actions";
import type { SellContent } from "../_lib/standard-page-schemas";

export function SellEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: SellContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<SellContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof SellContent>(key: K, updater: (prev: SellContent[K]) => SellContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  const handleSave = () => run(() => updateStandardPageContentAction("sell", { content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Hero" defaultOpen>
        <HeroFields value={content.hero} onChange={(v) => set("hero", () => v)} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Valuation CTA">
        <CtaFields value={content.valuationCta} onChange={(v) => set("valuationCta", () => v)} />
      </Section>

      <Section title="Selling With Confidence (Steps)">
        <TextField label="Eyebrow" value={content.steps.eyebrow} onChange={(v) => set("steps", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.steps.headline} onChange={(v) => set("steps", (s) => ({ ...s, headline: v }))} />
        <NumberedItemsEditor items={content.steps.items} onChange={(items) => set("steps", (s) => ({ ...s, items }))} />
      </Section>

      <Section title="The Difference (Stats)">
        <TextField
          label="Eyebrow"
          value={content.difference.eyebrow}
          onChange={(v) => set("difference", (s) => ({ ...s, eyebrow: v }))}
        />
        <TextField
          label="Headline"
          value={content.difference.headline}
          onChange={(v) => set("difference", (s) => ({ ...s, headline: v }))}
        />
        <StatsEditor items={content.difference.stats} onChange={(stats) => set("difference", (s) => ({ ...s, stats }))} />
      </Section>

      <Section title="Selling FAQ">
        <TextField label="Eyebrow" value={content.faq.eyebrow} onChange={(v) => set("faq", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.faq.headline} onChange={(v) => set("faq", (s) => ({ ...s, headline: v }))} />
        <FaqItemsEditor items={content.faq.items} onChange={(items) => set("faq", (s) => ({ ...s, items }))} />
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
