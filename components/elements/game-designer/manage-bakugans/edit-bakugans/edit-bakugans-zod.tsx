import { attributSchema, niveauDePuissanceSchema } from "@/src/zod/zod-enum";
import z from "zod";

export const EditBakuganSchema = z.object({
    nom: z.string(),
    attribut: attributSchema,
    niveauDePuissance: niveauDePuissanceSchema,
    image: z.string(),
})