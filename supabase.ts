import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://opbbjjxfozbjhhjrjdsl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wYmJqanhmb3piamhoanJqZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxOTcwMDcsImV4cCI6MjAxMjc3MzAwN30.hkiH6_iHFqoHU2y4VSf1o5XtFvHWVwUmTs4mkUpMWQU";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
