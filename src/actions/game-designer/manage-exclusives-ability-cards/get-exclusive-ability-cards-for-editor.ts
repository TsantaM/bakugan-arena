'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"

export const GetExclusiveAbilityCardForEditor = async ( id: string ) => {
    const user = await getUser()
    const role = await getUserRole()

    if (user && role?.role === "GAMEDESIGNER") {
        return prisma.exclusivesAbilityCards.findUnique({
            where: {
                id: id
            },
            select: {
                nom: true,
                description: true,
                bakugan: {
                  select: {
                    id: true,
                    nom: true,
                    attribut: true
                  }  
                },

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

export type GetExclusiveAbilityCardForEditorType = Exclude<Awaited<ReturnType<typeof GetExclusiveAbilityCardForEditor>>, undefined>
