"use client";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SignInWithGoogle = () => {
  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="h-12 rounded-2xl bg-zinc-200 px-6 text-black text-base hover:bg-white/90"
    >
      <Image
        src="/google-icon.svg"
        alt=""
        width={19}
        height={19}
        className="shrink-0"
      />
      Fazer login com Google
    </Button>
  );
};
