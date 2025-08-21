'use server'

import prisma from "@/src/lib/prisma"
import { getUser } from "../getUserSession"

export const GetNotInDeckBakugans = async({id} : {id: string}) => {
    const user = await getUser()

    if(user) {
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

export const GetNotInDeckAbilityCards = async({id} : {id: string}) => {
    const user = await getUser()

    const abilitiesInDeck = await prisma.abilityCardDeck.findMany({
        where: {
            deckId: id,
            deck: {
                userId: user?.id
            }
        },
        select: {
            abilityCardId: true,
            abilityCard: {
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

    const reduced = [...new Set(attributs) ]

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
        const countInDeck = abilitiesInDeck.filter((c) => c.abilityCard.id === card.id).length

        return countInDeck < card.maxPerDeck
    } ) 

    return abilitiesNotInDeck
}