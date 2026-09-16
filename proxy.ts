import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/config";

// Renamed from middleware.ts per this Next.js version's file convention
// (see node_modules/next/dist/docs/.../file-conventions/proxy.md) - same
// behavior, defaults to the Node.js runtime, which is what lets this call
// Prisma directly for an authoritative, real-time session check on every
// /admin/* request rather than a stateless/optimistic check.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token);

  if (pathname === "/admin/login") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
