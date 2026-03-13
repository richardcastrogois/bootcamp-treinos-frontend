// frontend/app/(protected)/workout-plans/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutPlanLoading() {
  return (
    <div className="flex min-h-svh flex-col bg-background pb-28">
      <div className="h-74 rounded-b-4xl bg-muted px-5 pb-10 pt-5">
        <div className="flex h-full flex-col justify-between">
          <Skeleton className="h-6 w-20 bg-white/20" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-40 bg-white/20" />
            <Skeleton className="h-9 w-56 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-50 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-50 w-full rounded-2xl" />
      </div>
    </div>
  );
}
