-- CreateTable
CREATE TABLE "public"."ExclusivesAbilityCards" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxPerDeck" INTEGER NOT NULL DEFAULT 3,
    "bonus" INTEGER NOT NULL DEFAULT 0,
    "malus" INTEGER NOT NULL DEFAULT 0,
    "stopGate" BOOLEAN NOT NULL DEFAULT false,
    "blockGate" BOOLEAN NOT NULL DEFAULT false,
    "swipeGate" BOOLEAN NOT NULL DEFAULT false,
    "moveSelf" BOOLEAN NOT NULL DEFAULT false,
    "moveOpponent" BOOLEAN NOT NULL DEFAULT false,
    "attractOpponent" BOOLEAN NOT NULL DEFAULT false,
    "cancelAbilities" BOOLEAN NOT NULL DEFAULT false,
    "protectFromGate" BOOLEAN NOT NULL DEFAULT false,
    "protectFromAbilities" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExclusivesAbilityCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_exclusivesAbilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_exclusivesAbilities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExclusivesAbilityCards_nom_key" ON "public"."ExclusivesAbilityCards"("nom");

-- CreateIndex
CREATE INDEX "_exclusivesAbilities_B_index" ON "public"."_exclusivesAbilities"("B");

-- AddForeignKey
ALTER TABLE "public"."_exclusivesAbilities" ADD CONSTRAINT "_exclusivesAbilities_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Bakugan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_exclusivesAbilities" ADD CONSTRAINT "_exclusivesAbilities_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ExclusivesAbilityCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
