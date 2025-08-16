import EditBakugan from "@/components/elements/game-designer/manage-bakugans/edit-bakugans/edit-bakugans"
import { GetBakuganForEditor } from "@/src/actions/game-designer/manage-bakugan/get-bakugan-for-editor"
import { notFound } from "next/navigation"

export default async function EditBakuganPage({ searchParams }: { searchParams: { id: string } }) {

    const id = searchParams.id

    if (!id) {
        notFound()
    }

    const data = await GetBakuganForEditor(id)

    return (
        <>
            <EditBakugan id={id} data={data} />
        </>
    )
}