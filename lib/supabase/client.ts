import { createBrowserClient } from "@supabase/ssr";

function readSupabaseEnv(name: string): string | null {
  const value = process.env[name];

  return value ?? null;
}

export function createClient() {
  const supabaseUrl = readSupabaseEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = readSupabaseEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );
}