import CreateGateCard from "@/components/elements/game-designer/manage-gate-card/create-gate-card/create-gate-card"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { unauthorized } from "next/navigation"

export default async function CreateGateCardsPage() {
    
    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }

    return (
        <>

            <CreateGateCard />

        </>
    )
}