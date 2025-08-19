import BakuDexExclusiveAbilityCards from "@/components/elements/baku-dex/baku-dex-exclusive-ability-cards/baku-dex-exclusive-ability-cards"
import { GetExclusivesAbiltyCardsData } from "@/src/actions/dex/get-exclusive-ability-cards"

export default async function ExclusiveAbilityCards() {

    const data = await GetExclusivesAbiltyCardsData({})

    return (
        <>
        
            <BakuDexExclusiveAbilityCards data={data}/>
        
        </>
    )
}