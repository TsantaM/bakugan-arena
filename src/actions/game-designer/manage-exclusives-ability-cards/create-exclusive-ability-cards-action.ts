'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"
import { createExclusiveAbilityCard_type } from "@/components/elements/game-designer/manage-exclusive-ability-cards/create-exclusive-ability-cards/create-exclusive-ability-cards"

export const CreateExclusiveAbilityCardsAction = async (formData: createExclusiveAbilityCard_type) => {
    const user = await getUser()
    const role = await getUserRole()
    const bakugans = formData.bakugans
    const bonus = parseInt(formData.bonus)
    const malus = parseInt(formData.malus)
    const maxPerDeck = parseInt(formData.maxPerDeck as string)

    if (user && role?.role === "GAMEDESIGNER") {
        return prisma.exclusivesAbilityCards.create({
            data: {
                nom: formData.nom,
                description: formData.description,
                bakugan: {
                    connect: bakugans.map((id) => ({ id }))
                },

                maxPerDeck: maxPerDeck,
                bonus: bonus,
                malus: malus,

                stopGate: formData.stopGate,
                blockGate: formData.blockGate,
                swipeGate: formData.swipeGate,
                moveSelf: formData.moveSelf,
                moveOpponent: formData.moveOpponent,
                moveAnOther: formData.moveAnOther,
                attractOpponent: formData.attractOpponent,
                cancelAbilities: formData.cancelAbilities,
                protectFromGate: formData.protectFromGate,
                protectFromAbilities: formData.protectFromAbilities,
                drainAbilityPower: formData.drainAbilityPower,
            }
        })
    }
}