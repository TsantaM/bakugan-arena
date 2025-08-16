'use server'

import { editBakugan_type } from "@/components/elements/game-designer/manage-bakugans/edit-bakugans/edit-bakugans"
import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"

export const EditBakuganAction = async ({ id, formData }: { id: string, formData: editBakugan_type }) => {

    const powerLevel = parseInt(formData.niveauDePuissance)
    const user = await getUser()
    const role = await getUserRole()

    if (user && role?.role === "GAMEDESIGNER") {
        await prisma.bakugan.update({
            where: {
                id: id
            },
            data: {
                nom: formData.nom,
                image: formData.image,
                niveauDePuissance: powerLevel,
                attribut: formData.attribut,
                updatedAt: new Date()
            }
        })
    }
}