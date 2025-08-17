import z from "zod";

export const editGateCardSchema = z.object({
    nom: z.string(),
    description: z.string(),
    maxPerDeck: z.union([
        z.string(),
        z.number().min(1, 'Minimum 1').max(3, 'Maximum 3')
    ]).refine(val => val !== "" && val !== null && val !== undefined),
    key: z.string()
})