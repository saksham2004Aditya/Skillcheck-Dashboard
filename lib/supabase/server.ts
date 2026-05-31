import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function readSupabaseEnv(name: string): string | null {
  const value = process.env[name];

  return value ?? null;
}

export async function createClient() {
  const cookieStore = await cookies();
  const supabaseUrl = readSupabaseEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = readSupabaseEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server components can read cookies but not always set them.
          }
        },
      },
    },
  );
}