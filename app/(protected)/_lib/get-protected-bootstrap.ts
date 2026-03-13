//frontend/app/(protected)/_lib/get-protected-bootstrap.ts
import { cache } from "react";
import { redirect } from "next/navigation";
import {
  getBootstrap,
  type GetBootstrap200,
} from "@/app/_lib/api/fetch-generated";

type NonNullableTrainData = NonNullable<GetBootstrap200["trainData"]>;

type ProtectedBootstrap = {
  user: GetBootstrap200["user"];
  today: string;
  homeData: GetBootstrap200["homeData"];
  trainData: NonNullableTrainData;
};

const BOOTSTRAP_DEBUG_ENABLED =
  process.env.NEXT_PUBLIC_DEBUG_BOOTSTRAP === "true";

function debugLog(message: string, ...args: unknown[]) {
  if (!BOOTSTRAP_DEBUG_ENABLED) return;
  console.log(`[bootstrap] ${message}`, ...args);
}

function debugError(message: string, error: unknown) {
  if (!BOOTSTRAP_DEBUG_ENABLED) return;
  console.error(`[bootstrap] ${message}`, error);
}

export const getProtectedBootstrap = cache(
  async (): Promise<ProtectedBootstrap> => {
    debugLog("start");

    let bootstrapResponse:
      | Awaited<ReturnType<typeof getBootstrap>>
      | undefined = undefined;

    try {
      debugLog("fetching bootstrap...");
      bootstrapResponse = await getBootstrap();
      debugLog("bootstrap fetched:", bootstrapResponse.status);
    } catch (error) {
      debugError("bootstrap fetch failed:", error);
      throw error;
    }

    if (bootstrapResponse.status === 401) {
      debugLog("no user, redirecting to /auth");
      redirect("/auth");
    }

    if (bootstrapResponse.status !== 200) {
      throw new Error("Failed to fetch bootstrap data");
    }

    const { user, homeData, trainData } = bootstrapResponse.data;

    const needsOnboarding = !homeData.activeWorkoutPlanId || !trainData;

    if (needsOnboarding) {
      debugLog("onboarding required, redirecting to /onboarding");
      redirect("/onboarding");
    }

    debugLog("done");

    return {
      user,
      today: new Date().toISOString().slice(0, 10),
      homeData,
      trainData,
    };
  },
);