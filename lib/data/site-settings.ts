import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export type SiteSettingsRow = {
  brokerage_name: string;
  phone: string | null;
  email: string | null;
  address_line1: string | null;
  address_line2: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_linkedin: string | null;
  footer_tagline: string | null;
  copyright_text: string | null;
  contact_form_destination_email: string | null;
  logo_url: string | null;
  favicon_url: string | null;
};

const SETTINGS_COLUMNS =
  "brokerage_name, phone, email, address_line1, address_line2, social_instagram, social_facebook, social_linkedin, footer_tagline, copyright_text, contact_form_destination_email, logo_url, favicon_url";

export const getSiteSettings = cache(async (): Promise<SiteSettingsRow> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select(SETTINGS_COLUMNS)
    .eq("id", 1)
    .maybeSingle<SiteSettingsRow>();
  if (error) throw new Error(`Failed to load site settings: ${error.message}`);
  if (!data) throw new Error("site_settings row (id=1) is missing - run supabase/seed.sql");
  return data;
});
