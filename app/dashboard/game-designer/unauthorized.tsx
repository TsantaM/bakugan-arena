import Section from "@/components/ui/section"

export default function UnauthorizedPage() {
    return (
        <Section className="w-full flex flex-col items-center justify-center gap-3">
            <h1 className="text-5xl font-bold">401 - Unauthorized</h1>
            <p>{`If you're not a game designer, you can't access this page return to your dashboard`}</p>
        </Section>
    )
}