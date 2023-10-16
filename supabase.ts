import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cmakrpgncvqxeybwuhsz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtYWtycGduY3ZxeGV5Ynd1aHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyMDAwOTIsImV4cCI6MjAwNzc3NjA5Mn0.7oRcVhPbwq93KQPVFI2KkBj0Lyr-lcukzyaHezJ0sMw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
