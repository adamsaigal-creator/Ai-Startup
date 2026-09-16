import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton for server-only use. DATABASE_URL is never a
 * NEXT_PUBLIC_* variable, so this module - and the database itself - is
 * unreachable from the browser; the only path to this data is Next.js
 * server code (Server Components, Route Handlers, Server Actions).
 *
 * Cached on `globalThis` in development so Next.js's hot-reload doesn't
 * open a fresh pool of Postgres connections on every file save.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
