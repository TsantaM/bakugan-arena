'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetBakugansInDeck, GetExclusiveCardsInDeck } from "@/src/actions/deck-builder/get-deck-data"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ExclusiveAbilityCardPreviewDeckEditor } from "./cards-preview-deck-editor"
import { GetNotInDeckExclusiveAbilityCards } from "@/src/actions/deck-builder/get-not-in-deck-data-action"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { toast } from "sonner"
import { AddExclusiveAbilityCardToDeck } from "@/src/actions/deck-builder/edit-deck-action"

export default function ManageExclusiveAbilityCardsInDeck({ id }: { id: string }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const queryClient = useQueryClient()

    const countBakugans = async () => {
        const list = await GetBakugansInDeck(id)
        const count = list && list.bakugans.length
        return count
    }

    const CountBakugansQuery = useQuery({
        queryKey: ['count-bakugans-in-deck'],
        queryFn: countBakugans
    })

    const deckExclusiveAbilityCards = async () => {
        return await GetExclusiveCardsInDeck(id)
    }

    const deckExclusiveAbilityCardsQuery = useQuery({
        queryKey: ['get-exclusive-ability-cards-in-deck'],
        queryFn: deckExclusiveAbilityCards
    })

    const notInDeckExclusiveAbilityCards = async () => {
        return await GetNotInDeckExclusiveAbilityCards({ id })
    }

    const notInDeckExclusiveAbilitiesQuery = useQuery({
        queryKey: ['get-not-in-deck-exclusive-ability-cards'],
        queryFn: notInDeckExclusiveAbilityCards
    })

    const addCardToDeck = async (cardId: string) => {
        return await AddExclusiveAbilityCardToDeck({ cardId, deckId: id })
    }

    const addCardToDeckMutation = useMutation({
        mutationKey: ['add-ability-card-to-deck'],
        mutationFn: addCardToDeck,
        onSuccess: () => {
            toast.success("Ability card has been added to deck")
            queryClient.invalidateQueries({ queryKey: ['get-exclusive-ability-cards-in-deck'] })
            queryClient.invalidateQueries({ queryKey: ['get-not-in-deck-exclusive-ability-cards'] })
            setValue('')
        }
    })

    return (
        <>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Exclusive Ability Cards</CardTitle>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                    disabled={addCardToDeckMutation.isPending || deckExclusiveAbilityCardsQuery.data?.length === 10 || CountBakugansQuery.data === 0 ? true : false}
                                >
                                    {notInDeckExclusiveAbilitiesQuery?.data && value ? (
                                        (() => {
                                            const selectedBakugan = notInDeckExclusiveAbilitiesQuery.data.find(
                                                (b) => b.nom === value
                                            )

                                            if (!selectedBakugan) return "Select Ability Cards..."

                                            const { nom } = selectedBakugan

                                            return (
                                                <>
                                                    {`${nom}`}
                                                </>
                                            )
                                        })()
                                    ) : (
                                        "Select Ability Card..."
                                    )}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search Bakugan..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No card found.</CommandEmpty>
                                        <CommandGroup>
                                            {notInDeckExclusiveAbilitiesQuery?.data && notInDeckExclusiveAbilitiesQuery?.data.map((b, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={b.nom}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                        addCardToDeckMutation.mutate(b.id)
                                                    }}
                                                >
                                                    {b.nom}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            value === b.id ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>
                <CardContent className={ deckExclusiveAbilityCardsQuery.data && deckExclusiveAbilityCardsQuery.data.length > 0 ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
                    {
                        deckExclusiveAbilityCardsQuery.data && deckExclusiveAbilityCardsQuery.data.length > 0 ? deckExclusiveAbilityCardsQuery.data.map((c, index) => <ExclusiveAbilityCardPreviewDeckEditor key={index} nom={c.exclusiveAbilityCards.nom} description={c.exclusiveAbilityCards.description} id={c.id} deckId={id} />)
                            : <p className="text-center">No exclusive ability cards in this deck</p>
                    }
                </CardContent>
            </Card>
        </>
    )
}