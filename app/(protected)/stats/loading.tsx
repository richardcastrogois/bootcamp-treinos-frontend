// frontend/app/(protected)/stats/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsLoading() {
  return (
    <div className="flex min-h-svh flex-col bg-background pb-28">
      <div className="flex h-14 items-center px-5">
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="px-5">
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}
