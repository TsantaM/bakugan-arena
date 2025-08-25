'use server'

import prisma from "@/src/lib/prisma"
import { getUser } from "../getUserSession"

export const GetDeckData = async (id: string) => {
    const user = await getUser()

    if(user) {
        return await prisma.deck.findFirst({
            where: {
                id: id,
                userId: user.id
            },
            select: {
                id: true,
                name: true,
                bakugans: true,
                exclusiveAbilities: true,
                ability: true,
                gateCards: true
            }
        })
    }
}

export type GetDeckDataType = Exclude<Awaited<ReturnType<typeof GetDeckData>>, undefined>
