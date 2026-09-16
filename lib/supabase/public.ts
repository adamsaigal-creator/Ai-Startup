import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Plain anon-key client for public content reads (pages, neighbourhoods,
 * blog posts, site settings, listings). Deliberately NOT cookie-aware
 * (unlike lib/supabase/server.ts's createClient) so it's safe to call
 * during static generation / build time, where there is no request/cookie
 * context. Subject to the same RLS policies as any other anon request -
 * this client can never see draft/unpublished rows.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
