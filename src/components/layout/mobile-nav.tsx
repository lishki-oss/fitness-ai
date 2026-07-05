"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, labelKey: "dashboard" },
  { href: "/clients", icon: Users, labelKey: "clients" },
  { href: "/settings", icon: Settings, labelKey: "settings" },
] as const;

export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[64px] py-1 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
