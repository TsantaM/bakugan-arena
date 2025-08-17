import { gateCardCategory, gateCardsBonusAndManus, gateCardTarget } from "@/src/zod/gate-cards-zod";
import { attributSchema } from "@/src/zod/zod-enum";
import z from "zod";

export const createGateCardSchema = z.object({
    nom: z.string(),
    description: z.string(),
    category: gateCardCategory,
    maxPerDeck: z.union([
        z.string(),
        z.number().min(1, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),

    attributFirst: attributSchema.optional(),
    attributSecond: attributSchema.optional(),

    auto: z.boolean(),

    countGates: z.boolean(),
    countSameAttr: z.boolean(),
    turnLimit: z.union([
        z.string(),
        z.number().min(0, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),

    // Effect 1 Condition
    Effect1_Conditions_MinBakugans: z.union([
        z.string(),
        z.number().min(0, 'Minimum 1').max(4, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),
    Effect1_Conditions_FightEnd: z.boolean(),

    // Cible de l'effet 1
    Effect1_target: gateCardTarget,

    // Effects 1
    Effect1_bonus: gateCardsBonusAndManus,
    Effect1_malus: gateCardsBonusAndManus,
    Effect1_elimination: z.boolean(),
    Effect1_blockElementAbilities: z.boolean(),
    Effect1_blockEntries: z.boolean(),
    Effect1_noRetreat: z.boolean(),
    Effect1_twoBasePower: z.boolean(),
    Effect1_swipePower: z.boolean(),
    Effect1_drainOponent: z.boolean(),
    Effect1_changeTargetAttr: z.boolean(),
    Effect1_changeAttrExeptSecAtrr: z.boolean(),
    Effect1_addCard: z.union([
        z.string(),
        z.number().min(0, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),



    // Effect 2 Condition
    Effect2_Conditions_MinBakugans: z.union([
        z.string(),
        z.number().min(0, 'Minimum 1').max(4, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),
    Effect2_Conditions_FightEnd: z.boolean(),

    // Cible de l'effet 2
    Effect2_target: gateCardTarget,

    // Effects 2
    Effect2_bonus: gateCardsBonusAndManus,
    Effect2_malus: gateCardsBonusAndManus,
    Effect2_elimination: z.boolean(),
    Effect2_blockElementAbilities: z.boolean(),
    Effect2_blockEntries: z.boolean(),
    Effect2_noRetreat: z.boolean(),
    Effect2_twoBasePower: z.boolean(),
    Effect2_swipePower: z.boolean(),
    Effect2_drainOponent: z.boolean(),
    Effect2_changeTargetAttr: z.boolean(),
    Effect2_changeAttrExeptSecAtrr: z.boolean(),
    Effect2_addCard: z.union([
        z.string(),
        z.number().min(0, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),

})