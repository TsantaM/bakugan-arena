'use client'

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BonusAndMalus } from "@/src/variables/bonus-and-malus";
import { Switch } from "@/components/ui/switch";
import { AbilityCardsEffects } from "@/src/variables/ability-cards-effects";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import { GetCompatibleBakugans, GetNotCompatibleBakugans } from "@/src/actions/game-designer/manage-exclusives-ability-cards/get-not-compatibles-bakugans"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MultiSelect } from "@/components/ui/multi-select.tsx"
import { toast } from "sonner"
import { EditExclusiveAbilityCardSchema } from "./edit-exclusive-ability-card-zod";
import { GetExclusiveAbilityCardForEditorType } from "@/src/actions/game-designer/manage-exclusives-ability-cards/get-exclusive-ability-cards-for-editor";
import { EditExclusiveAbilityCardsAction, RemoveCompatibleBakugan } from "@/src/actions/game-designer/manage-exclusives-ability-cards/edit-exclusive-ability-cards-action";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";


export type editExclusiveAbilityCard_type = z.infer<typeof EditExclusiveAbilityCardSchema>

export default function EditExclusiveAbilityCards({ id, cardData }: { id: string, cardData: GetExclusiveAbilityCardForEditorType | undefined }) {

    const router = useRouter()

    const editExclusiveAbilityCardsForm = useForm<editExclusiveAbilityCard_type>({
        resolver: zodResolver(EditExclusiveAbilityCardSchema), defaultValues: {
            nom: cardData?.nom,
            description: cardData?.description,

            maxPerDeck: cardData?.maxPerDeck,
            bonus: cardData?.bonus as "0" | "50" | "75" | "100" | "150" | "200" | undefined,
            malus: cardData?.malus as "0" | "50" | "75" | "100" | "150" | "200" | undefined,

            stopGate: cardData?.stopGate,
            blockGate: cardData?.blockGate,
            swipeGate: cardData?.swipeGate,
            moveSelf: cardData?.moveSelf,
            moveOpponent: cardData?.moveOpponent,
            moveAnOther: cardData?.moveAnOther,
            attractOpponent: cardData?.attractOpponent,
            cancelAbilities: cardData?.cancelAbilities,
            protectFromGate: cardData?.protectFromGate,
            protectFromAbilities: cardData?.protectFromAbilities,
            drainAbilityPower: cardData?.drainAbilityPower,

            bakugans: []
        }
    });

    const getNotCompatibleBakugans = async (): Promise<{ value: string; label: string }[]> => {
        const bakugans = await GetNotCompatibleBakugans(id);

        const filtered = bakugans.map((b) => {
            return {
                value: b.id.toString(),
                label: `${b.nom} ${b.attribut}`,
            };
        });

        return filtered;
    };

    const getCompatibleBakugans = async () => {
        return await GetCompatibleBakugans(id)
    }

    const compatibleBakugans = useQuery({
        queryKey: ['get-compatible-bakugans'],
        queryFn: getCompatibleBakugans
    })

    const notCompatibleBakugans = useQuery({
        queryKey: ['get-not-compatible-bakugansfor-editor'],
        queryFn: getNotCompatibleBakugans,
    })

    const queryClient = useQueryClient()

    const refetchExclusiveCards = () => {
        queryClient.invalidateQueries({
            queryKey: ['get-ability-cards']
        })
        console.log('clicked')

    }

    const removeCompatibleBakugan = useMutation({
        mutationFn: (bakuganId: string) => RemoveCompatibleBakugan({ id, bakuganId }),
        onSuccess: () => {
            notCompatibleBakugans.refetch()
            compatibleBakugans.refetch()
            refetchExclusiveCards()
            toast.success('Ability Card updated successfully')
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const UpdateExclusiveAbilityCard = async (formData: editExclusiveAbilityCard_type) => {
        return await EditExclusiveAbilityCardsAction({ id, formData })
    }

    const updateExclusiveCard = useMutation({
        mutationFn: (formData: editExclusiveAbilityCard_type) => UpdateExclusiveAbilityCard(formData),
        onSuccess: () => {
            notCompatibleBakugans.refetch()
            compatibleBakugans.refetch()
            toast.success('Ability Card updated successfully')
            editExclusiveAbilityCardsForm.reset();
            refetchExclusiveCards()
            router.push('/dashboard/game-designer/manage-exclusives-ability-cards')

        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: editExclusiveAbilityCard_type) => {
        updateExclusiveCard.mutate(formData)
    }

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Create new Exclusive Ability Card</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ea, eius praesentium nemo adipisci maiores officia veniam? Distinctio veritatis nihil dolore placeat aliquam asperiores ducimus perspiciatis, exercitationem reiciendis eius ipsa! Eius facilis autem obcaecati animi.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...editExclusiveAbilityCardsForm}>
                        <form onSubmit={editExclusiveAbilityCardsForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">

                            <Card>
                                <CardHeader>
                                    <CardTitle>About the Ability Card</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <FormField
                                        control={editExclusiveAbilityCardsForm.control}
                                        name='nom'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ability Card Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} type="text" />
                                                </FormControl>
                                                <FormDescription>{`The name of the ability card`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editExclusiveAbilityCardsForm.control}
                                        name='description'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ability Card Name</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="" {...field} className="resize-none" />
                                                </FormControl>
                                                <FormDescription>{`The name of the ability card`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Bonus, Malus and Max per Deck
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <FormField
                                        control={editExclusiveAbilityCardsForm.control}
                                        name='maxPerDeck'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Maximum ped Deck</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} type="number" min={1} max={3} />
                                                </FormControl>
                                                <FormDescription>{`Maximum explemplar of this card in one Deck`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editExclusiveAbilityCardsForm.control}
                                        name="bonus"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Bonus of the Card</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Bakugan Attribut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            BonusAndMalus.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`The bonus gived by the Ability Card, if you don't select it will be Pyrus by default`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editExclusiveAbilityCardsForm.control}
                                        name="malus"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Malus of the Card</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Bakugan Attribut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            BonusAndMalus.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`The malus the Ability Card, if you don't select it will be Pyrus by default`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Effects of the card</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {
                                        AbilityCardsEffects.map((a, index) => <FormField key={index}
                                            control={editExclusiveAbilityCardsForm.control}
                                            name={a.controler as "bonus" | "malus" | "nom" | "description" | "maxPerDeck" | "stopGate" | "blockGate" | "swipeGate" | "moveSelf" | "moveOpponent" | "moveAnOther" | "attractOpponent" | "cancelAbilities" | "protectFromGate" | "protectFromAbilities" | "drainAbilityPower"}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>{a.label}</FormLabel>
                                                        <FormDescription>
                                                            Annule tous les effets de la gate
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value as boolean}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />)
                                    }

                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Bakugans that can use this Ability Card
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={editExclusiveAbilityCardsForm.control}
                                        name="bakugans"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Compatibles Bakugans</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={notCompatibleBakugans.data || []}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        placeholder="Choose bakugans..."
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Remove compatible Bakugan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex w-full flex-wrap gap-2">
                                        {
                                            compatibleBakugans.data?.map((b, index) => <Badge key={index} variant="outline" className="flex items-center justify-between">
                                                {`${b.nom} ${b.attribut}`}
                                                <Button variant="ghost" onClick={() => removeCompatibleBakugan.mutate(b.id)}><X /></Button>
                                            </Badge>)
                                        }

                                    </div>
                                </CardContent>
                            </Card>

                            <Button type="submit" disabled={updateExclusiveCard.isPending ? true : false}>
                                {updateExclusiveCard.isPending ? 'Submiting in process...' : 'Update Exclusive Ability Card'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
            <Toaster />

        </>
    )
}