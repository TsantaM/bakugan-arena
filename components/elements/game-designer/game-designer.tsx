import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Section from "@/components/ui/section";
import Link from "next/link";

export default function GamedesignerPage() {
    return(
        <>
        
        <Section className="md:p-0">
            <Card>
                <CardHeader>
                    <h1 className='text-2xl font-bold'>Game designer</h1>
                    <CardDescription>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti accusamus molestias perspiciatis fugit. Praesentium quis accusantium adipisci enim at ipsam fugit totam non! Animi fuga dolorum autem est! Alias, in quae fuga ut vel eius!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="flex flex-col lg:items-center lg:flex-row gap-3">
                        <li><Button variant='outline' asChild><Link href='/dashboard/game-designer/manage-bakugans'>Manage Bakugans</Link></Button></li>
                        <li><Button variant='outline' asChild><Link href='/dashboard/game-designer/manage-bakugans'>Manage Ability Cards</Link></Button></li>
                        <li><Button variant='outline' asChild><Link href='/dashboard/game-designer/manage-bakugans'>Manage Exclusives Ability Cards</Link></Button></li>
                        <li><Button variant='outline' asChild><Link href='/dashboard/game-designer/manage-bakugans'>Manage Gate Cards</Link></Button></li>
                    </ul>
                </CardContent>
            </Card>
        </Section>
        
        </>
    )
}