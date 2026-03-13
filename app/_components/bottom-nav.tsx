//frontend/app/_components/bottom-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { House, Calendar, ChartNoAxesColumn, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatOpenButton } from "@/app/_components/chat-open-button";
import { useProtectedApp } from "@/app/(protected)/_components/protected-app-provider";

type ActivePage = "home" | "calendar" | "stats" | "profile";

type NavItem = {
  key: ActivePage;
  href: string | null;
  icon: React.ComponentType<{ className?: string }>;
};

function getActivePage(pathname: string): ActivePage {
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/stats")) return "stats";
  if (pathname.startsWith("/workout-plans")) return "calendar";
  return "home";
}

export function BottomNav() {
  const pathname = usePathname();
  const { activeWorkoutPlanId } = useProtectedApp();

  const activePage = getActivePage(pathname);

  const calendarHref = activeWorkoutPlanId
    ? `/workout-plans/${activeWorkoutPlanId}`
    : null;

  const items: NavItem[] = [
    { key: "home", href: "/", icon: House },
    { key: "calendar", href: calendarHref, icon: Calendar },
    { key: "stats", href: "/stats", icon: ChartNoAxesColumn },
    { key: "profile", href: "/profile", icon: UserRound },
  ];

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full px-4 py-3",
          "border border-white/15 bg-black/45 shadow-[0_14px_40px_rgba(0,0,0,0.35)]",
          "backdrop-blur-sm supports-backdrop-filter:bg-black/20",
          "dark:border-white/10 dark:bg-zinc-950/55 dark:supports-backdrop-filter:bg-zinc-950/45",
        )}
      >
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;

          if (!item.href) {
            return (
              <button
                key={item.key}
                type="button"
                disabled
                className="relative flex size-12 items-center justify-center rounded-full opacity-45"
              >
                <span className="absolute inset-0 rounded-full bg-white/6 dark:bg-white/5" />
                <Icon className="relative z-10 size-5 text-white/60" />
              </button>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              className="relative flex size-12 items-center justify-center rounded-full"
            >
              {!isActive && (
                <span className="absolute inset-0 rounded-full bg-white/6 dark:bg-white/5" />
              )}

              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_22px_rgba(37,99,235,0.5)]"
                />
              )}

              <motion.span whileTap={{ scale: 0.92 }} className="relative z-10">
                <Icon
                  className={cn(
                    "size-5 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]",
                    isActive ? "text-primary-foreground" : "text-white/80",
                  )}
                />
              </motion.span>
            </Link>
          );
        })}

        <div className="mx-1">
          <ChatOpenButton />
        </div>

        {items.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;

          if (!item.href) {
            return (
              <button
                key={item.key}
                type="button"
                disabled
                className="relative flex size-12 items-center justify-center rounded-full opacity-45"
              >
                <span className="absolute inset-0 rounded-full bg-white/6 dark:bg-white/5" />
                <Icon className="relative z-10 size-5 text-white/60" />
              </button>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              className="relative flex size-12 items-center justify-center rounded-full"
            >
              {!isActive && (
                <span className="absolute inset-0 rounded-full bg-white/6 dark:bg-white/5" />
              )}

              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_22px_rgba(37,99,235,0.45)]"
                />
              )}

              <motion.span whileTap={{ scale: 0.92 }} className="relative z-10">
                <Icon
                  className={cn(
                    "size-5 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]",
                    isActive ? "text-primary-foreground" : "text-white/80",
                  )}
                />
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
