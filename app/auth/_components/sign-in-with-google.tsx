// frontend/app/auth/_components/sign-in-with-google.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const SignInWithGoogle = () => {
  const [isPending, setIsPending] = useState(false);

  const handleGoogleLogin = async () => {
    if (isPending) return;

    setIsPending(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      toast.error("Falha ao entrar com Google.", {
        description: error.message,
      });
      setIsPending(false);
      return;
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isPending}
      className="h-12 rounded-2xl bg-zinc-200 px-6 text-base text-black transition-all duration-200 active:scale-[0.98] hover:bg-white/90"
    >
      {isPending ? (
        <Spinner className="size-4 text-black" />
      ) : (
        <Image
          src="/google-icon.svg"
          alt=""
          width={19}
          height={19}
          className="shrink-0"
        />
      )}
      {isPending ? "Entrando..." : "Fazer login com Google"}
    </Button>
  );
};
