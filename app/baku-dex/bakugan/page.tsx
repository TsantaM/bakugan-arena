import BakuganDex from "@/components/elements/baku-dex/bakugan-dex-page/bakugan-dex-page";
import { BakuganList } from "@/src/game-data/battle-brawlers/bakugans";

export default async function BakuDexPage({ searchParams }: { searchParams: { id: string } }) {
    const id = searchParams.id
    const data = BakuganList.find((b) => b.key === id)

    if (data) {
        return (
            <>

                <BakuganDex data={data} />

            </>
        )
    }
}