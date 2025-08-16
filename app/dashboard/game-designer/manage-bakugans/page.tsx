'use server'

import AddBakugan from "@/components/elements/game-designer/manage-bakugans/add-bakugans/add-bakugans"
import BakuganList from "@/components/elements/game-designer/manage-bakugans/bakugan-list/bakugan-list"
import RefetchBakugans from "@/components/elements/game-designer/manage-bakugans/refetch-bakugans"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import Section from "@/components/ui/section"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { Plus } from "lucide-react"
import Link from "next/link"
import { unauthorized } from "next/navigation"

export default async function ManageBakugansPage() {

    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }

    return (
        <>
            <Section className="md:p-0">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-end gap-2">
                            <RefetchBakugans/>
                            <Button variant='outline' asChild><Link href='/dashboard/game-designer/manage-bakugans/create-bakugan'><Plus /> Add new Bakugan</Link></Button>
                        </div>
                    </CardHeader>
                    <BakuganList/>
                </Card>
            </Section>


        </>
    )
}