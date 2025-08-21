'use server'

import prisma from "@/src/lib/prisma"
import { getUser } from "../getUserSession"
import { GetBakugansInDeck, GetExclusiveCardsInDeck, GetGateCardsInDeck } from "./get-deck-data"

export const GetNotInDeckBakugans = async ({ id }: { id: string }) => {
    const user = await getUser()

    if (user) {
        return await prisma.bakugan.findMany({
            where: {
                Deck: {
                    none: {
                        id: id,
                        userId: user.id
                    }
                },
            },
            select: {
                id: true,
                nom: true,
                attribut: true,
                image: true
            }
        })
    }
}

export const GetNotInDeckAbilityCards = async ({ id }: { id: string }) => {
    const user = await getUser()

    const abilitiesInDeck = await prisma.exclusiveAbilityCardDeck.findMany({
        where: {
            deckId: id,
            deck: {
                userId: user?.id
            }
        },
        select: {
            exclusiveAbilityCardsId: true,
            exclusiveAbilityCards: {
                select: {
                    maxPerDeck: true,
                    id: true
                }
            }
        }
    })

    const bakugansInDeck = await prisma.deck.findUnique({
        where: {
            id: id
        },
        select: {
            bakugans: {
                select: {
                    id: true,
                    attribut: true
                }
            }
        }
    })

    const attributs = bakugansInDeck?.bakugans.map((b) => b.attribut)

    const reduced = [...new Set(attributs)]

    const abilitiesWithSameAttribut = await prisma.abilityCard.findMany({
        where: {
            attributs: {
                in: reduced
            }
        },
        select: {
            id: true,
            nom: true,
            maxPerDeck: true,
            description: true,
            attributs: true
        }
    })

    const abilitiesNotInDeck = abilitiesWithSameAttribut.filter(card => {
        const countInDeck = abilitiesInDeck.filter((c) => c.exclusiveAbilityCards.id === card.id).length

        return countInDeck < card.maxPerDeck
    })

    return abilitiesNotInDeck
}

export const GetNotInDeckExclusiveAbilityCards = async ({ id }: { id: string }) => {
    const user = await getUser()

    if (user) {

        const BakugansInDeck = await GetBakugansInDeck(id)

        const exclusivesAbilityCardsCompatibles = await prisma.exclusivesAbilityCards.findMany({
            where: {
                bakugan: {
                    some: {
                        id: {
                            in: BakugansInDeck?.bakugans.map(b => b.id)
                        }
                    }
                }
            },
            select: {
                id: true,
                nom: true,
                description: true,
                maxPerDeck: true
            }
        })

        const exclusiveAbilityCardsInDeck = await GetExclusiveCardsInDeck(id)

        const exclusivesNotInDeck = exclusivesAbilityCardsCompatibles.filter(card => {
            const countInDeck = exclusiveAbilityCardsInDeck ? exclusiveAbilityCardsInDeck.filter((c) => c.exclusiveAbilityCards.id === card.id).length : 0

            return countInDeck < card.maxPerDeck
        })

        return exclusivesNotInDeck
    }
}

export const GetNotInDeckGateCards = async ({ id }: { id: string }) => {

    const user = await getUser()

    if (user) {
        const gateInDeck = await GetGateCardsInDeck(id)

        const gates = await prisma.gateCards.findMany()

        const gatesNotInDeck = gates.filter((card) => {
            const countInDeck = gateInDeck ? gateInDeck?.filter((c) => c.gateCards.id === card.id).length : 0
            return countInDeck < card.maxPerDeck
        })


        return gatesNotInDeck
    }

}