"use client";

import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const ACTIVITY_LEVELS = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very_active",
] as const;

export function StepPersonalInfo({ form }: Props) {
  const t = useTranslations("questionnaire.personal");
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("firstName")}</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")}</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">{t("age")}</Label>
          <Input id="age" type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age && (
            <p className="text-sm text-destructive">{errors.age.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="heightCm">{t("height")}</Label>
          <Input id="heightCm" type="number" step="0.1" {...register("heightCm", { valueAsNumber: true })} />
          {errors.heightCm && (
            <p className="text-sm text-destructive">{errors.heightCm.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="weightKg">{t("weight")}</Label>
          <Input id="weightKg" type="number" step="0.1" {...register("weightKg", { valueAsNumber: true })} />
          {errors.weightKg && (
            <p className="text-sm text-destructive">{errors.weightKg.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label>{t("gender")}</Label>
        <RadioGroup
          value={watch("gender") || ""}
          onValueChange={(val) => setValue("gender", val as "male" | "female" | "other")}
          className="flex gap-4 flex-wrap"
        >
          {(["male", "female", "other"] as const).map((g) => (
            <div key={g} className="flex items-center gap-2">
              <RadioGroupItem value={g} id={`gender-${g}`} />
              <Label htmlFor={`gender-${g}`} className="font-normal cursor-pointer">
                {t(`genderOptions.${g}`)}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.gender && (
          <p className="text-sm text-destructive">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>{t("activityLevel")}</Label>
        <Select
          value={watch("activityLevel") || ""}
          onValueChange={(val) => setValue("activityLevel", val as typeof ACTIVITY_LEVELS[number])}
        >
          <SelectTrigger>
            <SelectValue>
              {(value: string) => (value ? t(`activityOptions.${value}`) : "")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ACTIVITY_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {t(`activityOptions.${level}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.activityLevel && (
          <p className="text-sm text-destructive">{errors.activityLevel.message}</p>
        )}
      </div>
    </div>
  );
}
