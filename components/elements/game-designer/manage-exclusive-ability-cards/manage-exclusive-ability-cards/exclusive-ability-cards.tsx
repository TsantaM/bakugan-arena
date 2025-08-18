'use client'

import ExclusiveAbilityCardPreview from "@/components/elements/preview/exclusive-ability-card-preview"
import { CardContent } from "@/components/ui/card"
import { GetExclusivesAbiltyCardsData } from "@/src/actions/dex/get-exclusive-ability-cards"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function ExclusiveAbilityList() {
    const GetExclusiveAbilities = async () => {
        return await GetExclusivesAbiltyCardsData({})
    }

    const { data } = useQuery({
        queryKey: ['get-ability-cards'],
        queryFn: GetExclusiveAbilities
    })



    if (data) {
        return (
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {
                    data.map((d, index) =>
                        <Link key={index} href={`/dashboard/game-designer/manage-ability-cards/edit-ability-card?id=${d.id}`}>
                            <ExclusiveAbilityCardPreview data={d} />
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