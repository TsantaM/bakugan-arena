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

export const GetCompatibleBakugans = async(id: string) => {
        return await prisma.bakugan.findMany({
        where: {
            ExclusivesAbilityCards: {
                some: {
                    id: id
                }
            }
        },
        select: {
            id: true,
            nom: true,
            attribut: true
        }
    })
}

export const GetNotCompatibleBakugans = async (id: string) => {
    return await prisma.bakugan.findMany({
        where: {
            ExclusivesAbilityCards: {
                none: {
                    id: id
                }
            }
        },
        select: {
            id: true,
            nom: true,
            attribut: true
        }
    })
}