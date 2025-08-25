
import { bakuganType } from "@/src/types/game-data-types";
import { DragonoidDeltaPyrus, DragonoidPyrus, UltimateDragonoid } from "./bakugans/dragonoid";
import { SkyressStormVentus, SkyressVentus } from "./bakugans/skyress";
import { AngeloAquos, DiabloAquos, PreyasAquos } from "./bakugans/preyas";
import { GoremSubterra, HammerGoremSubterra } from "./bakugans/gorem";
import { BladeTigrerraHaos, TigrerraHaos } from "./bakugans/tigrerra";
import { AlphaHydranoidDarkus, DeltaHydranoidDarkus, HydranoidDarkus } from "./bakugans/hydranoid";

export const Bakugans: Record<string, bakuganType> = {
    [DragonoidPyrus.key]: DragonoidPyrus,
    [DragonoidDeltaPyrus.key]: DragonoidDeltaPyrus,
    [UltimateDragonoid.key]: UltimateDragonoid,

    [SkyressVentus.key]: SkyressVentus,
    [SkyressStormVentus.key]: SkyressStormVentus,

    [PreyasAquos.key]: PreyasAquos,
    [DiabloAquos.key]: DiabloAquos,
    [AngeloAquos.key]: AngeloAquos,

    [GoremSubterra.key]: GoremSubterra,
    [HammerGoremSubterra.key]: HammerGoremSubterra,

    [TigrerraHaos.key]: TigrerraHaos,
    [BladeTigrerraHaos.key]: BladeTigrerraHaos,

    [HydranoidDarkus.key]: HydranoidDarkus,
    [DeltaHydranoidDarkus.key]: DeltaHydranoidDarkus,
    [AlphaHydranoidDarkus.key]: AlphaHydranoidDarkus
}

export const BakuganList: bakuganType[] = Object.values(Bakugans) 