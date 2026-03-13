// frontend/app/(protected)/workout-plans/[id]/days/[dayId]/_components/complete-workout-button.tsx
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { completeWorkoutAction } from "../_actions";

interface CompleteWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      try {
        await completeWorkoutAction(workoutPlanId, workoutDayId, sessionId);

        toast.success("Treino concluído", {
          description: "Parabéns! Seu treino foi marcado como concluído.",
        });
      } catch {
        toast.error("Não foi possível concluir o treino.", {
          description: "Tente novamente em instantes.",
        });
      }
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleComplete}
      disabled={isPending}
      className="w-full rounded-full py-3 font-heading text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
    >
      {isPending && <Spinner className="size-4" />}
      {isPending ? "Concluindo..." : "Marcar como concluído"}
    </Button>
  );
}
