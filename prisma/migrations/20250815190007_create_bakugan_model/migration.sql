-- CreateEnum
CREATE TYPE "public"."Attribut" AS ENUM ('Pyrus', 'Ventus', 'Aquos', 'Subterra', 'Haos', 'Darkus');

-- CreateTable
CREATE TABLE "public"."Bakugan" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "attribut" "public"."Attribut" NOT NULL,
    "niveauDePuissance" INTEGER NOT NULL DEFAULT 250,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bakugan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bakugan_nom_attribut_key" ON "public"."Bakugan"("nom", "attribut");
