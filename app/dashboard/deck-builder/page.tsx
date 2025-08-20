import CreateDeckButton from "@/components/elements/deck-builder/create-deck-button";
import { Card, CardHeader } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { getUser } from "@/src/actions/getUserSession";
import { unauthorized } from "next/navigation";

export default async function DeckBuilerPage() {
    const user = await getUser()

    if(!user) {
        unauthorized()
    }

    return (
        <>
            <Section className="md:p-0">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-end gap-2">
                            <CreateDeckButton />
                        </div>
                    </CardHeader>
                </Card>
            </Section>

        </>
    )
}