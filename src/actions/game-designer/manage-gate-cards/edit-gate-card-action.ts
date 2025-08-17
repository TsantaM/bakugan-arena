'use server'

import { editGateCard_type } from "@/components/elements/game-designer/manage-gate-card/edit-gate-card/edit-gate-card"
import { getUser, getUserRole } from "../../getUserSession"
import prisma from "@/src/lib/prisma"

export const EditGateCardAction = async ({ id, formData }: { id: string, formData: editGateCard_type }) => {
    const user = await getUser()
    const role = await getUserRole()

    if (user && role?.role === 'GAMEDESIGNER') {
        return await prisma.gateCards.update({
            where: {
                id: id
            },
            data: {
                nom: formData.nom,
                description: formData.description,
                key: formData.key,
                maxPerDeck: parseInt(formData.maxPerDeck as string)
            }
        })
    }
}