import z from "zod";

export const attributSchema = z.enum([
    "Pyrus",
    "Ventus",
    "Aquos",
    "Subterra",
    "Haos",
    "Darkus"
] as const);

export const niveauDePuissanceSchema = z.enum([
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