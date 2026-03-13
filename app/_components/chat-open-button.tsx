// frontend/app/_components/chat-open-button.tsx
"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";

export function ChatOpenButton() {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onClick={() => setChatParams({ chat_open: true })}
      className="relative z-10 rounded-full bg-primary p-4 shadow-[0_10px_30px_rgba(59,91,246,0.35)]"
    >
      <Sparkles className="size-6 text-primary-foreground" />
    </motion.button>
  );
}
