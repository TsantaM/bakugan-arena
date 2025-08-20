-- CreateTable
CREATE TABLE "public"."_deckExclusivesAbilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_deckExclusivesAbilities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_deckExclusivesAbilities_B_index" ON "public"."_deckExclusivesAbilities"("B");

-- AddForeignKey
ALTER TABLE "public"."_deckExclusivesAbilities" ADD CONSTRAINT "_deckExclusivesAbilities_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_deckExclusivesAbilities" ADD CONSTRAINT "_deckExclusivesAbilities_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ExclusivesAbilityCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
