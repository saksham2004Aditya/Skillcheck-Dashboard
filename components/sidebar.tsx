"use client";

import type { JSX } from "react";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";

export type SidebarSection = "dashboard" | "courses" | "analytics" | "settings";

type NavigationItem = {
  id: SidebarSection;
  label: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

type SidebarProps = {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
};

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps): JSX.Element {
  const activeIndex = Math.max(
    0,
    navigationItems.findIndex((item) => item.id === activeSection),
  );

  return (
    <aside
      aria-label="Primary"
      className="relative z-50 shrink-0 md:w-20 lg:w-72"
    >
      <div className="fixed inset-x-0 bottom-0 border-t border-zinc-800/80 bg-zinc-950/95 px-3 py-3 shadow-[0_-16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl md:sticky md:top-0 md:flex md:h-screen md:w-full md:flex-col md:border-r md:border-t-0 md:px-2 md:py-4 lg:px-4 lg:py-6">
        <div className="hidden lg:flex items-center gap-3 rounded-3xl border border-zinc-800/80 bg-white/[0.03] px-4 py-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20">
            LD
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">Learning Dashboard</p>
            <p className="text-xs text-zinc-400">Fast, focused navigation</p>
          </div>
        </div>

        <nav className="mt-0 flex w-full items-center justify-between gap-2 md:mt-4 md:flex-col md:justify-start md:gap-3 lg:mt-6 lg:items-stretch">
          <LayoutGroup id="sidebar-navigation">
            {navigationItems.map((item, index) => {
              const isActive = index === activeIndex;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSectionChange(item.id)}
                  whileHover={{ y: -1, scale: 1.01, opacity: 0.98 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative isolate flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-transparent px-3 py-3 text-zinc-400 transition-[color,transform,opacity] duration-200 ease-out will-change-transform hover:text-zinc-100 md:h-14 md:w-14 md:flex-none md:px-0 lg:h-12 lg:w-full lg:justify-start lg:px-4"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute inset-0 rounded-2xl border border-white/10 bg-white/7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                    />
                  ) : null}

                  <span className="relative z-10 flex w-full flex-col items-center justify-center gap-1 md:flex-col lg:flex-row lg:justify-start lg:gap-3">
                    <span className="grid size-9 place-items-center rounded-xl border border-zinc-800/80 bg-white/[0.03] text-current transition-transform duration-200 ease-out group-hover:scale-[1.02]">
                      <Icon className="size-5" strokeWidth={2.2} />
                    </span>
                    <span className="text-[11px] font-medium tracking-wide text-current md:hidden lg:inline-flex lg:text-sm">
                      {item.label}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </LayoutGroup>
        </nav>
      </div>
    </aside>
  );
}

