'use server'

import { createAbilityCard_type } from "@/components/elements/game-designer/manage-ability-cards/create-ability-cards/create-ability-cards"
import { getUser, getUserRole } from "../../getUserSession"
import prisma from "@/src/lib/prisma"

export const CreateAbilityCardAction = async (formData: createAbilityCard_type) => {

    const user = await getUser()
    const role = await getUserRole()
    const maxPerDeck = parseInt(formData.maxPerDeck as string)
    
    if (user && role?.role === "GAMEDESIGNER") {
        return await prisma.abilityCard.create({
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