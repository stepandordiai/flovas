// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://jxtgobmjhdpxvqqkvkzr.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dGdvYm1qaGRweHZxcWt2a3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODE2MDUsImV4cCI6MjA5Mzc1NzYwNX0.1gytzk44je0UTA-GVQn8fHr4tiGTmRICtMqRXhqqvTk",
);
