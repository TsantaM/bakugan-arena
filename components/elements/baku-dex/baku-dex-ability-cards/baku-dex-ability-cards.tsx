'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAbilityCardsDataType } from "@/src/actions/dex/get-ability-cards-data";
import { useState } from "react";
import ExclusiveAbilityCardDexPreview from "../baku-dex-preview/exclusive-ability-card-dex";
import { Input } from "@/components/ui/input";

export default function BakuDexAbilityCards({ data }: { data: GetAbilityCardsDataType[] }) {

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
                    filtered.length > 0 ? filtered.map((c, index) => <ExclusiveAbilityCardDexPreview key={index} nom={c.nom} description={c.description} attribut={c.attributs} max={c.maxPerDeck} />) : <p className="text-center">No result</p>
                }
            </CardContent>

        </Card>
    )
}