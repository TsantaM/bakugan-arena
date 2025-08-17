/*
  Warnings:

  - You are about to drop the column `attractOpponent` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `blockGate` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `bonus` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `cancelAbilities` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `drainAbilityPower` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `malus` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `moveAnOther` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `moveOpponent` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `moveSelf` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `protectFromAbilities` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `protectFromGate` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `stopGate` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the column `swipeGate` on the `ExclusivesAbilityCards` table. All the data in the column will be lost.
  - You are about to drop the `AbilityCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `key` to the `ExclusivesAbilityCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ExclusivesAbilityCards" DROP COLUMN "attractOpponent",
DROP COLUMN "blockGate",
DROP COLUMN "bonus",
DROP COLUMN "cancelAbilities",
DROP COLUMN "drainAbilityPower",
DROP COLUMN "malus",
DROP COLUMN "moveAnOther",
DROP COLUMN "moveOpponent",
DROP COLUMN "moveSelf",
DROP COLUMN "protectFromAbilities",
DROP COLUMN "protectFromGate",
DROP COLUMN "stopGate",
DROP COLUMN "swipeGate",
ADD COLUMN     "key" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."AbilityCard";
