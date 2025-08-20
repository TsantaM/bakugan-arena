'use server'

import prisma from "@/src/lib/prisma"
import { getUser } from "../getUserSession"

export const GetDeckData = async (id: string) => {
    const user = await getUser()

    if(user) {
        return await prisma.deck.findFirst({
            where: {
                id: id,
                userId: user.id
            },
            select: {
                id: true,
                name: true,
            }
        })
    }
}

export const GetBakugansInDeck = async (id: string) => {
    const user = await getUser()

    if(user) {
        return await prisma.deck.findFirst({
            where: {
                id: id,
                userId: user.id
            },
            select: {
                bakugans: {
                    select: {
                        id: true,
                        nom: true,
                        image: true,
                        attribut: true,
                        niveauDePuissance: true
                    }
                }
            }
        })
    }
}

export const GetAbilityCardsInDeck = async(id: string) => {
    const user = await getUser()

    if(user) {
        return await prisma.abilityCardDeck.findMany({
            where: {
                deckId: id
            },
            select: {
                abilityCard: {
                    select: {
                        id: true,
                        nom: true,
                        description: true
                    }
                }
            }
        })
    }
}

export const GetExclusiveCardsInDeck = async(id: string) => {
    const user = await getUser()

    if(user) {
        return await prisma.exclusiveAbilityCardDeck.findMany({
            where: {
                deckId: id
            },
            select: {
                exclusiveAbilityCards: {
                    select: {
                        id: true,
                        nom: true,
                        description: true,
                    }
                }
            }
        })
    }
}

export const GetGateCardsInDeck = async(id: string) => {
    const user = await getUser()
    if(user) {
        return await prisma.gateCardDeck.findMany({
            where: {
                deckId: id
            },
            select: {
                gateCards: {
                    select: {
                        id: true,
                        nom: true,
                        description: true
                    }
                }
            }
        })
    }
}