'use server'

import prisma from "@/src/lib/prisma"


export const GetBakuganForEditor = async (id: string) => {
    return await prisma.bakugan.findUnique({
        where: {
            id: id
        },
        select: {
            nom: true,
            attribut: true,
            image: true,
            niveauDePuissance: true,
        }
    })
}

export type GetBakuganForEditorType = Exclude<Awaited<ReturnType<typeof GetBakuganForEditor>>, undefined>
