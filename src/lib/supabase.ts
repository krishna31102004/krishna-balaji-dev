import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Shared Supabase client for the live features (cursors, visitor globe).
 * Null until the env vars are set, and those features hide.
 */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
