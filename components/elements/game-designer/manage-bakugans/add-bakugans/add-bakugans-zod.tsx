import z from "zod";

const attributSchema = z.enum([
    "Pyrus",
    "Ventus",
    "Aquos",
    "Subterra",
    "Haos",
    "Darkus"
] as const);

const niveauDePuissanceSchema = z.enum([
    '225',
    '250',
    '275',
    '300',
    '325',
    '350',
    '375',
    '400',
    '425',
    '450'
] as const);

export const addBakuganSchema = z.object({
    nom: z.string(),
    attribut: attributSchema,
    niveauDePuissance: niveauDePuissanceSchema,
    image: z.string(),
})