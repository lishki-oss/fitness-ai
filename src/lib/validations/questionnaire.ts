import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().int().min(10).max(120),
  gender: z.enum(["male", "female", "other"]),
  heightCm: z.number().min(50).max(300),
  weightKg: z.number().min(20).max(500),
  activityLevel: z.enum([
    "sedentary",
    "light",
    "moderate",
    "active",
    "very_active",
  ]),
});

export const healthSchema = z.object({
  healthConditions: z.array(z.string()).default([]),
  allergies: z.array(z.string()).default([]),
  medications: z.string().optional().default(""),
  dietaryRestrictions: z.array(z.string()).default([]),
});

export const goalsSchema = z.object({
  primaryGoal: z.enum([
    "weight_loss",
    "muscle_gain",
    "maintenance",
    "health",
    "performance",
  ]),
  targetWeightKg: z.number().optional(),
  timeframeMonths: z.number().int().min(1).max(24).optional(),
  additionalGoals: z.string().optional().default(""),
});

export const habitsSchema = z.object({
  mealsPerDay: z.number().int().min(1).max(10),
  snacksPerDay: z.number().int().min(0).max(10),
  waterLitersPerDay: z.number().min(0).max(15).optional(),
  cookingFrequency: z.enum(["daily", "few_times_week", "rarely", "never"]),
  eatingOutFrequency: z.enum([
    "daily",
    "few_times_week",
    "weekly",
    "rarely",
  ]),
  currentDietDescription: z.string().optional().default(""),
});

export const preferencesSchema = z.object({
  likedFoods: z.array(z.string()).default([]),
  dislikedFoods: z.array(z.string()).default([]),
  notes: z.string().optional().default(""),
});

export const questionnaireSchema = personalInfoSchema
  .merge(healthSchema)
  .merge(goalsSchema)
  .merge(habitsSchema)
  .merge(preferencesSchema);

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;

export const stepSchemas = [
  personalInfoSchema,
  healthSchema,
  goalsSchema,
  habitsSchema,
  preferencesSchema,
] as const;

export const STEP_KEYS = [
  "personal",
  "health",
  "goals",
  "habits",
  "preferences",
  "summary",
] as const;
