-- CreateEnum
CREATE TYPE "public"."CardType" AS ENUM ('Elementary', 'Character', 'Command', 'Trap');

-- CreateEnum
CREATE TYPE "public"."TargetOfCard" AS ENUM ('Howner', 'Opponent', 'All', 'Winner');

-- CreateTable
CREATE TABLE "public"."GateCards" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."CardType" NOT NULL DEFAULT 'Elementary',
    "maxPerDeck" INTEGER NOT NULL DEFAULT 3,
    "bakuganId" TEXT,
    "attributFirst" "public"."Attribut",
    "attributSecond" "public"."Attribut",
    "auto" BOOLEAN DEFAULT false,
    "countGates" BOOLEAN DEFAULT false,
    "countSameAttr" BOOLEAN DEFAULT false,
    "turnLimit" INTEGER DEFAULT 0,
    "Effect1_Conditions_MinBakugans" INTEGER DEFAULT 0,
    "Effect1_Conditions_FightEnd" BOOLEAN NOT NULL DEFAULT false,
    "Effect1_target" "public"."TargetOfCard",
    "Effect1_bonus" INTEGER,
    "Effect1_malus" INTEGER,
    "Effect1_elimination" BOOLEAN DEFAULT false,
    "Effect1_blockElementAbilities" BOOLEAN DEFAULT false,
    "Effect1_blockEntries" BOOLEAN DEFAULT false,
    "Effect1_noRetreat" BOOLEAN DEFAULT false,
    "Effect1_twoBasePower" BOOLEAN DEFAULT false,
    "Effect1_swipePower" BOOLEAN DEFAULT false,
    "Effect1_drainOponent" BOOLEAN DEFAULT false,
    "Effect1_changeTargetAttr" BOOLEAN DEFAULT false,
    "Effect1_changeAttrExeptSecAtrr" BOOLEAN DEFAULT false,
    "Effect1_addCard" INTEGER DEFAULT 0,
    "Effect2_Conditions_MinBakugans" INTEGER DEFAULT 0,
    "Effect2_Conditions_FightEnd" BOOLEAN NOT NULL DEFAULT false,
    "Effect2_target" "public"."TargetOfCard",
    "Effect2_bonus" INTEGER,
    "Effect2_malus" INTEGER,
    "Effect2_elimination" BOOLEAN DEFAULT false,
    "Effect2_blockElementAbilities" BOOLEAN DEFAULT false,
    "Effect2_blockEntries" BOOLEAN DEFAULT false,
    "Effect2_noRetreat" BOOLEAN DEFAULT false,
    "Effect2_twoBasePower" BOOLEAN DEFAULT false,
    "Effect2_swipePower" BOOLEAN DEFAULT false,
    "Effect2_drainOponent" BOOLEAN DEFAULT false,
    "Effect2_changeTargetAttr" BOOLEAN DEFAULT false,
    "Effect2_changeAttrExeptSecAtrr" BOOLEAN DEFAULT false,
    "Effect2_addCard" INTEGER DEFAULT 0,

    CONSTRAINT "GateCards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GateCards_nom_key" ON "public"."GateCards"("nom");

-- AddForeignKey
ALTER TABLE "public"."GateCards" ADD CONSTRAINT "GateCards_bakuganId_fkey" FOREIGN KEY ("bakuganId") REFERENCES "public"."Bakugan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
