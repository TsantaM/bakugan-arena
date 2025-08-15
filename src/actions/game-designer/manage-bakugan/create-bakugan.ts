'use server'

import { addBakugan_type } from "@/components/elements/game-designer/manage-bakugans/add-bakugans/add-bakugans"
import prisma from "@/src/lib/prisma"


export const CreateBakugan = async({formData} : {formData: addBakugan_type}) => {

    const powerLevel = parseInt(formData.niveauDePuissance)

    return await prisma.bakugan.create({
        data: {
            nom: formData.nom,
            image: formData.image,
            attribut: formData.attribut,
            niveauDePuissance: powerLevel
        }
    })
}