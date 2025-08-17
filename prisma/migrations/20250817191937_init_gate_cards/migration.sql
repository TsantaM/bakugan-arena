-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('JOUEUR', 'ADMIN', 'GAMEDESIGNER');

-- CreateEnum
CREATE TYPE "public"."Attribut" AS ENUM ('Pyrus', 'Ventus', 'Aquos', 'Subterra', 'Haos', 'Darkus');

-- CreateEnum
CREATE TYPE "public"."CardType" AS ENUM ('Elementary', 'Character', 'Command', 'Trap');

-- CreateEnum
CREATE TYPE "public"."TargetOfCard" AS ENUM ('Howner', 'Opponent', 'All', 'Winner');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "public"."Roles" NOT NULL DEFAULT 'JOUEUR',
    "username" TEXT,
    "displayUsername" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

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
    "moveAnOther" BOOLEAN NOT NULL DEFAULT false,
    "attractOpponent" BOOLEAN NOT NULL DEFAULT false,
    "cancelAbilities" BOOLEAN NOT NULL DEFAULT false,
    "protectFromGate" BOOLEAN NOT NULL DEFAULT false,
    "protectFromAbilities" BOOLEAN NOT NULL DEFAULT false,
    "drainAbilityPower" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExclusivesAbilityCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GateCards" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."CardType" NOT NULL DEFAULT 'Elementary',
    "maxPerDeck" INTEGER NOT NULL DEFAULT 3,
    "key" TEXT NOT NULL,

    CONSTRAINT "GateCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_exclusivesAbilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_exclusivesAbilities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "public"."user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Bakugan_nom_attribut_key" ON "public"."Bakugan"("nom", "attribut");

-- CreateIndex
CREATE UNIQUE INDEX "AbilityCard_nom_key" ON "public"."AbilityCard"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "ExclusivesAbilityCards_nom_key" ON "public"."ExclusivesAbilityCards"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "GateCards_nom_key" ON "public"."GateCards"("nom");

-- CreateIndex
CREATE INDEX "_exclusivesAbilities_B_index" ON "public"."_exclusivesAbilities"("B");

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_exclusivesAbilities" ADD CONSTRAINT "_exclusivesAbilities_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Bakugan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_exclusivesAbilities" ADD CONSTRAINT "_exclusivesAbilities_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ExclusivesAbilityCards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
