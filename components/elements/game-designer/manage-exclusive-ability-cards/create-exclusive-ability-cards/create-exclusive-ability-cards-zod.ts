import { abilityCardsBonusAndManus } from "@/src/zod/zod-enum";
import z from "zod";

export const createExclusiveAbilityCardSchema = z.object({
    nom: z.string(),
    description: z.string(),

    maxPerDeck: z.union([
        z.string(),
        z.number().min(1, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),
    bonus: abilityCardsBonusAndManus,
    malus: abilityCardsBonusAndManus,

    stopGate: z.boolean(),
    blockGate: z.boolean(),
    swipeGate: z.boolean(),
    moveSelf: z.boolean(),
    moveOpponent: z.boolean(),
    moveAnOther: z.boolean(),
    attractOpponent: z.boolean(),
    cancelAbilities: z.boolean(),
    protectFromGate: z.boolean(),
    protectFromAbilities: z.boolean(),
    drainAbilityPower: z.boolean(),

    bakugans: z
        .array(z.string())
        .min(1, { message: "Select minimum on compatible Bakugan" }),
})