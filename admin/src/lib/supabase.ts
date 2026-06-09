import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// TODO: !
export const supabaseF = createClient(
	import.meta.env.VITE_SUPABASE_F_URL,
	import.meta.env.VITE_SUPABASE_F_ANON_KEY,
);
