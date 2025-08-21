'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetAbilityCardsInDeck } from "@/src/actions/deck-builder/get-deck-data"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
import Image from "next/image"
import { useState } from "react"
import { GetNotInDeckAbilityCards } from "@/src/actions/deck-builder/get-not-in-deck-data-action"
import { AddAbilityCardToDeck } from "@/src/actions/deck-builder/edit-deck-action"
import { toast } from "sonner"


export default function ManageAbilityCardsInDeck({ id }: { id: string }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const queryClient = useQueryClient()

    const deckAbilityCards = async () => {
        return await GetAbilityCardsInDeck(id)
    }

    const deckAbilityCardsQuery = useQuery({
        queryKey: ['get-ability-cards-in-deck'],
        queryFn: deckAbilityCards
    })

    const notInDeckAbilities = async () => {
        return await GetNotInDeckAbilityCards({ id })
    }

    const notInDeckAbilitiesQuery = useQuery({
        queryKey: ['get-not-in-deck-ability-cards'],
        queryFn: notInDeckAbilities
    })

    const addCardToDeck = async (cardId: string) => {
        return await AddAbilityCardToDeck({ cardId, deckId: id })
    }

    const addCardToDeckMutation = useMutation({
        mutationKey: ['add-ability-card-to-deck'],
        mutationFn: addCardToDeck,
        onSuccess: () => {
            toast.success("Ability card has been added to deck")
            queryClient.invalidateQueries({ queryKey: ['get-ability-cards-in-deck'] })
            queryClient.invalidateQueries({ queryKey: ['get-not-in-deck-ability-cards'] })
            setValue('')
        }
    })

    return (
        <>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Ability Cards
                        </CardTitle>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                    disabled={addCardToDeckMutation.isPending || deckAbilityCardsQuery.data?.length === 10 ? true : false}
                                >
                                    {notInDeckAbilitiesQuery?.data && value ? (
                                        (() => {
                                            const selectedBakugan = notInDeckAbilitiesQuery.data.find(
                                                (b) => b.nom === value
                                            )

                                            if (!selectedBakugan) return "Select Bakugan..."

                                            const { nom, attributs } = selectedBakugan
                                            const imageUrl = `/images/attribut/${attributs.toUpperCase()}.png`

                                            return (
                                                <>
                                                    <Image src={imageUrl} alt={`${attributs}`} width={20} height={20} />
                                                    {`${nom}`}
                                                </>
                                            )
                                        })()
                                    ) : (
                                        "Select Bakugan..."
                                    )}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search Bakugan..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {notInDeckAbilitiesQuery?.data && notInDeckAbilitiesQuery?.data.map((b, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={b.nom}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                        addCardToDeckMutation.mutate(b.id)
                                                    }}
                                                >
                                                    <Image src={`/images/attributs/${b.attributs.toUpperCase()}.png`} alt={b.nom} width={20} height={20} />
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

                <CardContent>

                    {
                        deckAbilityCardsQuery.data && deckAbilityCardsQuery.data.map((c, index) => <p key={index}>{c.abilityCard.nom}</p>)
                    }
                </CardContent>

            </Card>

        </>
    )
}