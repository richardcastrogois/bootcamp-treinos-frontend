// frontend/app/(protected)/workout-plans/[id]/days/[dayId]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutDayLoading() {
  return (
    <div className="flex min-h-svh flex-col bg-background pb-28">
      <div className="flex items-center justify-between px-5 py-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-6 w-32" />
        <div className="size-10" />
      </div>

      <div className="px-5">
        <Skeleton className="h-50 w-full rounded-2xl" />
      </div>

      <div className="flex flex-col gap-3 px-5 pt-5">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}
