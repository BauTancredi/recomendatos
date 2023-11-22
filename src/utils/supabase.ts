import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

let supabase: SupabaseClient | null = null;

export const initializeSupabase = (supabaseAccessToken: string) => {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
      db: {
        schema: "public",
      },
    });
  }
};

export const getSupabase = () => {
  if (!supabase) {
    throw new Error("Supabase has not been initialized. Please call initializeSupabase() first.");
  }
  return supabase;
};
