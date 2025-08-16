'use client'

import BakuganPreview from "@/components/elements/preview/bakugan-preview"
import { CardContent } from "@/components/ui/card"
import { GetBakugansData } from "@/src/actions/dex/get-bakugan-data"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function BakuganList() {

    const GetBakugans = async () => {
        return await GetBakugansData({})
    }


    const { data } = useQuery({
        queryKey: ['get-bakugans'],
        queryFn: GetBakugans
    })


    if (data) {
        return (
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {
                    data.map((d, index) =>
                        <Link key={index} href={`/dashboard/game-designer/manage-bakugans/edit-bakugan?id=${d.id}`}>
                            <BakuganPreview data={d}/>
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