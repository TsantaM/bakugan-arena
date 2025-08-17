'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"
import { editAbilityCard_type } from "@/components/elements/game-designer/manage-ability-cards/edit-ability-card/edit-ability-card"

export const EditAbilityCardsAction = async ({ id, formData }: { id: string, formData: editAbilityCard_type }) => {
    const user = await getUser()
    const role = await getUserRole()

    const maxPerDeck = parseInt(formData.maxPerDeck as string)

    if (user && role?.role === "GAMEDESIGNER") {
        return await prisma.abilityCard.update({
            where: {
                id: id
            },
            data: {
                nom: formData.nom,
                description: formData.description,
                maxPerDeck: maxPerDeck,
                key: formData.key,
                attributs: formData.attribut,
                updatedAt: new Date()
            }
        })
    }
}