'use server'

import ExclusiveAbilityList from "@/components/elements/game-designer/manage-exclusive-ability-cards/manage-exclusive-ability-cards/exclusive-ability-cards"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import Section from "@/components/ui/section"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { Plus } from "lucide-react"
import Link from "next/link"
import { unauthorized } from "next/navigation"

export default async function ManageExclusivesAbilityCardsPage() {

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
                            <Button variant='outline' asChild><Link href='/dashboard/game-designer/manage-exclusives-ability-cards/create-exclusives-ability-cards'><Plus /> Add new Ability Card</Link></Button>
                        </div>
                    </CardHeader>
                    
                    <ExclusiveAbilityList />
                </Card>
            </Section>

        </>
    )
}