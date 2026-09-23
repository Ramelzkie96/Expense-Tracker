import { useMemo } from "react";
import { useSession } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function useSupabaseClient() {
  const { session } = useSession();

  return useMemo(() => {
    return createClient(supabaseUrl, supabaseAnonKey, {
      async accessToken() {
        // Native Third-Party Auth: pass the plain Clerk session token.
        // No JWT template — that method is deprecated as of April 2025.
        return session?.getToken() ?? null;
      },
    });
  }, [session]);
}