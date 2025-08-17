import z from "zod";

export const gateCardsBonusAndManus = z.enum([
    '0',
    '100',
    '150',
    '200'
])

export const gateCardCategory = z.enum([
    'Elementary',
    'Character',
    'Command',
    'Trap'
])

export const gateCardTarget = z.enum([
    'Howner',
    'Opponent',
    'All',
    'Winner',
])