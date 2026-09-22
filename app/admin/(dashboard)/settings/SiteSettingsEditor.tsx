"use client";

import { useState } from "react";
import { Section, TextField, TextAreaField, SaveBar, useSaveStatus } from "../pages/_components/AdminEditorKit";
import { ImagePickerField } from "../_components/ImagePickerField";
import type { MediaPickerItem } from "@/lib/media/picker";
import { updateSiteSettingsAction } from "./actions";

export type SiteSettingsFormValues = {
  brokerageName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedin: string;
  footerTagline: string;
  copyrightText: string;
  contactFormDestinationEmail: string;
  logoUrl: string;
  faviconUrl: string;
};

export function SiteSettingsEditor({ initial, media }: { initial: SiteSettingsFormValues; media: MediaPickerItem[] }) {
  const [values, setValues] = useState(initial);
  const { status, errorMessage, run, markDirty } = useSaveStatus();

  function set<K extends keyof SiteSettingsFormValues>(key: K, value: SiteSettingsFormValues[K]) {
    markDirty();
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    await run(() => updateSiteSettingsAction(values));
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        Site Settings
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
        Sitewide details shown in the header, footer, and contact form on every public page. Changes appear
        immediately - no redeploy needed.
      </p>

      <SaveBar status={status} errorMessage={errorMessage} onSave={handleSave} />

      <Section title="Brokerage" defaultOpen>
        <TextField label="Brokerage Name" value={values.brokerageName} onChange={(v) => set("brokerageName", v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Phone" value={values.phone} onChange={(v) => set("phone", v)} />
          <TextField label="Email" value={values.email} onChange={(v) => set("email", v)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <TextField label="Address Line 1" value={values.addressLine1} onChange={(v) => set("addressLine1", v)} />
          <TextField label="Address Line 2" value={values.addressLine2} onChange={(v) => set("addressLine2", v)} />
        </div>
      </Section>

      <Section title="Social Links">
        <TextField label="Instagram URL" value={values.socialInstagram} onChange={(v) => set("socialInstagram", v)} />
        <TextField label="Facebook URL" value={values.socialFacebook} onChange={(v) => set("socialFacebook", v)} />
        <TextField label="LinkedIn URL" value={values.socialLinkedin} onChange={(v) => set("socialLinkedin", v)} />
      </Section>

      <Section title="Footer">
        <TextAreaField label="Footer Tagline" rows={2} value={values.footerTagline} onChange={(v) => set("footerTagline", v)} />
        <TextField label="Copyright Text" value={values.copyrightText} onChange={(v) => set("copyrightText", v)} />
      </Section>

      <Section title="Contact Form">
        <TextField
          label="Contact Form Destination Email"
          value={values.contactFormDestinationEmail}
          onChange={(v) => set("contactFormDestinationEmail", v)}
        />
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          Where contact form submissions are sent. Leave blank to use the Email field above.
        </p>
      </Section>

      <Section title="Logo & Favicon">
        <ImagePickerField
          label="Logo"
          value={values.logoUrl}
          onChange={(v) => set("logoUrl", v)}
          media={media}
          emptyHint="No logo set - the header will show the brokerage name as text instead."
        />
        <ImagePickerField
          label="Favicon"
          value={values.faviconUrl}
          onChange={(v) => set("faviconUrl", v)}
          media={media}
          emptyHint="No favicon set."
        />
        <p style={{ fontSize: "12px", color: "oklch(52% 0.02 60)", margin: 0 }}>
          The public site currently uses a static app/favicon.ico file, not this field - stored here for later use,
          but not yet rendered. See the Phase 4J report.
        </p>
      </Section>
    </div>
  );
}
