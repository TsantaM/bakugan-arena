'use client'

import z from "zod"
import { createAbilityCardSchema } from "./create-ability-cards-zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttributTable } from "@/src/variables/attribut";
import { BonusAndMalus } from "@/src/variables/bonus-and-malus";
import { Switch } from "@/components/ui/switch";
import { AbilityCardsEffects } from "@/src/variables/ability-cards-effects";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateAbilityCardAction } from "@/src/actions/game-designer/manage-ability-cards/create-ability-cards";
import { Toaster } from "@/components/ui/sonner";


export type createAbilityCard_type = z.infer<typeof createAbilityCardSchema>
export default function CreateAbilityCards() {

    const createAbilityCardForm = useForm<createAbilityCard_type>({
        resolver: zodResolver(createAbilityCardSchema), defaultValues: {
            nom: '',
            description: '',
            attribut: "Pyrus",

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
            drainAbilityPower: false
        }
    });

    const mutation = useMutation({
        mutationFn: (formData: createAbilityCard_type) => CreateAbilityCardAction(formData),
        onSuccess: () => {
            toast.success('Ability Card created successfully')
            createAbilityCardForm.reset();
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: createAbilityCard_type) => {
        mutation.mutate(formData)
    }

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Create new Ability Card</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ea, eius praesentium nemo adipisci maiores officia veniam? Distinctio veritatis nihil dolore placeat aliquam asperiores ducimus perspiciatis, exercitationem reiciendis eius ipsa! Eius facilis autem obcaecati animi.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...createAbilityCardForm}>
                        <form onSubmit={createAbilityCardForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">

                            <Card>
                                <CardHeader>
                                    <CardTitle>About the Ability Card</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <FormField
                                        control={createAbilityCardForm.control}
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
                                        control={createAbilityCardForm.control}
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

                                    <FormField
                                        control={createAbilityCardForm.control}
                                        name="attribut"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Attribut</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Bakugan Attribut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            AttributTable.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`The attribut of the Ability Card, if you don't select it will be Pyrus by default`}
                                                </FormDescription>
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
                                        control={createAbilityCardForm.control}
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
                                        control={createAbilityCardForm.control}
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
                                        control={createAbilityCardForm.control}
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
                                            control={createAbilityCardForm.control}
                                            name={a.controler as "attribut" | "bonus" | "malus" | "nom" | "description" | "maxPerDeck" | "stopGate" | "blockGate" | "swipeGate" | "moveSelf" | "moveOpponent" | "moveAnOther" | "attractOpponent" | "cancelAbilities" | "protectFromGate" | "protectFromAbilities" | "drainAbilityPower"}
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

                            <Button type="submit" disabled={mutation.isPending ? true : false} >
                                {mutation.isPending ? 'Submiting in process...' : 'Create Ability Card'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
            <Toaster />
        </>
    )
}