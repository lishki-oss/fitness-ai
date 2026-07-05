"use client";

import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuestionnaireData } from "@/lib/validations/questionnaire";

interface Props {
  form: UseFormReturn<QuestionnaireData>;
}

const COOKING_OPTIONS = ["daily", "few_times_week", "rarely", "never"] as const;
const EATING_OUT_OPTIONS = [
  "daily",
  "few_times_week",
  "weekly",
  "rarely",
] as const;

export function StepEatingHabits({ form }: Props) {
  const t = useTranslations("questionnaire.habits");
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mealsPerDay">{t("mealsPerDay")}</Label>
          <Input
            id="mealsPerDay"
            type="number"
            min="1"
            max="10"
            {...register("mealsPerDay", { valueAsNumber: true })}
          />
          {errors.mealsPerDay && (
            <p className="text-sm text-destructive">
              {errors.mealsPerDay.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="snacksPerDay">{t("snacksPerDay")}</Label>
          <Input
            id="snacksPerDay"
            type="number"
            min="0"
            max="10"
            {...register("snacksPerDay", { valueAsNumber: true })}
          />
          {errors.snacksPerDay && (
            <p className="text-sm text-destructive">
              {errors.snacksPerDay.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="waterLitersPerDay">{t("waterIntake")}</Label>
          <Input
            id="waterLitersPerDay"
            type="number"
            step="0.5"
            min="0"
            {...register("waterLitersPerDay", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("cookingFrequency")}</Label>
          <Select
            value={watch("cookingFrequency") || ""}
            onValueChange={(val) =>
              setValue(
                "cookingFrequency",
                val as typeof COOKING_OPTIONS[number]
              )
            }
          >
            <SelectTrigger>
              <SelectValue>
                {(value: string) => (value ? t(`cookingOptions.${value}`) : "")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {COOKING_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {t(`cookingOptions.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cookingFrequency && (
            <p className="text-sm text-destructive">
              {errors.cookingFrequency.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t("eatingOut")}</Label>
          <Select
            value={watch("eatingOutFrequency") || ""}
            onValueChange={(val) =>
              setValue(
                "eatingOutFrequency",
                val as typeof EATING_OUT_OPTIONS[number]
              )
            }
          >
            <SelectTrigger>
              <SelectValue>
                {(value: string) => (value ? t(`eatingOutOptions.${value}`) : "")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EATING_OUT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {t(`eatingOutOptions.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.eatingOutFrequency && (
            <p className="text-sm text-destructive">
              {errors.eatingOutFrequency.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentDietDescription">{t("currentDiet")}</Label>
        <Textarea
          id="currentDietDescription"
          {...register("currentDietDescription")}
          placeholder={t("currentDietPlaceholder")}
          rows={4}
        />
      </div>
    </div>
  );
}
