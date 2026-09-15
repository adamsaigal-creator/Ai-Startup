import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for use in Server Components, Server Actions, and Route
 * Handlers. Uses the anon key + the caller's session cookies, so it is
 * subject to Row Level Security - this is NOT an admin/service-role client.
 *
 * Must be created fresh per request (never module-level singleton), since it
 * captures the current request's cookies.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component that can't set cookies (no
            // active response). Fine as long as middleware also refreshes
            // the session - see lib/supabase/middleware.ts (added in the
            // auth phase).
          }
        },
      },
    }
  );
}

/**
 * Admin client for privileged server-only operations (seeding, migrations,
 * admin write paths that must bypass RLS). Uses the service role key and
 * must NEVER be imported into any Client Component or exposed to the
 * browser bundle.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
