"use client";

import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { QuestionnaireData } from "@/lib/validations/questionnaire";

interface Props {
  form: UseFormReturn<QuestionnaireData>;
}

const HEALTH_CONDITIONS = [
  "diabetes",
  "hypertension",
  "heart_disease",
  "thyroid",
  "pcos",
  "ibs",
  "none",
] as const;

const ALLERGIES = [
  "dairy",
  "gluten",
  "nuts",
  "eggs",
  "soy",
  "shellfish",
  "none",
] as const;

function CheckboxGroup({
  items,
  value,
  onChange,
  translationFn,
}: {
  items: readonly string[];
  value: string[];
  onChange: (val: string[]) => void;
  translationFn: (key: string) => string;
}) {
  function toggle(item: string) {
    if (item === "none") {
      onChange(value.includes("none") ? [] : ["none"]);
      return;
    }
    const without = value.filter((v) => v !== "none");
    if (without.includes(item)) {
      onChange(without.filter((v) => v !== item));
    } else {
      onChange([...without, item]);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <Checkbox
            id={item}
            checked={value.includes(item)}
            onCheckedChange={() => toggle(item)}
          />
          <Label htmlFor={item} className="font-normal cursor-pointer">
            {translationFn(item)}
          </Label>
        </div>
      ))}
    </div>
  );
}

export function StepHealth({ form }: Props) {
  const t = useTranslations("questionnaire.health");
  const { watch, setValue, register } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      <div className="space-y-3">
        <Label>{t("conditions")}</Label>
        <CheckboxGroup
          items={HEALTH_CONDITIONS}
          value={watch("healthConditions") || []}
          onChange={(val) => setValue("healthConditions", val)}
          translationFn={(key) => t(`conditionOptions.${key}`)}
        />
      </div>

      <div className="space-y-3">
        <Label>{t("allergies")}</Label>
        <CheckboxGroup
          items={ALLERGIES}
          value={watch("allergies") || []}
          onChange={(val) => setValue("allergies", val)}
          translationFn={(key) => t(`allergyOptions.${key}`)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medications">{t("medications")}</Label>
        <Textarea
          id="medications"
          {...register("medications")}
          placeholder={t("medicationsPlaceholder")}
          rows={3}
        />
      </div>
    </div>
  );
}
