'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetExclusiveAbilityCardsDataType } from "@/src/actions/dex/get-exclusive-ability-cards";
import ExclusiveAbilityCardDexPreview from "../baku-dex-preview/exclusive-ability-card-dex";
import { useState } from "react";

export default function BakuDexExclusiveAbilityCards({ data }: { data: GetExclusiveAbilityCardsDataType[] }) {


    const [search, setSearch] = useState('')
    const filtered = data.filter((d) => d.nom.toLowerCase().includes(search.toLowerCase()))

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Ability Cards
                </CardTitle>
                <div>
                    <Input placeholder="Ability Card Name" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </CardHeader>

            <CardContent className={`${filtered.length > 0 && 'grid grid-cols-1 lg:grid-cols-3 gap-3'}`}>
                {
                    filtered.length > 0 ? filtered.map((c, index) => <ExclusiveAbilityCardDexPreview key={index} nom={c.nom} description={c.description} max={c.maxPerDeck} bakugan={c.bakugan}/>) : <p className="text-center">No result</p>
                }
            </CardContent>

        </Card>
    )
}