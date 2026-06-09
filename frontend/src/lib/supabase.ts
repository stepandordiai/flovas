import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// TODO: !
export const supabaseF = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_F_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_F_ANON_KEY!,
);
