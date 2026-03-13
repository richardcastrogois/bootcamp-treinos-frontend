// frontend/app/(protected)/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedLoading() {
  return (
    <div className="flex min-h-svh flex-col bg-background pb-28">
      <div className="h-74 rounded-b-4xl bg-muted px-5 pb-10 pt-5">
        <div className="flex h-full flex-col justify-between">
          <Skeleton className="h-6 w-20 bg-white/20" />
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-36 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
            </div>
            <Skeleton className="h-10 w-20 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 pt-5">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-50 w-full" />
      </div>
    </div>
  );
}
