-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "activityLevel" TEXT NOT NULL,
    "healthConditions" TEXT[],
    "allergies" TEXT[],
    "medications" TEXT,
    "dietaryRestrictions" TEXT[],
    "primaryGoal" TEXT NOT NULL,
    "targetWeightKg" DOUBLE PRECISION,
    "timeframeMonths" INTEGER,
    "additionalGoals" TEXT,
    "mealsPerDay" INTEGER NOT NULL,
    "snacksPerDay" INTEGER NOT NULL,
    "waterLitersPerDay" DOUBLE PRECISION,
    "cookingFrequency" TEXT NOT NULL,
    "eatingOutFrequency" TEXT NOT NULL,
    "currentDietDescription" TEXT,
    "likedFoods" TEXT[],
    "dislikedFoods" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_clientId_key" ON "Questionnaire"("clientId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questionnaire" ADD CONSTRAINT "Questionnaire_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
