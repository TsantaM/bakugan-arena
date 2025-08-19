import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ExclusiveAbilityCardDexPreview({ nom, description, max, attribut }: { nom: string, description: string, max: number, attribut?: string }) {
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
                        attribut && <li className="relative size-7"><Image src={`/images/attributs/${attribut?.toUpperCase()}.png`} alt={attribut} fill/></li>
                    }

                    <li>Max Per Deck : {max}</li>
                    <li>Description : {description}</li>
                </ul>
            </CardContent>
        </Card>
    )
}