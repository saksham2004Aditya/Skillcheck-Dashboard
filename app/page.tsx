import DashboardShell from "@/components/dashboard-shell";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
type CourseRow = {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
};

export default async function DashboardPage() {
  let supabase: any = null;
  let user: any = null;
  let coursesData: CourseRow[] | null = null;

  try {
    supabase = await createSupabaseServerClient();

    if (!supabase) {
      console.warn("SUPABASE_ENV_MISSING: server supabase client not initialized");
    } else {
      // Fetch user safely
      try {
        const userRes = await supabase.auth.getUser();
        user = userRes?.data?.user ?? null;
      } catch (uErr) {
        console.error("SUPABASE_AUTH_ERROR", uErr);
      }

      // Fetch courses safely
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("id,title,progress,icon_name,created_at")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("SUPABASE_FETCH_ERROR", error.message ?? error);
        } else {
          coursesData = data as CourseRow[];
        }
      } catch (qErr) {
        console.error("SUPABASE_QUERY_EXCEPTION", qErr);
      }
    }
  } catch (serverErr) {
    console.error("SERVER_RENDER_EXCEPTION", serverErr);
  }

  const fallbackName =
    user?.user_metadata?.name ?? user?.email?.split("@")[0] ?? "Saksham";
  const signedInLabel = user?.email ?? "No Supabase session";

  const courses: CourseRow[] =
    coursesData && coursesData.length > 0
      ? coursesData
      : [
          {
            id: "fallback-react",
            title: "React Course",
            progress: 75,
            icon_name: "BookOpen",
            created_at: new Date().toISOString(),
          },
          {
            id: "fallback-next",
            title: "Next.js Course",
            progress: 40,
            icon_name: "Sparkles",
            created_at: new Date().toISOString(),
          },
        ];

  return (
    <DashboardShell
      fallbackName={fallbackName}
      signedInLabel={signedInLabel}
      courses={courses}
    />
  );
}
