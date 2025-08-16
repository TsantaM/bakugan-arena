import CreateAbilityCards from "@/components/elements/game-designer/manage-ability-cards/create-ability-cards/create-ability-cards"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { unauthorized } from "next/navigation"

export default async function CreateAbilityCardsPage() {
    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }

    return (
        <>
            <CreateAbilityCards/>
        </>
    )
}