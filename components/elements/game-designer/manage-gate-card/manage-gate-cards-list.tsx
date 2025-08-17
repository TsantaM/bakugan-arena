'use client'

import { CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import GateCardPreview from "../../preview/gate-card-preview"
import { getGateCardsDate } from "@/src/actions/dex/get-gate-cards-data"

export default function ManageGateCardsList() {

    const GetGateCards = async () => {
        return await getGateCardsDate()
    }

    const { data } = useQuery({
        queryKey: ['get-ability-cards'],
        queryFn: GetGateCards
    })

    if (data) {
        return (
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {
                    data.map((d, index) =>
                        <Link key={index} href={`/dashboard/game-designer/manage-gate-cards/edit-gate-card?id=${d.id}`}>
                            <GateCardPreview data={d} />
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