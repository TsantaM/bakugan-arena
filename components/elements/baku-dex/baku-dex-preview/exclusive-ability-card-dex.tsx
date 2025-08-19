import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ExclusiveAbilityCardDexPreview({ nom, description, max, attribut, bakugan }: { nom: string, description: string, max: number, attribut?: string, bakugan?: { nom: string, attribut: string, id: string }[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {nom}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <ul className="flex flex-col gap-1">
                    {
                        attribut && <li className="relative size-7"><Image src={`/images/attributs/${attribut?.toUpperCase()}.png`} alt={attribut} fill /></li>
                    }

                    <li>Max Per Deck : {max}</li>
                    <li>Description : {description}</li>
                </ul>

                <div className="flex w-full flex-wrap gap-2">
                    {
                        bakugan && bakugan.map((b, index) => <Link key={index} href={`/baku-dex/bakugan?id=${b.id}`}><Badge variant="outline">{`${b.nom} ${b.attribut}`}</Badge></Link>)
                    }

                </div>
            </CardContent>
        </Card>
    )
}