"use client";

import { useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">{tCommon("appName")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("dashboard")}
          </Link>
          <Link
            href="/clients"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("clients")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {session && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{t("logout")}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
