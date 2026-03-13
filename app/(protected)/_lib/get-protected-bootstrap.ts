import { cache } from "react";
import dayjs from "dayjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import {
  getHomeData,
  getUserTrainData,
  type GetHomeData200,
  type GetUserTrainData200,
} from "@/app/_lib/api/fetch-generated";

type NonNullableTrainData = NonNullable<GetUserTrainData200>;

type ProtectedBootstrap = {
  user: NonNullable<
    Awaited<ReturnType<typeof authClient.getSession>>["data"]
  >["user"];
  today: string;
  homeData: GetHomeData200;
  trainData: NonNullableTrainData;
};

export const getProtectedBootstrap = cache(
  async (): Promise<ProtectedBootstrap> => {
    console.log("[bootstrap] start");

    let session: Awaited<ReturnType<typeof authClient.getSession>> | undefined =
      undefined;

    try {
      console.log("[bootstrap] fetching session...");
      session = await authClient.getSession({
        fetchOptions: {
          headers: await headers(),
        },
      });
      console.log("[bootstrap] session fetched");
    } catch (error) {
      console.error("[bootstrap] session fetch failed:", error);
      throw error;
    }

    if (!session.data?.user) {
      console.log("[bootstrap] no user, redirecting to /auth");
      redirect("/auth");
    }

    const today = dayjs().format("YYYY-MM-DD");

    let homeDataResponse: Awaited<ReturnType<typeof getHomeData>> | undefined =
      undefined;

    try {
      console.log("[bootstrap] fetching home data...");
      homeDataResponse = await getHomeData(today);
      console.log("[bootstrap] home data fetched:", homeDataResponse.status);
    } catch (error) {
      console.error("[bootstrap] home data fetch failed:", error);
      throw error;
    }

    if (homeDataResponse.status !== 200) {
      throw new Error("Failed to fetch home data");
    }

    let trainDataResponse:
      | Awaited<ReturnType<typeof getUserTrainData>>
      | undefined = undefined;

    try {
      console.log("[bootstrap] fetching user train data...");
      trainDataResponse = await getUserTrainData();
      console.log(
        "[bootstrap] user train data fetched:",
        trainDataResponse.status,
      );
    } catch (error) {
      console.error("[bootstrap] user train data fetch failed:", error);
      throw error;
    }

    if (trainDataResponse.status !== 200) {
      throw new Error("Failed to fetch user train data");
    }

    const homeData = homeDataResponse.data;
    const trainData = trainDataResponse.data;

    const needsOnboarding = !homeData.activeWorkoutPlanId || !trainData;

    if (needsOnboarding) {
      console.log(
        "[bootstrap] onboarding required, redirecting to /onboarding",
      );
      redirect("/onboarding");
    }

    console.log("[bootstrap] done");

    return {
      user: session.data.user,
      today,
      homeData,
      trainData,
    };
  },
);
