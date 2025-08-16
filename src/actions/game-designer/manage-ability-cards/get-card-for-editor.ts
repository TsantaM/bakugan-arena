'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"

export const GetAbilityForEditor = async (id: string) => {

    const user = await getUser()
    const role = await getUserRole()

    if (user && role?.role === "GAMEDESIGNER") {
        return await prisma.abilityCard.findUnique({
            where: {
                id: id
            },
            select: {
                nom: true,
                description: true,
                attributs: true,
                maxPerDeck: true,
                bonus: true,
                malus: true,
                stopGate: true,
                blockGate: true,
                swipeGate: true,
                moveSelf: true,
                moveOpponent: true,
                moveAnOther: true,
                attractOpponent: true,
                cancelAbilities: true,
                protectFromGate: true,
                protectFromAbilities: true,
                drainAbilityPower: true,
            }
        })
    }

}

export type GetAbilityForEditorType = Exclude<Awaited<ReturnType<typeof GetAbilityForEditor>>, undefined>