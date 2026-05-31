import DashboardShell from "@/components/dashboard-shell";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";

type CourseRow = {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const { data: coursesData } = supabase
    ? await supabase
        .from("courses")
        .select("id, title, progress, icon_name, created_at")
        .order("created_at", { ascending: false })
    : { data: null };

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
