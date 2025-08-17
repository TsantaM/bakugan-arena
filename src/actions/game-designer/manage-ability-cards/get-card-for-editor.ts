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
                key: true,
                maxPerDeck: true,
                attributs: true
            }
        })
    }

}

export type GetAbilityForEditorType = Exclude<Awaited<ReturnType<typeof GetAbilityForEditor>>, undefined>