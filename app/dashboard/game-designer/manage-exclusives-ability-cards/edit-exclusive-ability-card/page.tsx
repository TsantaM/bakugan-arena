import { getUser, getUserRole } from "@/src/actions/getUserSession"
import { unauthorized } from "next/navigation"

export default async function EditExclusiveAbilityCard({ searchParams }: { searchParams: { id: string } }) {
    const id = searchParams.id
    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }

    // const data = await GetAbilityForEditor(id)

    return (
        <>


        </>
    )
}