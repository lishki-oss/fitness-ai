"use client";

import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuestionnaireData } from "@/lib/validations/questionnaire";

interface Props {
  form: UseFormReturn<QuestionnaireData>;
}

const GOALS = [
  "weight_loss",
  "muscle_gain",
  "maintenance",
  "health",
  "performance",
] as const;

export function StepGoals({ form }: Props) {
  const t = useTranslations("questionnaire.goals");
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      <div className="space-y-3">
        <Label>{t("primaryGoal")}</Label>
        <RadioGroup
          value={watch("primaryGoal") || ""}
          onValueChange={(val) =>
            setValue("primaryGoal", val as typeof GOALS[number])
          }
          className="space-y-2"
        >
          {GOALS.map((goal) => (
            <div key={goal} className="flex items-center gap-2">
              <RadioGroupItem value={goal} id={`goal-${goal}`} />
              <Label
                htmlFor={`goal-${goal}`}
                className="font-normal cursor-pointer"
              >
                {t(`goalOptions.${goal}`)}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.primaryGoal && (
          <p className="text-sm text-destructive">
            {errors.primaryGoal.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetWeightKg">{t("targetWeight")}</Label>
          <Input
            id="targetWeightKg"
            type="number"
            step="0.1"
            {...register("targetWeightKg", { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeframeMonths">{t("timeframe")}</Label>
          <Input
            id="timeframeMonths"
            type="number"
            {...register("timeframeMonths", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalGoals">{t("additionalGoals")}</Label>
        <Textarea
          id="additionalGoals"
          {...register("additionalGoals")}
          placeholder={t("additionalGoalsPlaceholder")}
          rows={3}
        />
      </div>
    </div>
  );
}
