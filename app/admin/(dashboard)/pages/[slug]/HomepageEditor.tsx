"use client";

import { useState } from "react";
import {
  Section,
  ItemCard,
  TextField,
  TextAreaField,
  ImageField,
  LinkFields,
  NumberedItemsEditor,
  FaqItemsEditor,
  SaveBar,
  useSaveStatus,
} from "../_components/AdminEditorKit";
import { updateHomepageContentAction } from "./actions";
import type { HomepageContent } from "./homepage-schema";

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
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof HomepageContent>(key: K, updater: (prev: HomepageContent[K]) => HomepageContent[K]) {
    markDirty();
    setContent((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  }

  function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
    return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }

  const handleSave = () => run(() => updateHomepageContentAction({ content, seoTitle, seoDescription }));

  return (
    <div>
      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

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
        <NumberedItemsEditor items={content.pillars.items} onChange={(items) => set("pillars", () => ({ items }))} />
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
        <FaqItemsEditor items={content.faqPreview.items} onChange={(items) => set("faqPreview", (s) => ({ ...s, items }))} />
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
