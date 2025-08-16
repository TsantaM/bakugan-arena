'use server'

import prisma from "@/src/lib/prisma"

export const GetBakugansForExclusivesCards = async () => {
    return await prisma.bakugan.findMany({
        select: {
            id: true,
            nom: true,
            attribut: true
        }
    })
}