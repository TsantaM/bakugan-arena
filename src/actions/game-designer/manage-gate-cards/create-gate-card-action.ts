'use server'

import prisma from "@/src/lib/prisma"
import { getUser, getUserRole } from "../../getUserSession"
import { createGateCard_type } from "@/components/elements/game-designer/manage-gate-card/create-gate-card/create-gate-card"

export const CreateGateCardAction = async (formData: createGateCard_type) => {
    const user = await getUser()
    const role = await getUserRole()

    if (!(user && role?.role === 'GAMEDESIGNER')) return null

    // ✅ Conversion des champs string|number en Int
    const maxPerDeck = formData.maxPerDeck ? parseInt(formData.maxPerDeck as string, 10) : 0
    const turnLimit = formData.turnLimit ? parseInt(formData.turnLimit as string, 10) : 0
    const Effect1_Conditions_MinBakugans = formData.Effect1_Conditions_MinBakugans
        ? parseInt(formData.Effect1_Conditions_MinBakugans as string, 10)
        : 0
    const Effect1_addCard = formData.Effect1_addCard
        ? parseInt(formData.Effect1_addCard as string, 10)
        : 0
    const Effect2_Conditions_MinBakugans = formData.Effect2_Conditions_MinBakugans
        ? parseInt(formData.Effect2_Conditions_MinBakugans as string, 10)
        : 0
    const Effect2_addCard = formData.Effect2_addCard
        ? parseInt(formData.Effect2_addCard as string, 10)
        : 0

    // ✅ Création de la GateCard
    return await prisma.gateCards.create({
        data: {
            nom: formData.nom,
            description: formData.description,
            category: formData.category,
            maxPerDeck,

            attributFirst: formData.attributFirst,
            attributSecond: formData.attributSecond,

            auto: formData.auto,
            countGates: formData.countGates,
            countSameAttr: formData.countSameAttr,
            turnLimit,

            // Conditions effet 1
            Effect1_Conditions_MinBakugans,
            Effect1_Conditions_FightEnd: formData.Effect1_Conditions_FightEnd,

            // Cible effet 1
            Effect1_target: formData.Effect1_target,

            // Effets 1
            Effect1_bonus: parseInt(formData.Effect1_bonus as string, 10),
            Effect1_malus: parseInt(formData.Effect1_malus as string, 10),
            Effect1_elimination: formData.Effect1_elimination,
            Effect1_blockElementAbilities: formData.Effect1_blockElementAbilities,
            Effect1_blockEntries: formData.Effect1_blockEntries,
            Effect1_noRetreat: formData.Effect1_noRetreat,
            Effect1_twoBasePower: formData.Effect1_twoBasePower,
            Effect1_swipePower: formData.Effect1_swipePower,
            Effect1_drainOponent: formData.Effect1_drainOponent,
            Effect1_changeTargetAttr: formData.Effect1_changeTargetAttr,
            Effect1_changeAttrExeptSecAtrr: formData.Effect1_changeAttrExeptSecAtrr,
            Effect1_addCard,

            // Conditions effet 2
            Effect2_Conditions_MinBakugans,
            Effect2_Conditions_FightEnd: formData.Effect2_Conditions_FightEnd,

            // Cible effet 2
            Effect2_target: formData.Effect2_target,

            // Effets 2
            Effect2_bonus: parseInt(formData.Effect2_bonus as string, 10),
            Effect2_malus: parseInt(formData.Effect2_malus as string, 10),
            Effect2_elimination: formData.Effect2_elimination,
            Effect2_blockElementAbilities: formData.Effect2_blockElementAbilities,
            Effect2_blockEntries: formData.Effect2_blockEntries,
            Effect2_noRetreat: formData.Effect2_noRetreat,
            Effect2_twoBasePower: formData.Effect2_twoBasePower,
            Effect2_swipePower: formData.Effect2_swipePower,
            Effect2_drainOponent: formData.Effect2_drainOponent,
            Effect2_changeTargetAttr: formData.Effect2_changeTargetAttr,
            Effect2_changeAttrExeptSecAtrr: formData.Effect2_changeAttrExeptSecAtrr,
            Effect2_addCard,
        }
    })
}
