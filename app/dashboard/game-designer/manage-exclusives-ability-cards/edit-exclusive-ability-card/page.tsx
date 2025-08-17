import EditExclusiveAbilityCards from "@/components/elements/game-designer/manage-exclusive-ability-cards/edit-exclusive-ability-card/edit-exclusive-ability-card"
import { GetExclusiveAbilityCardForEditor } from "@/src/actions/game-designer/manage-exclusives-ability-cards/get-exclusive-ability-cards-for-editor"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { unauthorized } from "next/navigation"

export default async function EditExclusiveAbilityCard({ searchParams }: { searchParams: { id: string } }) {
    const id = searchParams.id
    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }

    const data = await GetExclusiveAbilityCardForEditor(id)

    return (
        <>

            <EditExclusiveAbilityCards id={id} cardData={data}/>

        </>
    )
}