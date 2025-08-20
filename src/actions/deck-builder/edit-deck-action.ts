'use server'

import { editDeckName_type } from "@/components/elements/deck-builder/edit-deck"
import { getUser } from "../getUserSession"
import prisma from "@/src/lib/prisma"

export const EditDeckNameAction = async({id, formData} : {id: string, formData: editDeckName_type}) => {

    const user = await getUser()

    if(user) {
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

export const AddBakuganInDeckAction = async({bakuganId, deckId} : {bakuganId : string, deckId: string}) => {
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

    if(user && bakuganCount?.bakugans && bakuganCount?.bakugans.length < 3) {
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

export const RemoveBakuganInDeckAction = async({bakuganId, deckId} : {bakuganId : string, deckId: string}) => {
    const user = await getUser()

    if(user) {
        return await prisma.deck.update({
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
    }
}