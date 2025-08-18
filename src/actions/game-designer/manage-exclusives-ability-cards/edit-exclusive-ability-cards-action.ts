'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"
import { editExclusiveAbilityCard_type } from "@/components/elements/game-designer/manage-exclusive-ability-cards/edit-exclusive-ability-card/edit-exclusive-ability-card"

export const EditExclusiveAbilityCardsAction = async ({id, formData} :{id: string, formData: editExclusiveAbilityCard_type}) => {
    const user = await getUser()
    const role = await getUserRole()
    const bakugans = formData.bakugans
    const maxPerDeck = parseInt(formData.maxPerDeck as string)

    if (user && role?.role === "GAMEDESIGNER") {
        return prisma.exclusivesAbilityCards.update({
            where: {
                id: id
            },
            data: {
                nom: formData.nom,
                description: formData.description,
                bakugan: {
                    connect: bakugans?.map((id) => ({ id }))
                },

                maxPerDeck: maxPerDeck,
                key: formData.key,

                updatedAt: new Date()
            }
        })
    }
}

export const RemoveCompatibleBakugan = async({id, bakuganId}: {id: string, bakuganId: string}) => {
    return await prisma.exclusivesAbilityCards.update({
        where: {
            id: id
        },
        data: {
            bakugan: {
                disconnect: {
                    id: bakuganId
                }
            }
        }
    })
}