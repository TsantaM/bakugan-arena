'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { RemoveAbilityCardFromDeck, RemoveExclusiveAbilityCardFromDeck } from "@/src/actions/deck-builder/edit-deck-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function CardPreviewDeckEditor({ id, deckId, nom, attribut, description }: { id: string, deckId: string, nom: string, attribut?: string, description: string }) {

    const queryClient = useQueryClient()

    const RemoveAbilityFromDeckFunction = async () => {
        return await RemoveAbilityCardFromDeck({ cardId: id, deckId })
    }

    const RemoveAbilityFromDeckMutation = useMutation({
        mutationKey: ['remove-ability-card-from-deck'],
        mutationFn: RemoveAbilityFromDeckFunction,
        onSuccess: () => {
            toast.success('Ability card removed from deck successfully!')
            queryClient.invalidateQueries({ queryKey: ['get-ability-cards-in-deck'] })
            queryClient.invalidateQueries({ queryKey: ['get-not-in-deck-ability-cards'] })
        },
    })

    return (
        <>

            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle className="flex items-center gap-2">
                            {attribut && <Image src={`/images/attributs/${attribut.toUpperCase()}.png`} alt={attribut} width={25} height={25} />}
                            {nom}
                        </CardTitle>

                        <Button disabled={RemoveAbilityFromDeckMutation.isPending ? true : false} variant='outline' onClick={() => RemoveAbilityFromDeckMutation.mutate()}><Trash /> Remove</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {description}
                </CardContent>

                <Toaster />

            </Card>

        </>
    )
}

export function ExclusiveAbilityCardPreviewDeckEditor({ id, deckId, nom, description }: { id: string, deckId: string, nom: string, description: string }) {

    const queryClient = useQueryClient()

    const RemoveExclusiveAbilityFromDeckFunction = async () => {
        return await RemoveExclusiveAbilityCardFromDeck({ cardId: id, deckId })
    }

    const RemoveExclusiveAbilityFromDeckMutation = useMutation({
        mutationKey: ['remove-exclusive-ability-card-from-deck'],
        mutationFn: RemoveExclusiveAbilityFromDeckFunction,
        onSuccess: () => {
            toast.success('Exclusive ability card removed from deck successfully!')
            queryClient.invalidateQueries({ queryKey: ['get-exclusive-ability-cards-in-deck'] })
            queryClient.invalidateQueries({ queryKey: ['get-not-in-deck-exclusive-ability-cards'] })
        },
    })

    return (
        <>

            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle>{nom}</CardTitle>
                        <Button disabled={RemoveExclusiveAbilityFromDeckMutation.isPending ? true : false} variant='outline' onClick={() => RemoveExclusiveAbilityFromDeckMutation.mutate()}><Trash /> Remove</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {description}
                </CardContent>

                <Toaster />

            </Card>

        </>
    )
}