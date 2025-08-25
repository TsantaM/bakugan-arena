import { gateCardType } from "@/src/types/game-data-types";

export const Rechargement: gateCardType = {
    key: 'rechargement',
    name: 'Rechargement',
    maxInDeck: 1,
    description: `Augmente le niveau de puissance du propriétaire de la carte de 100 G par Bakugan présent sur le domaine ayant le même élément`
}

export const TripleCombat: gateCardType = {
    key: 'triple-combat',
    name: 'Triple Combat',
    description: `Permet d'ajouter un Bakugan en plus sur le terrain`,
    maxInDeck: 1,
}

export const QuatuorDeCombat: gateCardType = {
    key: 'quatuor-de-combat',
    name: 'Quatuor de Combat',
    description: `Oblige chacun des joueur à ajouter un Bakugan en plus sur le terrain jusqu'à ce qu'il y en ai quatre (2v2)`,
    maxInDeck: 1,
}