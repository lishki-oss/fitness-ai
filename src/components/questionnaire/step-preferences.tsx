"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { QuestionnaireData } from "@/lib/validations/questionnaire";

interface Props {
  form: UseFormReturn<QuestionnaireData>;
}

const DIETARY_RESTRICTIONS = [
  "vegetarian",
  "vegan",
  "kosher",
  "halal",
  "gluten_free",
  "lactose_free",
  "none",
] as const;

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }

  function addTag() {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((v) => v !== tag));
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={addTag}>
          +
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 ps-2 pe-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function StepPreferences({ form }: Props) {
  const t = useTranslations("questionnaire.preferences");
  const { watch, setValue, register } = form;

  function toggleRestriction(item: string) {
    const current = watch("dietaryRestrictions") || [];
    if (item === "none") {
      setValue("dietaryRestrictions", current.includes("none") ? [] : ["none"]);
      return;
    }
    const without = current.filter((v) => v !== "none");
    if (without.includes(item)) {
      setValue(
        "dietaryRestrictions",
        without.filter((v) => v !== item)
      );
    } else {
      setValue("dietaryRestrictions", [...without, item]);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      <div className="space-y-3">
        <Label>{t("dietaryRestrictions")}</Label>
        <div className="grid grid-cols-2 gap-3">
          {DIETARY_RESTRICTIONS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox
                id={`restriction-${item}`}
                checked={(watch("dietaryRestrictions") || []).includes(item)}
                onCheckedChange={() => toggleRestriction(item)}
              />
              <Label
                htmlFor={`restriction-${item}`}
                className="font-normal cursor-pointer"
              >
                {t(`restrictionOptions.${item}`)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("likedFoods")}</Label>
        <TagInput
          value={watch("likedFoods") || []}
          onChange={(val) => setValue("likedFoods", val)}
          placeholder={t("likedFoodsPlaceholder")}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("dislikedFoods")}</Label>
        <TagInput
          value={watch("dislikedFoods") || []}
          onChange={(val) => setValue("dislikedFoods", val)}
          placeholder={t("dislikedFoodsPlaceholder")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t("notes")}</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          placeholder={t("notesPlaceholder")}
          rows={3}
        />
      </div>
    </div>
  );
}
