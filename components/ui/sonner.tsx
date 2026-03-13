// frontend/components/ui/sonner.tsx
"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      expand={false}
      duration={2600}
      toastOptions={{
        className: "rounded-2xl border border-border shadow-lg",
      }}
    />
  );
}
