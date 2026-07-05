"use client";

import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import type { QuestionnaireData } from "@/lib/validations/questionnaire";

interface Props {
  form: UseFormReturn<QuestionnaireData>;
  onEditStep: (step: number) => void;
}

function SectionCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("questionnaire.summary");
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onEdit} className="gap-1">
          <Pencil className="h-3 w-3" />
          {t("editStep")}
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">{children}</CardContent>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="text-xs">
          {item}
        </Badge>
      ))}
    </div>
  );
}

export function StepSummary({ form, onEditStep }: Props) {
  const t = useTranslations("questionnaire");
  const data = form.getValues();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("summary.title")}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t("summary.subtitle")}
        </p>
      </div>

      <SectionCard title={t("steps.personal")} onEdit={() => onEditStep(0)}>
        <div className="space-y-1">
          <Field
            label={t("personal.firstName")}
            value={`${data.firstName} ${data.lastName}`}
          />
          <Separator />
          <Field label={t("personal.age")} value={data.age} />
          <Separator />
          <Field
            label={t("personal.gender")}
            value={data.gender ? t(`personal.genderOptions.${data.gender}`) : ""}
          />
          <Separator />
          <Field label={t("personal.height")} value={`${data.heightCm} cm`} />
          <Separator />
          <Field label={t("personal.weight")} value={`${data.weightKg} kg`} />
          <Separator />
          <Field
            label={t("personal.activityLevel")}
            value={
              data.activityLevel
                ? t(`personal.activityOptions.${data.activityLevel}`)
                : ""
            }
          />
        </div>
      </SectionCard>

      <SectionCard title={t("steps.health")} onEdit={() => onEditStep(1)}>
        <div className="space-y-2">
          <div>
            <span className="text-sm text-muted-foreground block mb-1">
              {t("health.conditions")}
            </span>
            <TagList
              items={(data.healthConditions || []).map((c) =>
                t(`health.conditionOptions.${c}`)
              )}
            />
          </div>
          <Separator />
          <div>
            <span className="text-sm text-muted-foreground block mb-1">
              {t("health.allergies")}
            </span>
            <TagList
              items={(data.allergies || []).map((a) =>
                t(`health.allergyOptions.${a}`)
              )}
            />
          </div>
          {data.medications && (
            <>
              <Separator />
              <Field label={t("health.medications")} value={data.medications} />
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title={t("steps.goals")} onEdit={() => onEditStep(2)}>
        <div className="space-y-1">
          <Field
            label={t("goals.primaryGoal")}
            value={
              data.primaryGoal
                ? t(`goals.goalOptions.${data.primaryGoal}`)
                : ""
            }
          />
          {data.targetWeightKg && (
            <>
              <Separator />
              <Field
                label={t("goals.targetWeight")}
                value={`${data.targetWeightKg} kg`}
              />
            </>
          )}
          {data.timeframeMonths && (
            <>
              <Separator />
              <Field
                label={t("goals.timeframe")}
                value={`${data.timeframeMonths}`}
              />
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title={t("steps.habits")} onEdit={() => onEditStep(3)}>
        <div className="space-y-1">
          <Field label={t("habits.mealsPerDay")} value={data.mealsPerDay} />
          <Separator />
          <Field label={t("habits.snacksPerDay")} value={data.snacksPerDay} />
          {data.waterLitersPerDay && (
            <>
              <Separator />
              <Field
                label={t("habits.waterIntake")}
                value={`${data.waterLitersPerDay}L`}
              />
            </>
          )}
          <Separator />
          <Field
            label={t("habits.cookingFrequency")}
            value={
              data.cookingFrequency
                ? t(`habits.cookingOptions.${data.cookingFrequency}`)
                : ""
            }
          />
          <Separator />
          <Field
            label={t("habits.eatingOut")}
            value={
              data.eatingOutFrequency
                ? t(`habits.eatingOutOptions.${data.eatingOutFrequency}`)
                : ""
            }
          />
        </div>
      </SectionCard>

      <SectionCard title={t("steps.preferences")} onEdit={() => onEditStep(4)}>
        <div className="space-y-2">
          <div>
            <span className="text-sm text-muted-foreground block mb-1">
              {t("preferences.dietaryRestrictions")}
            </span>
            <TagList
              items={(data.dietaryRestrictions || []).map((r) =>
                t(`preferences.restrictionOptions.${r}`)
              )}
            />
          </div>
          {(data.likedFoods || []).length > 0 && (
            <>
              <Separator />
              <div>
                <span className="text-sm text-muted-foreground block mb-1">
                  {t("preferences.likedFoods")}
                </span>
                <TagList items={data.likedFoods || []} />
              </div>
            </>
          )}
          {(data.dislikedFoods || []).length > 0 && (
            <>
              <Separator />
              <div>
                <span className="text-sm text-muted-foreground block mb-1">
                  {t("preferences.dislikedFoods")}
                </span>
                <TagList items={data.dislikedFoods || []} />
              </div>
            </>
          )}
          {data.notes && (
            <>
              <Separator />
              <Field label={t("preferences.notes")} value={data.notes} />
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
