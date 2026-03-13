import { Suspense } from "react";
import { Chat } from "@/app/_components/chat";
import { ProtectedAppProvider } from "./_components/protected-app-provider";
import { getProtectedBootstrap } from "./_lib/get-protected-bootstrap";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { homeData } = await getProtectedBootstrap();

  return (
    <ProtectedAppProvider
      activeWorkoutPlanId={homeData.activeWorkoutPlanId ?? null}
    >
      {children}
      <Suspense>
        <Chat />
      </Suspense>
    </ProtectedAppProvider>
  );
}
