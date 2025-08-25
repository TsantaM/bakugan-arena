/*
  Warnings:

  - You are about to drop the column `roomId` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the `AbilityCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AbilityCardDeck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bakugan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExclusiveAbilityCardDeck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExclusivesAbilityCards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GateCardDeck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GateCards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_deckBakugans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_decks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_exclusivesAbilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AbilityCardDeck" DROP CONSTRAINT "AbilityCardDeck_abilityCardId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AbilityCardDeck" DROP CONSTRAINT "AbilityCardDeck_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExclusiveAbilityCardDeck" DROP CONSTRAINT "ExclusiveAbilityCardDeck_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExclusiveAbilityCardDeck" DROP CONSTRAINT "ExclusiveAbilityCardDeck_exclusiveAbilityCardsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GateCardDeck" DROP CONSTRAINT "GateCardDeck_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GateCardDeck" DROP CONSTRAINT "GateCardDeck_gateCardsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckBakugans" DROP CONSTRAINT "_deckBakugans_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_deckBakugans" DROP CONSTRAINT "_deckBakugans_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_decks" DROP CONSTRAINT "_decks_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_decks" DROP CONSTRAINT "_decks_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_exclusivesAbilities" DROP CONSTRAINT "_exclusivesAbilities_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_exclusivesAbilities" DROP CONSTRAINT "_exclusivesAbilities_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_rooms" DROP CONSTRAINT "_rooms_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_rooms" DROP CONSTRAINT "_rooms_B_fkey";

-- AlterTable
ALTER TABLE "public"."Deck" DROP COLUMN "roomId",
ADD COLUMN     "ability" TEXT[],
ADD COLUMN     "bakugans" TEXT[],
ADD COLUMN     "exclusiveAbilities" TEXT[],
ADD COLUMN     "gateCards" TEXT[];

-- DropTable
DROP TABLE "public"."AbilityCard";

-- DropTable
DROP TABLE "public"."AbilityCardDeck";

-- DropTable
DROP TABLE "public"."Bakugan";

-- DropTable
DROP TABLE "public"."ExclusiveAbilityCardDeck";

-- DropTable
DROP TABLE "public"."ExclusivesAbilityCards";

-- DropTable
DROP TABLE "public"."GateCardDeck";

-- DropTable
DROP TABLE "public"."GateCards";

-- DropTable
DROP TABLE "public"."Room";

-- DropTable
DROP TABLE "public"."_deckBakugans";

-- DropTable
DROP TABLE "public"."_decks";

-- DropTable
DROP TABLE "public"."_exclusivesAbilities";

-- DropTable
DROP TABLE "public"."_rooms";

-- DropEnum
DROP TYPE "public"."Attribut";
