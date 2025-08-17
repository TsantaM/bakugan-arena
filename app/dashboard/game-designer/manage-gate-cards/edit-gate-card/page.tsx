import EditGateCard from "@/components/elements/game-designer/manage-gate-card/edit-gate-card/edit-gate-card"
import { getGateCardForEditor } from "@/src/actions/game-designer/manage-gate-cards/get-gate-card-for-editor"
import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { unauthorized } from "next/navigation"

export default async function EditExclusiveAbilityCard({ searchParams }: { searchParams: { id: string } }) {
    const id = searchParams.id
    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }

    const data = await getGateCardForEditor(id)

    return (
        <>

            <EditGateCard id={id} cardData={data}/>

        </>
    )
}