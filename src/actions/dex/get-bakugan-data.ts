'use server'

import prisma from "@/src/lib/prisma"
import { AttributType } from "@/src/types/attributs"

export const GetBakugansData = async ({ nom, attribut }: { nom?: string, attribut?: AttributType }) => {
    return await prisma.bakugan.findMany({
        where: {
            ...(nom && { nom: { contains: nom, mode: 'insensitive' as const } }),
            ...(attribut && { attribut: attribut }),
        },
        select: {
            id: true,
            image: true,
            nom: true,
            attribut: true
        }
    })
}

export type GetBakugansDataType = Exclude<Awaited<ReturnType<typeof GetBakugansData>>[number], undefined>