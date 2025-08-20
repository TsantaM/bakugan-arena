/*
  Warnings:

  - You are about to drop the `_deckAbilityCards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_deckExclusivesAbilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_deckGateCards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_deckAbilityCards" DROP CONSTRAINT "_deckAbilityCards_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckAbilityCards" DROP CONSTRAINT "_deckAbilityCards_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckExclusivesAbilities" DROP CONSTRAINT "_deckExclusivesAbilities_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckExclusivesAbilities" DROP CONSTRAINT "_deckExclusivesAbilities_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckGateCards" DROP CONSTRAINT "_deckGateCards_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckGateCards" DROP CONSTRAINT "_deckGateCards_B_fkey";

-- DropTable
DROP TABLE "public"."_deckAbilityCards";

-- DropTable
DROP TABLE "public"."_deckExclusivesAbilities";

-- DropTable
DROP TABLE "public"."_deckGateCards";

-- CreateTable
CREATE TABLE "public"."AbilityCardDeck" (
    "id" TEXT NOT NULL,
    "abilityCardId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,

    CONSTRAINT "AbilityCardDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExclusiveAbilityCardDeck" (
    "id" TEXT NOT NULL,
    "exclusiveAbilityCardsId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,

    CONSTRAINT "ExclusiveAbilityCardDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GateCardDeck" (
    "id" TEXT NOT NULL,
    "gateCardsId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,

    CONSTRAINT "GateCardDeck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AbilityCardDeck" ADD CONSTRAINT "AbilityCardDeck_abilityCardId_fkey" FOREIGN KEY ("abilityCardId") REFERENCES "public"."AbilityCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AbilityCardDeck" ADD CONSTRAINT "AbilityCardDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExclusiveAbilityCardDeck" ADD CONSTRAINT "ExclusiveAbilityCardDeck_exclusiveAbilityCardsId_fkey" FOREIGN KEY ("exclusiveAbilityCardsId") REFERENCES "public"."ExclusivesAbilityCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExclusiveAbilityCardDeck" ADD CONSTRAINT "ExclusiveAbilityCardDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GateCardDeck" ADD CONSTRAINT "GateCardDeck_gateCardsId_fkey" FOREIGN KEY ("gateCardsId") REFERENCES "public"."GateCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GateCardDeck" ADD CONSTRAINT "GateCardDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
