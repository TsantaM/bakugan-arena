'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetGateCardsInDeck } from "@/src/actions/deck-builder/get-deck-data"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GateCardPreviewDeckEditor } from "./cards-preview-deck-editor"
import { GetNotInDeckGateCards } from "@/src/actions/deck-builder/get-not-in-deck-data-action"
import { useState } from "react"
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
import { AddGateCardToDeck } from "@/src/actions/deck-builder/edit-deck-action"
import { toast } from "sonner"

export default function ManageGateCardsInDeckEditor({ id }: { id: string }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const queryClient = useQueryClient()

    const deckGateCards = async () => {
        return await GetGateCardsInDeck(id)
    }

    const deckGateCardsQuery = useQuery({
        queryKey: ['get-deck-gate-cards'],
        queryFn: deckGateCards
    })

    const getNotInDeckGateCards = async () => {
        return await GetNotInDeckGateCards({ id })
    }

    const getNotInDeckGateCardsQuery = useQuery({
        queryKey: ['get-not-in-deck-gate-cards'],
        queryFn: getNotInDeckGateCards
    })


    const addGateToDeck = async(cardId: string) => {
        return await AddGateCardToDeck({cardId, deckId: id})
    }


    const addGateToDeckMutation = useMutation({
        mutationKey: ['add-gate-to-deck'],
        mutationFn: addGateToDeck,
        onSuccess: () => {
            toast.success('New get as been added successfuly')
            queryClient.invalidateQueries({ queryKey: ['get-deck-gate-cards'] })
            queryClient.invalidateQueries({ queryKey: ['get-not-in-deck-gate-cards'] })
        }
    })

    return (
        <>

            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle>
                            Gate Cards
                        </CardTitle>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                    disabled={addGateToDeckMutation.isPending || deckGateCardsQuery.data?.length === 5 ? true : false}
                                >
                                    {getNotInDeckGateCardsQuery?.data && value ? (
                                        (() => {
                                            const selectedBakugan = getNotInDeckGateCardsQuery.data.find(
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
                                            {getNotInDeckGateCardsQuery?.data && getNotInDeckGateCardsQuery?.data.map((b, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={b.nom}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                        addGateToDeckMutation.mutate(b.id)
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


                <CardContent className={ deckGateCardsQuery.data && deckGateCardsQuery.data.length > 0 ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
                    {
                        deckGateCardsQuery.data && deckGateCardsQuery.data?.length > 0 ? deckGateCardsQuery.data.map((b, index) => <GateCardPreviewDeckEditor key={index} id={b.id} nom={b.gateCards.nom} deckId={id} description={b.gateCards.description} />)

                            : <p className='text-center'>No Bakugan in the deck</p>
                    }
                </CardContent>
            </Card>


        </>
    )
}