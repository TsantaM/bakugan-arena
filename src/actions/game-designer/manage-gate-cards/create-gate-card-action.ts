'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"
import { createGateCard_type } from "@/components/elements/game-designer/manage-gate-card/create-gate-card/create-gate-card"

export const CreateGateCardAction = async (formData: createGateCard_type) => {
    const user = await getUser()
    const role = await getUserRole()

    if (!(user && role?.role === 'GAMEDESIGNER')) return null


    // ✅ Création de la GateCard
    return await prisma.gateCards.create({
        data: {
            nom: formData.nom,
            description: formData.description,
            key: formData.key,
            maxPerDeck: parseInt(formData.maxPerDeck as string)
        }
    })
}
