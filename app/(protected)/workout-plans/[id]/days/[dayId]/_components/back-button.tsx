// frontend/app/(protected)/workout-plans/[id]/days/[dayId]/_components/back-button.tsx
"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <motion.div whileTap={{ scale: 0.94 }}>
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ChevronLeft className="size-6 text-foreground" />
      </Button>
    </motion.div>
  );
}
