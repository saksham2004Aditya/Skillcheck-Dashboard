"use client";

import { useState } from "react";
import Sidebar, { type SidebarSection } from "@/components/sidebar";
import HeroGreeting from "@/components/hero-greeting";
import { motion, type Variants } from "framer-motion";
import {
  Atom,
  BarChart3,
  BookOpen,
  Flame,
  Layers,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type CourseRow = {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
};

type DashboardShellProps = {
  fallbackName: string;
  signedInLabel: string | null;
  courses: CourseRow[];
};

const iconMap: Record<string, LucideIcon> = {
  Atom,
  BookOpen,
  Layers,
  Sparkles,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function DashboardShell({
  fallbackName,
  signedInLabel,
  courses,
}: DashboardShellProps) {
  const [activeSection, setActiveSection] = useState<SidebarSection>("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id ?? "");
  const activityBars = [34, 58, 46, 72, 52, 84, 61, 90, 66, 78, 48, 82];
  const selectedCourse = courses.find((course) => course.id === selectedCourseId) ?? courses[0];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 lg:flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 px-4 pb-24 pt-6 md:px-6 md:pb-24 lg:px-8 lg:pb-8 lg:pt-8">
        <motion.section
          className="mx-auto flex max-w-7xl flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {activeSection === "dashboard" ? (
            <motion.section className="grid auto-rows-[180px] grid-cols-1 gap-6 md:grid-cols-6 lg:auto-rows-[200px] xl:grid-cols-12" variants={containerVariants}>
              <motion.article
                className="relative overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%),linear-gradient(180deg,rgba(24,24,27,0.95),rgba(9,9,11,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] md:col-span-6 md:row-span-2 xl:col-span-7 xl:row-span-2 xl:p-8"
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                  <div className="inline-flex w-fit items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
                    <HeroGreeting fallbackName={fallbackName} />
                  </div>

                  <div className="max-w-xl">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                      Learning streak
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl xl:text-6xl">
                      Keep the momentum going today.
                    </h1>
                    <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400 md:text-base">
                      You are on a 15-day streak. Pick up where you left off, review
                      your progress, and continue through the next lesson flow.
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      {signedInLabel ? `Connected as ${signedInLabel}` : "Supabase not connected"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800/80 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                      <Flame className="size-4 text-orange-400" />
                      15 day streak
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800/80 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                      <TrendingUp className="size-4 text-cyan-300" />
                      +24% this week
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800/80 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                      <Sparkles className="size-4 text-sky-300" />
                      4 lessons queued
                    </div>
                  </div>
                </div>
              </motion.article>

              {courses.map((course, index) => {
                const Icon = iconMap[course.icon_name] ?? BookOpen;

                return (
                  <motion.article
                    key={course.id}
                    className="relative overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-white/[0.03] p-5 md:col-span-3 xl:col-span-2 xl:row-span-1"
                    variants={itemVariants}
                    whileHover={{ y: -2, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        index % 2 === 0
                          ? "from-cyan-400/15 to-transparent"
                          : "from-sky-400/15 to-transparent"
                      }`}
                    />
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <Icon className="size-5 text-zinc-300" />
                        <span className="rounded-full border border-zinc-800 bg-zinc-950/60 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                          Course
                        </span>
                      </div>
                      <div>
                        <h2 className="mt-4 text-xl font-semibold text-zinc-50">
                          {course.title}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                          {course.progress}% complete
                        </p>
                      </div>
                      <div className="mt-5 h-2 rounded-full bg-zinc-900/80">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            index % 2 === 0
                              ? "from-cyan-400 to-sky-500"
                              : "from-sky-400 to-blue-500"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              <motion.article
                className="relative overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_40%),linear-gradient(180deg,rgba(24,24,27,0.95),rgba(9,9,11,0.96))] p-5 md:col-span-6 md:row-span-2 xl:col-span-5 xl:row-span-2"
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative z-10 flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
                        Activity
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-zinc-50">
                        Weekly contribution
                      </h2>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-white/[0.04] p-3 text-cyan-300">
                      <BarChart3 className="size-5" />
                    </div>
                  </div>

                  <div className="flex flex-1 items-end gap-2 rounded-[1.5rem] border border-zinc-800/80 bg-black/20 p-4">
                    {activityBars.map((height, index) => (
                      <div key={`${height}-${index}`} className="flex-1">
                        <div
                          className="mx-auto w-full max-w-6 rounded-full bg-gradient-to-t from-cyan-400/70 via-sky-400/80 to-blue-500"
                          style={{ height: `${height}%`, minHeight: "1.25rem" }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300 md:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-800/80 bg-white/[0.03] p-4">
                      <p className="text-zinc-500">Lessons</p>
                      <p className="mt-1 text-lg font-semibold text-zinc-50">18</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-800/80 bg-white/[0.03] p-4">
                      <p className="text-zinc-500">Watch time</p>
                      <p className="mt-1 text-lg font-semibold text-zinc-50">6.2h</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-800/80 bg-white/[0.03] p-4 md:col-span-1 col-span-2">
                      <p className="text-zinc-500">Focus score</p>
                      <p className="mt-1 text-lg font-semibold text-zinc-50">92%</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </motion.section>
          ) : activeSection === "courses" ? (
            <motion.section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" variants={containerVariants} initial="hidden" animate="show">
              <motion.article
                className="rounded-[2rem] border border-zinc-800/80 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_30%),linear-gradient(180deg,rgba(24,24,27,0.96),rgba(9,9,11,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-8"
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                  Courses detail
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
                  Your course library
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                  Open the Courses section to see the full list of records from Supabase.
                  Each card shows the title, progress, and icon from your database.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {courses.map((course) => {
                    const Icon = iconMap[course.icon_name] ?? BookOpen;
                    const isSelected = course.id === selectedCourseId;

                    return (
                      <motion.div
                        key={course.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedCourseId(course.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedCourseId(course.id);
                          }
                        }}
                        className={`rounded-3xl border p-5 outline-none transition-[border-color,box-shadow,transform] duration-200 ${
                          isSelected
                            ? "border-cyan-400/60 bg-white/[0.06] shadow-[0_0_0_1px_rgba(34,211,238,0.18)]"
                            : "border-zinc-800/80 bg-white/[0.03]"
                        }`}
                        variants={itemVariants}
                        whileHover={{ y: -2, scale: 1.015 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="size-5 text-cyan-300" />
                          <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                            {course.icon_name}
                          </span>
                        </div>
                        <h2 className="mt-4 text-xl font-semibold text-zinc-50">
                          {course.title}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                          Progress: {course.progress}%
                        </p>
                        <div className="mt-4 h-2 rounded-full bg-zinc-900/80">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.article>

              <motion.aside
                className="rounded-[2rem] border border-zinc-800/80 bg-white/[0.03] p-6 md:p-8"
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                  Selected course
                </p>
                {selectedCourse ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-zinc-50">
                        {selectedCourse.title}
                      </h2>
                      <p className="mt-2 text-sm text-zinc-400">
                        Row ID: {selectedCourse.id}
                      </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/50 p-5">
                      <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Icon</span>
                        <span>{selectedCourse.icon_name}</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-zinc-900/80">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-[width] duration-500 ease-out"
                          style={{ width: `${selectedCourse.progress}%` }}
                        />
                      </div>
                      <p className="mt-3 text-sm text-zinc-400">
                        Progress: {selectedCourse.progress}%
                      </p>
                    </div>

                    <p className="text-sm leading-6 text-zinc-300">
                      Click a different course tile to swap this panel and inspect another row from Supabase.
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-400">
                    No course selected.
                  </p>
                )}
              </motion.aside>
            </motion.section>
          ) : activeSection === "analytics" ? (
            <motion.section className="rounded-[2rem] border border-zinc-800/80 bg-white/[0.03] p-6 md:p-8" variants={itemVariants} initial="hidden" animate="show">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                Analytics
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-zinc-50">Analytics view</h1>
              <p className="mt-3 text-zinc-400">This section is ready for additional charts and metrics.</p>
            </motion.section>
          ) : (
            <motion.section className="rounded-[2rem] border border-zinc-800/80 bg-white/[0.03] p-6 md:p-8" variants={itemVariants} initial="hidden" animate="show">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                Settings
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-zinc-50">Settings view</h1>
              <p className="mt-3 text-zinc-400">Use this section for profile and app preferences.</p>
            </motion.section>
          )}
        </motion.section>
      </main>
    </div>
  );
}
