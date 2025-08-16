import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetBakugansDataType } from "@/src/actions/dex/get-bakugan-data";
import Image from "next/image";


export default function BakuganPreview({data} : {data: GetBakugansDataType}) {
    return (
        <Card className="hover:bg-accent">
            <CardHeader>
                <div className="size-20 m-auto relative">
                    <Image src={`/images/bakugans/sphere/${data.image}/${data.attribut.toUpperCase()}.png`} alt={`${data.nom} ${data.attribut}`} fill/>
                </div>
                <CardTitle className="text-center">
                    {`${data.nom} ${data.attribut}`}
                </CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}