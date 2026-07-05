import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("noClients")}</p>
      <Link
        href="/clients/new"
        className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-primary-foreground font-medium transition-colors hover:bg-primary/90"
      >
        {t("addClient")}
      </Link>
    </div>
  );
}
