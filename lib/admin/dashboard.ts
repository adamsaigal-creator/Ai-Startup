import "server-only";
import { prisma } from "@/lib/db/client";

/**
 * Admin-only aggregate queries for the dashboard shell. Deliberately
 * separate from lib/data/*.ts (the public read layer): these counts cover
 * every row regardless of status (drafts included), which would be wrong
 * to reuse on the public site.
 */
export type DashboardCounts = {
  pages: number;
  neighbourhoods: number;
  teamMembers: number;
  blogPosts: number;
  listings: number;
  media: number;
};

export async function getDashboardCounts(): Promise<DashboardCounts> {
  const [pages, neighbourhoods, teamMembers, blogPosts, listings, media] = await Promise.all([
    prisma.page.count(),
    prisma.neighbourhood.count(),
    prisma.teamMember.count(),
    prisma.blogPost.count(),
    prisma.listing.count(),
    prisma.media.count(),
  ]);
  return { pages, neighbourhoods, teamMembers, blogPosts, listings, media };
}

export type RecentPage = { slug: string; title: string; updatedAt: Date };

export async function getRecentlyUpdatedPages(limit = 5): Promise<RecentPage[]> {
  return prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: { slug: true, title: true, updatedAt: true },
  });
}
