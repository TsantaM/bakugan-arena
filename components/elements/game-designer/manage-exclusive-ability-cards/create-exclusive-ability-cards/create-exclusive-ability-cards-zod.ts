import z from "zod";

export const createExclusiveAbilityCardSchema = z.object({
    nom: z.string(),
    description: z.string(),

    maxPerDeck: z.union([
        z.string(),
        z.number().min(1, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),

    bakugans: z
        .array(z.string())
        .min(1, { message: "Select minimum on compatible Bakugan" }),

    key: z.string()
})