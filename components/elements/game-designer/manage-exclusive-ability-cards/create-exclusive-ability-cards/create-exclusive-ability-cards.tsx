'use client'

import { useForm } from "react-hook-form"
import z from "zod"
import { createExclusiveAbilityCardSchema } from "./create-exclusive-ability-cards-zod"
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
import { GetBakugansForExclusivesCards } from "@/src/actions/game-designer/manage-exclusives-ability-cards/get-not-compatibles-bakugans"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MultiSelect } from "@/components/ui/multi-select.tsx"
import { CreateExclusiveAbilityCardsAction } from "@/src/actions/game-designer/manage-exclusives-ability-cards/create-exclusive-ability-cards-action"
import { toast } from "sonner"


export type createExclusiveAbilityCard_type = z.infer<typeof createExclusiveAbilityCardSchema>

export default function CreateExclusiveAbilityCards() {

    const createExclusiveAbilityCardsForm = useForm<createExclusiveAbilityCard_type>({
        resolver: zodResolver(createExclusiveAbilityCardSchema), defaultValues: {
            nom: '',
            description: '',

            maxPerDeck: 1,
            bonus: '0',
            malus: '0',

            stopGate: false,
            blockGate: false,
            swipeGate: false,
            moveSelf: false,
            moveOpponent: false,
            moveAnOther: false,
            attractOpponent: false,
            cancelAbilities: false,
            protectFromGate: false,
            protectFromAbilities: false,
            drainAbilityPower: false,

            bakugans: []
        }
    });

    const getBakugans = async (): Promise<{ value: string; label: string }[]> => {
        const bakugans = await GetBakugansForExclusivesCards();

        const filtered = bakugans.map((b) => {
            return {
                value: b.id.toString(),
                label: `${b.nom} ${b.attribut}`,
            };
        });

        return filtered;
    };

    const { data } = useQuery({
        queryKey: ['getBakugansForExclusivesCards'],
        queryFn: getBakugans,
    })

    const CreateExclusiveAbilityCard = async (formData: createExclusiveAbilityCard_type) => {
        return await CreateExclusiveAbilityCardsAction(formData)
    }

    const queryClient = useQueryClient()

    const refetchExclusiveCards = () => {
        queryClient.invalidateQueries({
            queryKey: ['get-ability-cards']
        })
        console.log('clicked')

    }
    
    const mutation = useMutation({
        mutationFn: (formData: createExclusiveAbilityCard_type) => CreateExclusiveAbilityCard(formData),
        onSuccess: () => {
            toast.success('Ability Card created successfully')
            createExclusiveAbilityCardsForm.reset();
            refetchExclusiveCards()
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: createExclusiveAbilityCard_type) => {
        mutation.mutate(formData)
    }

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Create new Exclusive Ability Card</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ea, eius praesentium nemo adipisci maiores officia veniam? Distinctio veritatis nihil dolore placeat aliquam asperiores ducimus perspiciatis, exercitationem reiciendis eius ipsa! Eius facilis autem obcaecati animi.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...createExclusiveAbilityCardsForm}>
                        <form onSubmit={createExclusiveAbilityCardsForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">

                            <Card>
                                <CardHeader>
                                    <CardTitle>About the Ability Card</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <FormField
                                        control={createExclusiveAbilityCardsForm.control}
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
                                        control={createExclusiveAbilityCardsForm.control}
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
                                        control={createExclusiveAbilityCardsForm.control}
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
                                        control={createExclusiveAbilityCardsForm.control}
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
                                        control={createExclusiveAbilityCardsForm.control}
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
                                            control={createExclusiveAbilityCardsForm.control}
                                            name={a.controler as "bonus" | "malus" | "nom" | "description" | "maxPerDeck" | "stopGate" | "blockGate" | "swipeGate" | "moveSelf" | "moveOpponent" | "moveAnOther" | "attractOpponent" | "cancelAbilities" | "protectFromGate" | "protectFromAbilities" | "drainAbilityPower"}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>{a.label}</FormLabel>
                                                        <FormDescription>
                                                            {a.description}
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
                                        control={createExclusiveAbilityCardsForm.control}
                                        name="bakugans"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Compatibles Bakugans</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={data || []}
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

                            <Button type="submit" disabled={mutation.isPending ? true : false}>
                                {mutation.isPending ? 'Submiting in process...' : 'Create Exclusive Ability Card'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
            <Toaster />

        </>
    )
}