import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { questionnaireSchema } from "@/lib/validations/questionnaire";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = questionnaireSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const trainerId = session.user.id!;

  const result = await prisma.$transaction(async (tx) => {
    const client = await tx.client.create({
      data: { trainerId },
    });

    const questionnaire = await tx.questionnaire.create({
      data: {
        clientId: client.id,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        gender: data.gender,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        activityLevel: data.activityLevel,
        healthConditions: data.healthConditions,
        allergies: data.allergies,
        medications: data.medications || null,
        dietaryRestrictions: data.dietaryRestrictions,
        primaryGoal: data.primaryGoal,
        targetWeightKg: data.targetWeightKg || null,
        timeframeMonths: data.timeframeMonths || null,
        additionalGoals: data.additionalGoals || null,
        mealsPerDay: data.mealsPerDay,
        snacksPerDay: data.snacksPerDay,
        waterLitersPerDay: data.waterLitersPerDay || null,
        cookingFrequency: data.cookingFrequency,
        eatingOutFrequency: data.eatingOutFrequency,
        currentDietDescription: data.currentDietDescription || null,
        likedFoods: data.likedFoods,
        dislikedFoods: data.dislikedFoods,
        notes: data.notes || null,
      },
    });

    return { client, questionnaire };
  });

  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clients = await prisma.client.findMany({
    where: { trainerId: session.user.id },
    include: { questionnaire: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(clients);
}
