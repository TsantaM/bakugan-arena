-- CreateTable
CREATE TABLE "public"."AbilityCard" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxPerDeck" INTEGER NOT NULL DEFAULT 3,
    "attributs" "public"."Attribut" NOT NULL,
    "bonus" INTEGER NOT NULL DEFAULT 0,
    "malus" INTEGER NOT NULL DEFAULT 0,
    "stopGate" BOOLEAN NOT NULL DEFAULT false,
    "blockGate" BOOLEAN NOT NULL DEFAULT false,
    "swipeGate" BOOLEAN NOT NULL DEFAULT false,
    "moveSelf" BOOLEAN NOT NULL DEFAULT false,
    "moveOpponent" BOOLEAN NOT NULL DEFAULT false,
    "moveAnOther" BOOLEAN NOT NULL DEFAULT false,
    "attractOpponent" BOOLEAN NOT NULL DEFAULT false,
    "cancelAbilities" BOOLEAN NOT NULL DEFAULT false,
    "protectFromGate" BOOLEAN NOT NULL DEFAULT false,
    "protectFromAbilities" BOOLEAN NOT NULL DEFAULT false,
    "drainAbilityPower" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AbilityCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AbilityCard_nom_key" ON "public"."AbilityCard"("nom");
