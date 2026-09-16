-- Saigal Realty content model (Phase 3).
--
-- Design notes:
--   * `pages` covers the site's ~14 non-repeating editable pages (homepage,
--     buy, sell, luxury, commercial, about, contact, the neighbourhoods
--     directory, faq, careers, search, blog index, and the three city
--     overview pages - milton/oakville/burlington - which the original
--     Phase 3 spec didn't name individually but are exactly the same kind
--     of "major editable page" as the rest). Each page's own copy lives in
--     a typed `content` JSONB column, sectioned to match that page's actual
--     layout (hero, philosophy, services, cta, ...) - never one giant blob
--     for the whole site, and never raw HTML where a structured field will
--     do.
--   * `neighbourhoods`, `blog_posts`, and `listings` are real relational
--     tables (one row per record) because they need filtering/lookup by
--     slug, city, category, or status - a JSON blob would make that
--     needlessly hard.
--   * `site_settings` is a singleton row (enforced by the id=1 check) for
--     sitewide facts (brokerage name, phone, address, socials) referenced
--     from multiple pages/components, so they're edited once, not
--     duplicated per page.
--   * `media` is a metadata catalog only in this phase - files still live
--     under /public (Phase 4 moves them into Supabase Storage and points
--     this table at real storage_path values).

create extension if not exists "pgcrypto";

-- ============================================================================
-- pages
-- ============================================================================
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  og_title text,
  og_description text,
  og_image text,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.pages is 'One row per major editable page. content holds page-specific typed sections (hero, services, cta, ...), not raw HTML.';
comment on column public.pages.slug is 'Route-identifying key, e.g. "homepage", "buy", "neighbourhoods-milton". Not always the literal URL path.';

-- ============================================================================
-- neighbourhoods
-- ============================================================================
create table public.neighbourhoods (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  city text not null,
  headline text,
  introduction text,
  description text,
  housing text,
  lifestyle text,
  schools text,
  amenities text,
  commute text,
  cta_label text,
  cta_href text,
  custom_image text,
  seo_title text,
  seo_description text,
  status text not null default 'published' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.neighbourhoods.display_order is 'Curated position within its city group (matches the original site''s neighbourhood list order), used by the /neighbourhoods directory page - not alphabetical.';
comment on table public.neighbourhoods is 'One row per neighbourhood (80 seeded). custom_image overrides the per-city master image; NULL falls back to the city master image at read time.';
comment on column public.neighbourhoods.custom_image is 'Explicit per-neighbourhood photo. When NULL, the app falls back to that neighbourhood''s city master image (see lib/data/neighbourhoods.ts CITY_MASTER_IMAGE).';
comment on column public.neighbourhoods.cta_label is 'Per-neighbourhood override for the closing CTA button label. NULL uses the sitewide default ("Book a Consultation").';
comment on column public.neighbourhoods.cta_href is 'Per-neighbourhood override for the closing CTA button target. NULL uses the sitewide default (/contact).';

create index neighbourhoods_city_idx on public.neighbourhoods (city);
create index neighbourhoods_status_idx on public.neighbourhoods (status);

-- ============================================================================
-- blog_posts
-- ============================================================================
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  excerpt text,
  body text,
  featured_image text,
  author text,
  published_at timestamptz,
  cta_label text,
  cta_href text,
  status text not null default 'published' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.blog_posts is 'body holds paragraphs separated by a blank line (plain text, not HTML) - matches the source content exactly; a future rich-text editor can upgrade this without a schema change.';
comment on column public.blog_posts.cta_label is 'Closing inline link text (e.g. "Explore Milton real estate ->"), rendered as a real link after body rather than embedded as HTML in body.';

create index blog_posts_status_idx on public.blog_posts (status);
create index blog_posts_published_at_idx on public.blog_posts (published_at desc);

-- ============================================================================
-- site_settings (singleton row)
-- ============================================================================
create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  brokerage_name text not null,
  phone text,
  email text,
  address_line1 text,
  address_line2 text,
  social_instagram text,
  social_facebook text,
  social_linkedin text,
  footer_tagline text,
  copyright_text text,
  contact_form_destination_email text,
  logo_url text,
  favicon_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.site_settings is 'Single global settings row (id is pinned to 1). Referenced by SiteHeader/SiteFooter and every mailto: contact form action.';

-- ============================================================================
-- media
-- ============================================================================
create table public.media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null,
  alt_text text,
  mime_type text,
  width integer,
  height integer,
  file_size bigint,
  created_at timestamptz not null default now()
);

comment on table public.media is 'Metadata catalog for site images. storage_path is a /public-relative path in Phase 3 - Phase 4 moves the actual files into Supabase Storage and updates these paths to Storage object paths.';

-- ============================================================================
-- listings (manually managed featured listings only - not IDX/PropTx feed)
-- ============================================================================
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city text not null,
  neighbourhood text,
  price numeric,
  beds integer,
  baths numeric,
  property_type text,
  description text,
  image text,
  listing_url text,
  featured boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.listings is 'Manually managed placeholder/featured listings. Schema intentionally flat and IDX/PropTx-compatible (address/city/price/beds/baths/type) so a future feed import can map onto it without a redesign.';

create index listings_city_idx on public.listings (city);
create index listings_featured_idx on public.listings (featured);
create index listings_status_idx on public.listings (status);

-- ============================================================================
-- updated_at triggers
-- ============================================================================
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger pages_set_updated_at before update on public.pages
  for each row execute function public.set_updated_at();
create trigger neighbourhoods_set_updated_at before update on public.neighbourhoods
  for each row execute function public.set_updated_at();
create trigger blog_posts_set_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();
create trigger site_settings_set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();
create trigger listings_set_updated_at before update on public.listings
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Row Level Security
--
-- Public (anon) and authenticated roles may SELECT published content only.
-- No INSERT/UPDATE/DELETE policy exists for anon/authenticated on any
-- table, so RLS's default-deny leaves writes blocked entirely - admin
-- writes (Phase 5+) go through the service_role key server-side, which
-- bypasses RLS by design, never through a broad public write policy.
-- ============================================================================

alter table public.pages enable row level security;
alter table public.neighbourhoods enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.media enable row level security;
alter table public.listings enable row level security;

create policy "Public can read published pages"
  on public.pages for select
  to anon, authenticated
  using (status = 'published');

create policy "Public can read published neighbourhoods"
  on public.neighbourhoods for select
  to anon, authenticated
  using (status = 'published');

create policy "Public can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Public can read media metadata"
  on public.media for select
  to anon, authenticated
  using (true);

create policy "Public can read published listings"
  on public.listings for select
  to anon, authenticated
  using (status = 'published');
