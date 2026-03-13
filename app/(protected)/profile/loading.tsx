// frontend/app/(protected)/profile/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="flex min-h-svh flex-col bg-background pb-28">
      <div className="flex h-14 items-center px-5">
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="flex flex-col items-center gap-5 px-5 pt-5">
        <div className="flex w-full items-center gap-3">
          <Skeleton className="size-13 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>

        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </div>
  );
}
