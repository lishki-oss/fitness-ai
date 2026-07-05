"use client";

import { SessionProvider } from "next-auth/react";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <MobileNav />
      </div>
    </SessionProvider>
  );
}
