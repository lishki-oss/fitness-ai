"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StepPersonalInfo } from "./step-personal-info";
import { StepHealth } from "./step-health";
import { StepGoals } from "./step-goals";
import { StepEatingHabits } from "./step-eating-habits";
import { StepPreferences } from "./step-preferences";
import { StepSummary } from "./step-summary";
import {
  questionnaireSchema,
  stepSchemas,
  STEP_KEYS,
  type QuestionnaireData,
} from "@/lib/validations/questionnaire";

export function QuestionnaireForm() {
  const t = useTranslations("questionnaire");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<QuestionnaireData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(questionnaireSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      age: undefined as unknown as number,
      gender: undefined as unknown as "male" | "female" | "other",
      heightCm: undefined as unknown as number,
      weightKg: undefined as unknown as number,
      activityLevel: undefined as unknown as "sedentary",
      healthConditions: [],
      allergies: [],
      medications: "",
      dietaryRestrictions: [],
      primaryGoal: undefined as unknown as "weight_loss",
      targetWeightKg: undefined,
      timeframeMonths: undefined,
      additionalGoals: "",
      mealsPerDay: undefined as unknown as number,
      snacksPerDay: 0,
      waterLitersPerDay: undefined,
      cookingFrequency: undefined as unknown as "daily",
      eatingOutFrequency: undefined as unknown as "daily",
      currentDietDescription: "",
      likedFoods: [],
      dislikedFoods: [],
      notes: "",
    },
    mode: "onTouched",
  });

  const totalSteps = STEP_KEYS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  async function nextStep() {
    if (step >= totalSteps - 1) return;

    if (step < stepSchemas.length) {
      const schema = stepSchemas[step];
      const fields = Object.keys(schema.shape) as (keyof QuestionnaireData)[];
      const valid = await form.trigger(fields);
      if (!valid) return;
    }

    setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: QuestionnaireData) {
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create client");
      }

      router.push("/clients");
      router.refresh();
    } catch {
      setSubmitError(t("summary.error"));
    } finally {
      setSubmitting(false);
    }
  }

  const isSummary = step === totalSteps - 1;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t("step", { current: step + 1, total: totalSteps })}
          </span>
          <span className="text-sm font-medium">
            {t(`steps.${STEP_KEYS[step]}`)}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-[400px]">
          {step === 0 && <StepPersonalInfo form={form} />}
          {step === 1 && <StepHealth form={form} />}
          {step === 2 && <StepGoals form={form} />}
          {step === 3 && <StepEatingHabits form={form} />}
          {step === 4 && <StepPreferences form={form} />}
          {step === 5 && <StepSummary form={form} onEditStep={setStep} />}
        </div>

        {submitError && (
          <p className="text-sm text-destructive text-center mt-4">
            {submitError}
          </p>
        )}

        <div className="flex justify-between mt-8 gap-4">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              {tCommon("back")}
            </Button>
          ) : (
            <div />
          )}

          {isSummary ? (
            <Button type="submit" disabled={submitting}>
              {submitting
                ? t("summary.submitting")
                : t("summary.confirmSubmit")}
            </Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              {tCommon("next")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
