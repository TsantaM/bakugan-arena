'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"


export const GetBakuganForEditor = async (id: string) => {

    const user = await getUser()
    const role = await getUserRole()

    if (user && role?.role === "GAMEDESIGNER") {

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
}
export type GetBakuganForEditorType = Exclude<Awaited<ReturnType<typeof GetBakuganForEditor>>, undefined>
