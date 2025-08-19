import BakuDex from "@/components/elements/baku-dex/baku-dex";
import { GetBakugansData } from "@/src/actions/dex/get-bakugan-data";

export default async function BakuDexPage() {

    const data = await GetBakugansData({})

    return (
        <>
        
            <BakuDex data={data}/>
        
        </>
    )
}