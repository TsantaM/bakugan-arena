-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('JOUEUR', 'ADMIN', 'GAMEDESIGNER');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "role" "public"."Roles" NOT NULL DEFAULT 'JOUEUR';
