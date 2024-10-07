import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWNxZmdsZXpudHRmcWZ5YXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMzQ1MTUsImV4cCI6MjA0MzgxMDUxNX0.k0RUTBIt6TchMDYgl5FkM5yYZkZTmR5_nE1mzU1IHWE";

const supabaseUrl = "https://tqecqfgleznttfqfyasu.supabase.co";
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
