'use server'

import { createAbilityCard_type } from "@/components/elements/game-designer/manage-ability-cards/create-ability-cards/create-ability-cards"
import { getUser, getUserRole } from "../../getUserSession"
import prisma from "@/src/lib/prisma"

export const CreateAbilityCardAction = async (formData: createAbilityCard_type) => {

    const user = await getUser()
    const role = await getUserRole()
    const bonus = parseInt(formData.bonus)
    const malus = parseInt(formData.malus)
    const maxPerDeck = parseInt(formData.maxPerDeck as string)
    
    if (user && role?.role === "GAMEDESIGNER") {
        return await prisma.abilityCard.create({
            data: {
                nom: formData.nom,
                description: formData.description,
                attributs: formData.attribut,
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