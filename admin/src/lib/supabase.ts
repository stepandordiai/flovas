import { createClient } from "@supabase/supabase-js";

// FIXME:
export const supabase = createClient(
	"https://ctrsfeqrmqoomorjcaqx.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cnNmZXFybXFvb21vcmpjYXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDI0NzIsImV4cCI6MjA5NDA3ODQ3Mn0.jQBgBFjhdIHLsZRK1jdOBSd81KQe5Y9MqDfQJOJE2aI",
);
