"use client";

import { useState } from "react";
import {
  Section,
  ItemCard,
  TextField,
  TextAreaField,
  HeroFields,
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateStandardPageContentAction } from "../_lib/standard-page-actions";
import type { ContactContent } from "../_lib/standard-page-schemas";

export function ContactEditor({
  initialContent,
  initialSeoTitle,
  initialSeoDescription,
  mediaPaths,
}: {
  initialContent: ContactContent;
  initialSeoTitle: string;
  initialSeoDescription: string;
  mediaPaths: string[];
}) {
  const [content, setContent] = useState<ContactContent>(initialContent);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof ContactContent>(key: K, updater: (prev: ContactContent[K]) => ContactContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
    return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }
  function updateStringItem(items: string[], index: number, value: string): string[] {
    return items.map((item, i) => (i === index ? value : item));
  }

  const handleSave = () => run(() => updateStandardPageContentAction("contact", { content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Hero" defaultOpen>
        <HeroFields value={content.hero} onChange={(v) => set("hero", () => v)} mediaPaths={mediaPaths} />
      </Section>

      <Section title="Form">
        <TextField label="Submit Button Label" value={content.form.buttonLabel} onChange={(v) => set("form", (s) => ({ ...s, buttonLabel: v }))} />
        <ItemCard title="Reason Options">
          {content.form.reasonOptions.map((opt, i) => (
            <TextField
              key={i}
              label={`Option ${i + 1}`}
              value={opt}
              onChange={(v) => set("form", (s) => ({ ...s, reasonOptions: updateStringItem(s.reasonOptions, i, v) }))}
            />
          ))}
        </ItemCard>
      </Section>

      <Section title="Info Panel">
        <TextAreaField
          label="Serving Area"
          rows={2}
          value={content.infoPanel.servingArea}
          onChange={(v) => set("infoPanel", () => ({ servingArea: v }))}
        />
      </Section>

      <Section title="Office Hours">
        {content.officeHours.items.map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <TextField
              label="Day(s)"
              value={item.label}
              onChange={(v) => set("officeHours", (s) => ({ items: updateItem(s.items, i, { label: v }) }))}
            />
            <TextField
              label="Hours"
              value={item.value}
              onChange={(v) => set("officeHours", (s) => ({ items: updateItem(s.items, i, { value: v }) }))}
            />
          </div>
        ))}
      </Section>

      <Section title="What Happens Next">
        {content.whatHappensNext.items.map((item, i) => (
          <ItemCard key={i} title={`Step ${i + 1}`}>
            <TextField
              label="Number"
              value={item.number}
              onChange={(v) => set("whatHappensNext", (s) => ({ items: updateItem(s.items, i, { number: v }) }))}
            />
            <TextAreaField
              label="Body"
              rows={2}
              value={item.body}
              onChange={(v) => set("whatHappensNext", (s) => ({ items: updateItem(s.items, i, { body: v }) }))}
            />
          </ItemCard>
        ))}
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
