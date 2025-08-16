'use server'

import { addBakugan_type } from "@/components/elements/game-designer/manage-bakugans/add-bakugans/add-bakugans"
import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"


export const CreateBakugan = async ({ formData }: { formData: addBakugan_type }) => {

    const user = await getUser()
    const role = await getUserRole()
    const powerLevel = parseInt(formData.niveauDePuissance)

    if (user && role?.role === "GAMEDESIGNER") {
        return await prisma.bakugan.create({
            data: {
                nom: formData.nom,
                image: formData.image,
                attribut: formData.attribut,
                niveauDePuissance: powerLevel
            }
        })
    }
}