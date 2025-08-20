'use server'

import prisma from "@/src/lib/prisma"
import { getUser } from "../getUserSession"

export const GetNotInDeckBakugans = async({id} : {id: string}) => {
    const user = await getUser()

    if(user) {
        return await prisma.bakugan.findMany({
            where: {
                Deck: {
                    none: {
                        id: id,
                        userId: user.id
                    }
                },
            },
            select: {
                id: true,
                nom: true,
                attribut: true,
                image: true
            }
        })
    }
}