/*
  Warnings:

  - You are about to drop the column `category` on the `GateCards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."GateCards" DROP COLUMN "category",
ALTER COLUMN "key" DROP DEFAULT;

-- DropEnum
DROP TYPE "public"."CardType";

-- DropEnum
DROP TYPE "public"."TargetOfCard";

-- CreateTable
CREATE TABLE "public"."AbilityCard" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxPerDeck" INTEGER NOT NULL DEFAULT 3,
    "key" TEXT NOT NULL,
    "attributs" "public"."Attribut" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AbilityCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AbilityCard_nom_key" ON "public"."AbilityCard"("nom");
