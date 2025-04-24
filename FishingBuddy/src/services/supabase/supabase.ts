// services/supabase.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nlwzzcpzvxwkcdrpqhce.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sd3p6Y3B6dnh3a2NkcnBxaGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NTI0NDIsImV4cCI6MjA2MTAyODQ0Mn0._1Z8kvIaDNqDwQBDuJWBLPEuKnPVMu-hmNIW-5QsZDE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
