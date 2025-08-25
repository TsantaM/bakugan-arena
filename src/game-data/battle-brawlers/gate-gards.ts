import { gateCardType } from "@/src/types/game-data-types";
import { ReacteurAquos, ReacteurDarkus, ReacteurHaos, ReacteurPyrus, ReacteurSubterra, ReacteurVentus } from "./gate-card/gate-card-elementary";
import { Echange, MineFantome } from "./gate-card/gate-card-trap";
import { QuatuorDeCombat, Rechargement, TripleCombat } from "./gate-card/gate-card-command";

export const GateCards: Record<string, gateCardType> = {

    // Reacteurs

    [ReacteurPyrus.key]: ReacteurPyrus,
    [ReacteurSubterra.key]: ReacteurSubterra,
    [ReacteurHaos.key]: ReacteurHaos,
    [ReacteurVentus.key]: ReacteurVentus,
    [ReacteurAquos.key]: ReacteurAquos,
    [ReacteurDarkus.key]: ReacteurDarkus,


    // Piège

    [MineFantome.key]: MineFantome,
    [Echange.key]: Echange,


    // Commandement

    [Rechargement.key]: Rechargement,
    [TripleCombat.key]: TripleCombat,
    [QuatuorDeCombat.key]: QuatuorDeCombat
}


export const GateCardList: gateCardType[] = Object.values(GateCards) 