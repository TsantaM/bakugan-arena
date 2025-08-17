/*
  Warnings:

  - Added the required column `attributs` to the `AbilityCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AbilityCard" ADD COLUMN     "attributs" "public"."Attribut" NOT NULL;
