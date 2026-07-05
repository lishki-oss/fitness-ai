import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("nav");

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-2xl font-bold">{t("settings")}</h1>
      <p className="text-muted-foreground mt-2">Coming soon...</p>
    </div>
  );
}
