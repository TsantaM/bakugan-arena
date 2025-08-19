import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BakuganDexDataType } from "@/src/actions/dex/get-bakugan-data";
import Image from "next/image";
import ExclusiveAbilityCardDexPreview from "../baku-dex-preview/exclusive-ability-card-dex";

export default function BakuganDex({ data }: { data: BakuganDexDataType }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <Card>
                        <CardContent>
                            <div className="w-full lg:w-[50%] flex gap-5">
                                <div className="relative size-32">
                                    <Image src={`/images/bakugans/sphere/${data.bakugan?.nom}/${data.bakugan?.attribut.toUpperCase()}.png`} alt={`${data.bakugan?.nom} ${data.bakugan?.attribut}`} fill />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <CardTitle>
                                        {data.bakugan?.nom} {data.bakugan?.attribut}
                                    </CardTitle>
                                    <ul className="flex flex-col gap-1">
                                        <li className="relative size-10"><Image src={`/images/attributs/${data.bakugan?.attribut.toUpperCase()}.png`} alt={data.bakugan?.attribut ? data.bakugan?.attribut : ''} fill /></li>
                                        <li><span className='text-bold text-sm'>Power Level : </span><span className="text-sm">{data.bakugan?.niveauDePuissance} G</span></li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Exclusives Abilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                data.bakugan?.ExclusivesAbilityCards.map((c, index) => <ExclusiveAbilityCardDexPreview key={index} nom={c.nom} description={c.description} max={c.maxPerDeck} />)
                            }
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Abilities Cards
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                data.abilities?.map((c, index) => <ExclusiveAbilityCardDexPreview key={index} nom={c.nom} description={c.description} max={c.maxPerDeck} attribut={c.attributs} />)
                            }
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </>
    );
}