import { abilityCardsType } from "@/src/types/game-data-types";
import { MurDeFeu } from "./ability-cards/pyrus";
import { MirageAquatique } from "./ability-cards/aquos";
import { MagmaSupreme } from "./ability-cards/subterra";
import { RapideHaos } from "./ability-cards/haos";
import { CoupDeGrace } from "./ability-cards/darkus";
import { CombatAerien } from "./ability-cards/ventus";

export const AbilityCards: Record<string, abilityCardsType> = {
    [MurDeFeu.key]: MurDeFeu,
    [MirageAquatique.key]: MirageAquatique,
    [MagmaSupreme.key]: MagmaSupreme,
    [RapideHaos.key]: RapideHaos,
    [CoupDeGrace.key]: CoupDeGrace,
    [CombatAerien.key]: CombatAerien
}

export const AbilityCardsList: abilityCardsType[] = Object.values(AbilityCards) 