import BakuDexAbilityCards from "@/components/elements/baku-dex/baku-dex-ability-cards/baku-dex-ability-cards";
import { GetAbilityCardsData } from "@/src/actions/dex/get-ability-cards-data";

export default async function AbilityCardsDexPage() {

    const data = await GetAbilityCardsData({})

    return (
        <>
        
            <BakuDexAbilityCards data={data}/>
        
        </>
    )
}