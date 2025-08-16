'use server'

import prisma from "@/src/lib/prisma"
import { AttributType } from "@/src/types/attributs"

export const GetAbilityCardsData = async ({ nom, attribut }: { nom?: string, attribut?: AttributType }) => {
    return await prisma.abilityCard.findMany({
        where: {
            ...(nom && { nom: { contains: nom, mode: 'insensitive' as const } }),
            ...(attribut && { attribut: attribut }),
        },
        select: {
            id: true,
            nom: true,
            attributs: true,
            description: true
        }
    })
}

export type GetAbilityCardsDataType = Exclude<Awaited<ReturnType<typeof GetAbilityCardsData>>[number], undefined>
