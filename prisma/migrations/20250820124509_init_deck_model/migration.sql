-- AlterTable
ALTER TABLE "public"."Bakugan" ADD COLUMN     "deckId" TEXT;

-- AlterTable
ALTER TABLE "public"."GateCards" ADD COLUMN     "deckId" TEXT;

-- CreateTable
CREATE TABLE "public"."Deck" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_deckBakugans" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_deckBakugans_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_deckAbilityCards" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_deckAbilityCards_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_deckGateCards" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_deckGateCards_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_deckBakugans_B_index" ON "public"."_deckBakugans"("B");

-- CreateIndex
CREATE INDEX "_deckAbilityCards_B_index" ON "public"."_deckAbilityCards"("B");

-- CreateIndex
CREATE INDEX "_deckGateCards_B_index" ON "public"."_deckGateCards"("B");

-- AddForeignKey
ALTER TABLE "public"."Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckBakugans" ADD CONSTRAINT "_deckBakugans_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Bakugan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckBakugans" ADD CONSTRAINT "_deckBakugans_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckAbilityCards" ADD CONSTRAINT "_deckAbilityCards_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."AbilityCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckAbilityCards" ADD CONSTRAINT "_deckAbilityCards_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckGateCards" ADD CONSTRAINT "_deckGateCards_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckGateCards" ADD CONSTRAINT "_deckGateCards_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."GateCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
