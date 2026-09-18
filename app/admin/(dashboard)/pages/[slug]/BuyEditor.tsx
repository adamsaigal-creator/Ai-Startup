"use client";

import { useState } from "react";
import {
  Section,
  ItemCard,
  TextField,
  TextAreaField,
  HeroFields,
  CtaFields,
  FaqItemsEditor,
  NumberedItemsEditor,
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateStandardPageContentAction } from "../_lib/standard-page-actions";
import type { BuyContent } from "../_lib/standard-page-schemas";

export function BuyEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: BuyContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<BuyContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof BuyContent>(key: K, updater: (prev: BuyContent[K]) => BuyContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateStringItem(items: string[], index: number, value: string): string[] {
    return items.map((item, i) => (i === index ? value : item));
  }

  const handleSave = () => run(() => updateStandardPageContentAction("buy", { content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Hero" defaultOpen>
        <HeroFields value={content.hero} onChange={(v) => set("hero", () => v)} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Search Widget">
        <TextField
          label="Button Label"
          value={content.searchWidget.buttonLabel}
          onChange={(v) => set("searchWidget", (s) => ({ ...s, buttonLabel: v }))}
        />
        <TextField
          label="Caption"
          value={content.searchWidget.caption}
          onChange={(v) => set("searchWidget", (s) => ({ ...s, caption: v }))}
        />
        <ItemCard title="Locations">
          {content.searchWidget.locations.map((loc, i) => (
            <TextField
              key={i}
              label={`Location ${i + 1}`}
              value={loc}
              onChange={(v) => set("searchWidget", (s) => ({ ...s, locations: updateStringItem(s.locations, i, v) }))}
            />
          ))}
        </ItemCard>
        <ItemCard title="Price Ranges">
          {content.searchWidget.priceRanges.map((pr, i) => (
            <TextField
              key={i}
              label={`Range ${i + 1}`}
              value={pr}
              onChange={(v) => set("searchWidget", (s) => ({ ...s, priceRanges: updateStringItem(s.priceRanges, i, v) }))}
            />
          ))}
        </ItemCard>
      </Section>

      <Section title="How It Works (Steps)">
        <TextField label="Eyebrow" value={content.steps.eyebrow} onChange={(v) => set("steps", (s) => ({ ...s, eyebrow: v }))} />
        <TextField label="Headline" value={content.steps.headline} onChange={(v) => set("steps", (s) => ({ ...s, headline: v }))} />
        <NumberedItemsEditor items={content.steps.items} onChange={(items) => set("steps", (s) => ({ ...s, items }))} />
      </Section>

      <Section title="Buyer Representation">
        <TextField
          label="Eyebrow"
          value={content.representation.eyebrow}
          onChange={(v) => set("representation", (s) => ({ ...s, eyebrow: v }))}
        />
        <TextField
          label="Headline"
          value={content.representation.headline}
          onChange={(v) => set("representation", (s) => ({ ...s, headline: v }))}
        />
        {content.representation.body.map((p, i) => (
          <TextAreaField
            key={i}
            label={`Paragraph ${i + 1}`}
            rows={3}
            value={p}
            onChange={(v) => set("representation", (s) => ({ ...s, body: updateStringItem(s.body, i, v) }))}
          />
        ))}
        <ItemCard title="Checklist">
          {content.representation.checklist.map((item, i) => (
            <TextField
              key={i}
              label={`Item ${i + 1}`}
              value={item}
              onChange={(v) => set("representation", (s) => ({ ...s, checklist: updateStringItem(s.checklist, i, v) }))}
            />
          ))}
        </ItemCard>
      </Section>

      <Section title="Buying FAQ">
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
