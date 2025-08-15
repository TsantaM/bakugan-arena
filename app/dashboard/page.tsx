import Section from "@/components/ui/section"
import { getUser } from "@/src/actions/getUserSession"
import { unauthorized } from "next/navigation"


export default async function DashboardPage() {

    const user = await getUser()

    if (!user) {
        unauthorized()
    }

    return (
        <Section>

        </Section>
    )
}