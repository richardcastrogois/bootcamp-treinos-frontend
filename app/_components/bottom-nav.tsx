//frontend/app/_components/bottom-nav.tsx
"use client";

import Link from "next/link";
import { House, Calendar, ChartNoAxesColumn, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatOpenButton } from "@/app/_components/chat-open-button";
import { useProtectedApp } from "@/app/(protected)/_components/protected-app-provider";

interface BottomNavProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
}

export function BottomNav({ activePage = "home" }: BottomNavProps) {
  const { activeWorkoutPlanId } = useProtectedApp();

  const calendarHref = activeWorkoutPlanId
    ? `/workout-plans/${activeWorkoutPlanId}`
    : null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 rounded-t-4xl border border-border bg-background px-6 py-4">
      <Link href="/" className="p-3">
        <House
          className={cn(
            "size-6",
            activePage === "home" ? "text-foreground" : "text-muted-foreground",
          )}
        />
      </Link>

      {calendarHref ? (
        <Link href={calendarHref} className="p-3">
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Link>
      ) : (
        <button type="button" className="p-3" disabled>
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </button>
      )}

      <ChatOpenButton />

      <Link href="/stats" className="p-3">
        <ChartNoAxesColumn
          className={cn(
            "size-6",
            activePage === "stats"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Link>

      <Link href="/profile" className="p-3">
        <UserRound
          className={cn(
            "size-6",
            activePage === "profile"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Link>
    </nav>
  );
}
