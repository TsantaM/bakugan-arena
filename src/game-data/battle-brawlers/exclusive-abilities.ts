import { exclusiveAbilitiesType } from "@/src/types/game-data-types";
import { ChambreDeGravite, DragonoidPlus, ImpactMajeur, OmbreBleue, SabreDeLaMort, VentViolentDeNobelesseVerte } from "./exclusive-abilities/exclusive-abilities";

export const ExclusiveAbilities: Record<string, exclusiveAbilitiesType> = {
    [OmbreBleue.key]: OmbreBleue,
    [DragonoidPlus.key]: DragonoidPlus,
    [SabreDeLaMort.key]: SabreDeLaMort,
    [ChambreDeGravite.key]: ChambreDeGravite,
    [VentViolentDeNobelesseVerte.key]: VentViolentDeNobelesseVerte,
    [ImpactMajeur.key]: ImpactMajeur
}

export const ExclusiveAbilitiesList: exclusiveAbilitiesType[] = Object.values(ExclusiveAbilities) 