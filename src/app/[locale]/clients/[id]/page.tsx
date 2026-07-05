import { notFound, redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Client, Questionnaire } from "@/generated/prisma/client";

type ClientWithQuestionnaire = Client & { questionnaire: Questionnaire | null };

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const client = await prisma.client.findUnique({
    where: { id, trainerId: session.user.id },
    include: { questionnaire: true },
  });

  if (!client) {
    notFound();
  }

  return <ClientDetailContent client={client as ClientWithQuestionnaire} locale={locale} />;
}

function ClientDetailContent({
  client,
  locale,
}: {
  client: ClientWithQuestionnaire;
  locale: string;
}) {
  const t = useTranslations("clients");
  const tQ = useTranslations("questionnaire");
  const q = client.questionnaire;
  const BackIcon = locale === "he" ? ArrowRight : ArrowLeft;

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6 md:py-10">
      <Link href="/clients">
        <Button variant="ghost" className="gap-2 mb-4">
          <BackIcon className="h-4 w-4" />
          {t("title")}
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-2">
        {q ? `${q.firstName} ${q.lastName}` : t("clientDetails")}
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        {t("createdAt")}: {new Date(client.createdAt).toLocaleDateString()}
      </p>

      {q ? (
        <div className="space-y-4">
          <SectionCard title={tQ("steps.personal")}>
            <InfoRow label={tQ("personal.age")} value={q.age} />
            <InfoRow
              label={tQ("personal.gender")}
              value={tQ(`personal.genderOptions.${q.gender}`)}
            />
            <InfoRow label={tQ("personal.height")} value={`${q.heightCm} cm`} />
            <InfoRow label={tQ("personal.weight")} value={`${q.weightKg} kg`} />
            <InfoRow
              label={tQ("personal.activityLevel")}
              value={tQ(`personal.activityOptions.${q.activityLevel}`)}
            />
          </SectionCard>

          <SectionCard title={tQ("steps.health")}>
            <TagRow
              label={tQ("health.conditions")}
              items={q.healthConditions.map((c) =>
                tQ(`health.conditionOptions.${c}`)
              )}
            />
            <TagRow
              label={tQ("health.allergies")}
              items={q.allergies.map((a) => tQ(`health.allergyOptions.${a}`))}
            />
            {q.medications && (
              <InfoRow label={tQ("health.medications")} value={q.medications} />
            )}
          </SectionCard>

          <SectionCard title={tQ("steps.goals")}>
            <InfoRow
              label={tQ("goals.primaryGoal")}
              value={tQ(`goals.goalOptions.${q.primaryGoal}`)}
            />
            {q.targetWeightKg && (
              <InfoRow
                label={tQ("goals.targetWeight")}
                value={`${q.targetWeightKg} kg`}
              />
            )}
            {q.timeframeMonths && (
              <InfoRow
                label={tQ("goals.timeframe")}
                value={`${q.timeframeMonths}`}
              />
            )}
          </SectionCard>

          <SectionCard title={tQ("steps.habits")}>
            <InfoRow label={tQ("habits.mealsPerDay")} value={q.mealsPerDay} />
            <InfoRow label={tQ("habits.snacksPerDay")} value={q.snacksPerDay} />
            {q.waterLitersPerDay && (
              <InfoRow
                label={tQ("habits.waterIntake")}
                value={`${q.waterLitersPerDay}L`}
              />
            )}
            <InfoRow
              label={tQ("habits.cookingFrequency")}
              value={tQ(`habits.cookingOptions.${q.cookingFrequency}`)}
            />
            <InfoRow
              label={tQ("habits.eatingOut")}
              value={tQ(`habits.eatingOutOptions.${q.eatingOutFrequency}`)}
            />
            {q.currentDietDescription && (
              <InfoRow
                label={tQ("habits.currentDiet")}
                value={q.currentDietDescription}
              />
            )}
          </SectionCard>

          <SectionCard title={tQ("steps.preferences")}>
            <TagRow
              label={tQ("preferences.dietaryRestrictions")}
              items={q.dietaryRestrictions.map((r) =>
                tQ(`preferences.restrictionOptions.${r}`)
              )}
            />
            {q.likedFoods.length > 0 && (
              <TagRow
                label={tQ("preferences.likedFoods")}
                items={q.likedFoods}
              />
            )}
            {q.dislikedFoods.length > 0 && (
              <TagRow
                label={tQ("preferences.dislikedFoods")}
                items={q.dislikedFoods}
              />
            )}
            {q.notes && (
              <InfoRow label={tQ("preferences.notes")} value={q.notes} />
            )}
          </SectionCard>
        </div>
      ) : (
        <p className="text-muted-foreground">{t("noClients")}</p>
      )}
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 space-y-2">{children}</CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between py-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <Separator />
    </>
  );
}

function TagRow({ label, items }: { label: string; items: string[] }) {
  return (
    <>
      <div className="py-1">
        <span className="text-sm text-muted-foreground block mb-1">
          {label}
        </span>
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {items.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>
      <Separator />
    </>
  );
}
