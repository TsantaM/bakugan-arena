'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"

export const getGateCardForEditor = async(id : string) => {
    const user = await getUser()
    const role = await getUserRole()

    if(user && role?.role === 'GAMEDESIGNER') {
        return await prisma.gateCards.findUnique({
            where: {
                id: id
            },
            select: {
                nom: true,
                maxPerDeck: true,
                key: true,
                description: true
            }
        })
    }
}

export type getGateCardForEditorType = Exclude<Awaited<ReturnType<typeof getGateCardForEditor>>, undefined>
