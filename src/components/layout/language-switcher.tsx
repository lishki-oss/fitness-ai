"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggle() {
    const next = locale === "he" ? "en" : "he";
    router.replace(pathname, { locale: next });
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5">
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium">
        {locale === "he" ? "EN" : "עב"}
      </span>
    </Button>
  );
}
