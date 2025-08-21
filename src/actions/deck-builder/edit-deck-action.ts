'use server'

import { editDeckName_type } from "@/components/elements/deck-builder/edit-deck"
import { getUser } from "../getUserSession"
import prisma from "@/src/lib/prisma"

export const EditDeckNameAction = async ({ id, formData }: { id: string, formData: editDeckName_type }) => {

    const user = await getUser()

    if (user) {
        return await prisma.deck.update({
            where: {
                id: id,
                userId: user.id
            },
            data: {
                name: formData.nom
            }
        })
    }

}

export const AddBakuganInDeckAction = async ({ bakuganId, deckId }: { bakuganId: string, deckId: string }) => {
    const user = await getUser()

    const bakuganCount = await prisma.deck.findFirst({
        where: {
            id: deckId,
            userId: user?.id
        },
        select: {
            bakugans: {
                select: {
                    id: true
                }
            }
        }
    })

    if (user && bakuganCount?.bakugans && bakuganCount?.bakugans.length < 3) {
        return await prisma.deck.update({
            where: {
                id: deckId,
                userId: user.id
            },
            data: {
                bakugans: {
                    connect: {
                        id: bakuganId
                    }
                }
            }
        })
    }

}

export const RemoveBakuganInDeckAction = async ({ bakuganId, deckId }: { bakuganId: string, deckId: string }) => {
    const user = await getUser()

    if (user) {

        await prisma.deck.update({
            where: {
                id: deckId,
                userId: user.id
            },
            data: {
                bakugans: {
                    disconnect: {
                        id: bakuganId
                    }
                }
            }
        })

        await prisma.exclusiveAbilityCardDeck.deleteMany({
            where: {
                deckId: deckId,
                exclusiveAbilityCards: {
                    bakugan: {
                        some:{
                            id: bakuganId
                        }
                    }
                },
                deck: {
                    userId: user.id
                }
            }
        })

        const BakuganAttribut = await prisma.bakugan.findUnique({
            where: {
                id: bakuganId
            },
            select: {
                attribut: true
            }
        })

        const getBakuganInDeckWithSameAttribut = await prisma.deck.findFirst({
            where: {
                id: deckId,
                userId: user.id
            },
            select: {
                bakugans: {
                    where: {
                        attribut: BakuganAttribut?.attribut
                    },
                    select: {
                        attribut: true,
                    }
                }
            }
        })

        if (getBakuganInDeckWithSameAttribut?.bakugans.length === 0) {

            const attribut = BakuganAttribut?.attribut
            await prisma.abilityCardDeck.deleteMany({
                where: {
                    deckId: deckId,
                    abilityCard: {
                        attributs: attribut
                    },
                    deck: {
                        userId: user.id
                    }
                }
            })
        }
    }
}

export const AddAbilityCardToDeck = async ({ cardId, deckId }: { cardId: string, deckId: string }) => {
    const user = await getUser()

    if (user) {
        return prisma.abilityCardDeck.create({
            data: {
                deckId: deckId,
                abilityCardId: cardId
            }
        })
    }
}

export const RemoveAbilityCardFromDeck = async ({ cardId, deckId }: { cardId: string, deckId: string }) => {
    const user = await getUser()

    if (user) {
        return prisma.abilityCardDeck.delete({
            where: {
                id: cardId,
                deckId: deckId,
                deck: {
                    userId: user.id
                }
            }
        })
    }
}

export const AddExclusiveAbilityCardToDeck = async ({ cardId, deckId }: { cardId: string, deckId: string }) => {
    const user = await getUser()

    if(user) {
        return prisma.exclusiveAbilityCardDeck.create({
            data: {
                deckId: deckId,
                exclusiveAbilityCardsId: cardId
            }
        })
    }

}

export const RemoveExclusiveAbilityCardFromDeck = async ({ cardId, deckId }: { cardId: string, deckId: string }) => {
    const user = await getUser()

    if(user) {
        return prisma.exclusiveAbilityCardDeck.delete({
            where: {
                id: cardId,
                deckId: deckId,
                deck: {
                    userId: user.id
                }
            }
        })
    }
}