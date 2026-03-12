import { Suspense } from "react";
import { Chat } from "@/app/_components/chat";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Suspense>
        <Chat />
      </Suspense>
    </>
  );
}