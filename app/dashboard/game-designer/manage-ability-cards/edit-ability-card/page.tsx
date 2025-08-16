'use server'

import EditAbilityCard from "@/components/elements/game-designer/manage-ability-cards/edit-ability-card/edit-ability-card"
import { GetAbilityForEditor } from "@/src/actions/game-designer/manage-ability-cards/get-card-for-editor"
import { notFound } from "next/navigation"

export default async function EditAbilityCardPage({ searchParams }: { searchParams: { id: string } }) {
    const id = searchParams.id
    if (!id) {
        notFound()
    }
    
    const data = await GetAbilityForEditor(id)

    return (
        <>

            <EditAbilityCard id={id} data={data} />

        </>
    )
}