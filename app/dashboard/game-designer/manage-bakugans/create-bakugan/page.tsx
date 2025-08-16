import AddBakugan from "@/components/elements/game-designer/manage-bakugans/add-bakugans/add-bakugans";
import { getUser, getUserRole } from "@/src/actions/getUserSession";
import { unauthorized } from "next/navigation";

export default async function CreateBakuganPage() {

    const user = await getUser()
    const role = await getUserRole()

    if (!user || role?.role != 'GAMEDESIGNER') {
        unauthorized()
    }


    return (
        <>
            <AddBakugan />
        </>
    )
}