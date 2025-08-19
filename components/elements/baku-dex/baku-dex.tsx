'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GetBakugansDataType } from "@/src/actions/dex/get-bakugan-data";
import Link from "next/link";
import BakuganPreview from "../preview/bakugan-preview";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function BakuDex({ data }: { data: GetBakugansDataType[] }) {

    const [search, setSearch] = useState('')
    const filtered = data.filter((d) => d.nom.toLowerCase().includes(search.toLowerCase()))

        return (
            <Card>
                <CardHeader>
                    <div>
                        <Input placeholder="Bakugan Name" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </CardHeader>
                {
                    filtered.length > 0 ? <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {
                            filtered.map((d, index) =>
                                <Link key={index} href={`/baku-dex/bakugan?id=${d.id}`}>
                                    <BakuganPreview data={d} />
                                </Link>
                            )
                        }
                    </CardContent> : <CardContent className="flex items-center">
                        <p>No result</p>
                    </CardContent>
                }

            </Card>
        )
    }
