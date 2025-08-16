'use client'

import AbilityCardPreview from "@/components/elements/preview/ability-card-preview"
import { CardContent } from "@/components/ui/card"
import { GetAbilityCardsData } from "@/src/actions/dex/get-ability-cards-data"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function AbilityCardList() {

    const GetAbilities = async () => {
        return await GetAbilityCardsData({})
    }

    const { data } = useQuery({
        queryKey: ['get-ability-cards'],
        queryFn: GetAbilities
    })

    if (data) {
        return (
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {
                    data.map((d, index) =>
                        <Link key={index} href={`/dashboard/game-designer/manage-ability-cards/edit-ability-card?id=${d.id}`}>
                            <AbilityCardPreview data={d} />
                        </Link>
                    )
                }

            </CardContent>
        )
    }

    return (
        <>


        </>
    )
}