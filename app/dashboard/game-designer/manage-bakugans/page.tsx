'use server'

import AddBakugan from "@/components/elements/game-designer/manage-bakugans/add-bakugans"
import { Card, CardHeader } from "@/components/ui/card"
import Section from "@/components/ui/section"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
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
                        <div className="flex items-center justify-end">
                            <AddBakugan />
                        </div>
                    </CardHeader>
                </Card>
            </Section>


        </>
    )
}