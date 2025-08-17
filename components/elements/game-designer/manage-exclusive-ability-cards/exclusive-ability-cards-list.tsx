'use client'

import { CardContent } from "@/components/ui/card"
import { GetExclusivesAbiltyCardsData } from "@/src/actions/dex/get-exclusive-ability-cards"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import ExclusiveAbilityCardPreview from "../../preview/exclusive-ability-card-preview"

export default function ExclusiveAbilityCardList() {

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
                        <Link key={index} href={`/dashboard/game-designer/manage-exclusives-ability-cards/edit-exclusive-ability-card?id=${d.id}`}>
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