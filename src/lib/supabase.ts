import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Faltan las variables de entorno de Supabase.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
