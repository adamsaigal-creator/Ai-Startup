// Bootstrap-only source for the team roster (Phase 4G). Mirrors the exact
// 7-person roster that previously lived inside the About page's
// content.team.members JSON (see scripts/seed-pages-content.ts's git
// history) - only the destination changes, not the content. Once seeded,
// PostgreSQL (the team_members table) is the source of truth; re-running
// the seed never overwrites a row that already exists (see
// prisma/seed.ts's seedTeamMembers()), so CMS edits made in /admin/team
// survive a re-seed.
//
// Final Design pass: studio portraits (public/images/team/*-studio.webp),
// display order Nomi, Numan, Zak, Alam, Kamran Saeed, Kamran Mustafa, and
// Haider Mohammad hidden rather than deleted. For fresh installs only -
// an existing database is updated through /admin/team.
export type SeedTeamMember = {
  slug: string;
  name: string;
  role: string;
  languages: string;
  phone: string;
  photo: string;
  displayOrder: number;
  /** Defaults to "published". "hidden" keeps the row (and its history) in
   * team_members without showing it on the Homepage or About page. */
  status?: "published" | "hidden";
};

export const SR_TEAM_MEMBERS: SeedTeamMember[] = [
  { slug: "nomi", name: "Nomi Saigal", role: "Broker of Record", languages: "English, Urdu, Hindi", phone: "(905) 876-4126", photo: "/images/team/nomi-saigal-studio.webp", displayOrder: 0 },
  { slug: "numan", name: "Numan Shafiq", role: "Realtor®", languages: "English, Urdu, Hindi, Punjabi", phone: "(647) 274-9241", photo: "/images/team/numan-shafiq-studio.webp", displayOrder: 1 },
  { slug: "zak", name: "Zak Abdelnour", role: "Realtor®", languages: "English, Arabic", phone: "(647) 638-9233", photo: "/images/team/zak-abdelnour-studio.webp", displayOrder: 2 },
  { slug: "alam", name: "Alam Arbi", role: "Realtor®", languages: "Residential & Commercial · English, Urdu, Hindi", phone: "(905) 279-9991", photo: "/images/team/alam-arbi-studio.webp", displayOrder: 3 },
  { slug: "kamrans", name: "Kamran Saeed", role: "Realtor®", languages: "English, Urdu, Hindi, Punjabi", phone: "(416) 553-2626", photo: "/images/team/kamran-saeed-studio.webp", displayOrder: 4 },
  { slug: "kamranm", name: "Kamran Mustafa", role: "Realtor®", languages: "English, Urdu, Hindi, Punjabi", phone: "(416) 802-2012", photo: "/images/team/kamran-mustafa-studio.webp", displayOrder: 5 },
  { slug: "haider", name: "Haider Mohammad", role: "Agent · Licensed in Dallas, TX", languages: "Pre-construction · English", phone: "(469) 450-4352", photo: "", displayOrder: 6, status: "hidden" },
];
