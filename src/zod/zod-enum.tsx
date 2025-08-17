import z from "zod";

export const attributSchema = z.enum([
    "Pyrus",
    "Ventus",
    "Aquos",
    "Subterra",
    "Haos",
    "Darkus"
] as const);