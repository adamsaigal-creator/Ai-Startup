// Bootstrap-only source for the team roster (Phase 4G). Mirrors the exact
// 7-person roster that previously lived inside the About page's
// content.team.members JSON (see scripts/seed-pages-content.ts's git
// history) - only the destination changes, not the content. Once seeded,
// PostgreSQL (the team_members table) is the source of truth; re-running
// the seed never overwrites a row that already exists (see
// prisma/seed.ts's seedTeamMembers()), so CMS edits made in /admin/team
// survive a re-seed.
export type SeedTeamMember = {
  slug: string;
  name: string;
  role: string;
  languages: string;
  phone: string;
  photo: string;
  displayOrder: number;
};

export const SR_TEAM_MEMBERS: SeedTeamMember[] = [
  { slug: "nomi", name: "Nomi Saigal", role: "Broker of Record", languages: "English, Urdu, Hindi", phone: "(905) 876-4126", photo: "/uploads/sraa.png", displayOrder: 0 },
  { slug: "kamranm", name: "Kamran Mustafa", role: "Realtor®", languages: "English, Urdu, Hindi, Punjabi", phone: "(416) 802-2012", photo: "/uploads/sraa.png", displayOrder: 1 },
  { slug: "zak", name: "Zak Abdelnour", role: "Realtor®", languages: "English, Arabic", phone: "(647) 638-9233", photo: "/uploads/sraa.png", displayOrder: 2 },
  { slug: "alam", name: "Alam Arbi", role: "Realtor®", languages: "Residential & Commercial · English, Urdu, Hindi", phone: "(905) 279-9991", photo: "/uploads/sraa.png", displayOrder: 3 },
  { slug: "kamrans", name: "Kamran Saeed", role: "Realtor®", languages: "English, Urdu, Hindi, Punjabi", phone: "(416) 553-2626", photo: "/uploads/sraa.png", displayOrder: 4 },
  { slug: "numan", name: "Numan Shafiq", role: "Realtor®", languages: "English, Urdu, Hindi, Punjabi", phone: "(647) 274-9241", photo: "/uploads/sraa.png", displayOrder: 5 },
  { slug: "haider", name: "Haider Mohammad", role: "Agent · Licensed in Dallas, TX", languages: "Pre-construction · English", phone: "(469) 450-4352", photo: "/uploads/sraa.png", displayOrder: 6 },
];
