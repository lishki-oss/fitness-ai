import { useTranslations } from "next-intl";
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form";

export default function NewClientPage() {
  const t = useTranslations("questionnaire");

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </div>
      <QuestionnaireForm />
    </div>
  );
}
