'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetBakugansInDeck } from "@/src/actions/deck-builder/get-deck-data"
import { useMutation, useQuery } from "@tanstack/react-query"
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
import { GetNotInDeckBakugans } from "@/src/actions/deck-builder/get-not-in-deck-data-action"
import Image from "next/image"
import { AddBakuganInDeckAction } from "@/src/actions/deck-builder/edit-deck-action"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import BakuganPreviewDeckEditor from "./bakugan-preview-deck-editor"

export default function ManageBakugansInDeck({ id }: { id: string }) {

    const deckBakugans = async () => {
        return await GetBakugansInDeck(id)
    }

    const deckBakugansQuery = useQuery({
        queryKey: ['get-bakugans-in-deck'],
        queryFn: deckBakugans
    })

    const notInDeckBakugans = async () => {
        return await GetNotInDeckBakugans({ id })
    }

    const notInDeckBakugansQuery = useQuery({
        queryKey: ['not-in-deck-bakugans'],
        queryFn: notInDeckBakugans
    })

    const addBakuganToDeck = async (bakuganId: string) => {
        return await AddBakuganInDeckAction({ bakuganId, deckId: id })
    }

    const addBakuganToDeckMutation = useMutation({
        mutationKey: ['add-bakugan-to-deck'],
        mutationFn: addBakuganToDeck,
        onSuccess: () => {
            notInDeckBakugansQuery.refetch()
            deckBakugansQuery.refetch()
            toast.success('Bakugan added to deck successfully!')
        },
        onError: (err) => {
            console.error("Error adding Bakugan to deck:", err)
        }
    })

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (

        <>
            <Card>

                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Bakugans
                        </CardTitle>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                    disabled={addBakuganToDeckMutation.isPending || deckBakugansQuery.data?.bakugans.length === 3 ? true : false}
                                >
                                    {notInDeckBakugansQuery?.data && value ? (
                                        (() => {
                                            const selectedBakugan = notInDeckBakugansQuery.data.find(
                                                (b) => `${b.nom} ${b.attribut}` === value
                                            )

                                            if (!selectedBakugan) return "Select Bakugan..."

                                            const { nom, attribut, image } = selectedBakugan
                                            const imageUrl = `/images/bakugans/sphere/${image}/${attribut.toUpperCase()}.png`

                                            return (
                                                <>
                                                    <Image src={imageUrl} alt={`${nom} ${attribut}`} width={20} height={20} />
                                                    {`${nom} ${attribut}`}
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
                                            {notInDeckBakugansQuery?.data && notInDeckBakugansQuery?.data.map((b, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={`${b.nom} ${b.attribut}`}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                        addBakuganToDeckMutation.mutate(b.id)
                                                    }}
                                                >
                                                    <Image src={`/images/bakugans/sphere/${b.image}/${b.attribut.toUpperCase()}.png`} alt={`${b.nom} ${b.attribut}`} width={20} height={20} />
                                                    {`${b.nom} ${b.attribut}`}
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

                <CardContent className={deckBakugansQuery.data?.bakugans && deckBakugansQuery.data?.bakugans.length > 0 ? "grid grid-cols-1 lg:grid-cols-3 gap-3" : "flex items-center justify-center"}>
                    {
                        deckBakugansQuery.data?.bakugans && deckBakugansQuery.data?.bakugans.length > 0 ? deckBakugansQuery.data?.bakugans.map((b, index) => <BakuganPreviewDeckEditor key={index} id={b.id} attribut={b.attribut} image={b.image} nom={b.nom} deckId={id}/>)

                            : <p className='text-center'>No Bakugan in the deck</p>
                    }
                </CardContent>

            </Card>

            <Toaster />
        </>


    )
}