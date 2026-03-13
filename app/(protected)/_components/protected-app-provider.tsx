//frontend/app/(protected)/_components/protected-app-provider.tsx
"use client";

import { createContext, useContext } from "react";

type ProtectedAppContextValue = {
  activeWorkoutPlanId: string | null;
};

const ProtectedAppContext = createContext<ProtectedAppContextValue | null>(
  null,
);

type ProtectedAppProviderProps = {
  activeWorkoutPlanId: string | null;
  children: React.ReactNode;
};

export function ProtectedAppProvider({
  activeWorkoutPlanId,
  children,
}: ProtectedAppProviderProps) {
  return (
    <ProtectedAppContext.Provider value={{ activeWorkoutPlanId }}>
      {children}
    </ProtectedAppContext.Provider>
  );
}

export function useProtectedApp() {
  const context = useContext(ProtectedAppContext);

  if (!context) {
    throw new Error("useProtectedApp must be used within ProtectedAppProvider");
  }

  return context;
}
