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
                key: true,
                maxPerDeck: true,
                bakugan: {
                  select: {
                    id: true,
                    nom: true,
                    attribut: true
                  }  
                },

            }
        })
    }
}

export type GetExclusiveAbilityCardForEditorType = Exclude<Awaited<ReturnType<typeof GetExclusiveAbilityCardForEditor>>, undefined>
