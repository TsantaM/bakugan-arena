import BakuganDex from "@/components/elements/baku-dex/bakugan-dex-page/bakugan-dex-page";
import { BakuganDexData } from "@/src/actions/dex/get-bakugan-data";

export default async function BakuDexPage({ searchParams }: { searchParams: { id: string } }) {
    const id = searchParams.id
    const data = await BakuganDexData(id)

    return (
        <>
        
        <BakuganDex data={data}/>
        
        
        </>
    )
}