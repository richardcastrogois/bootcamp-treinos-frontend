// frontend/app/(protected)/workout-plans/[id]/days/[dayId]/_components/start-workout-button.tsx
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { startWorkoutAction } from "../_actions";

interface StartWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
}

export function StartWorkoutButton({
  workoutPlanId,
  workoutDayId,
}: StartWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleStart = () => {
    startTransition(async () => {
      try {
        await startWorkoutAction(workoutPlanId, workoutDayId);

        toast("Treino iniciado", {
          description: "Seu treino foi iniciado com sucesso.",
        });
      } catch {
        toast.error("Não foi possível iniciar o treino.", {
          description: "Tente novamente em instantes.",
        });
      }
    });
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isPending}
      className="rounded-full px-4 py-2 font-heading text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
    >
      {isPending && <Spinner className="size-4 text-primary-foreground" />}
      {isPending ? "Iniciando..." : "Iniciar Treino"}
    </Button>
  );
}
