'use client'

import { GetAbilityForEditorType } from "@/src/actions/game-designer/manage-ability-cards/get-card-for-editor"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttributTable } from "@/src/variables/attribut";
import { BonusAndMalus } from "@/src/variables/bonus-and-malus";
import { Switch } from "@/components/ui/switch";
import { AbilityCardsEffects } from "@/src/variables/ability-cards-effects";
import { Button } from "@/components/ui/button";
import { EditAbilityCardSchema } from "./edit-ability-card-zod";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EditAbilityCardsAction } from "@/src/actions/game-designer/manage-ability-cards/edit-ability-cards-action";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export type editAbilityCard_type = z.infer<typeof EditAbilityCardSchema>

export default function EditAbilityCard({ id, data }: { id: string, data: GetAbilityForEditorType | undefined }) {
    const router = useRouter()
    const EditAbiliyCardForm = useForm<editAbilityCard_type>({
        resolver: zodResolver(EditAbilityCardSchema), defaultValues: {
            nom: data?.nom,
            description: data?.description,
            attribut: data?.attributs,

            maxPerDeck: 1,
            bonus: data?.bonus as "0" | "50" | "75" | "100" | "150" | "200" | undefined,
            malus: data?.malus as "0" | "50" | "75" | "100" | "150" | "200" | undefined,

            stopGate: data?.stopGate,
            blockGate: data?.blockGate,
            swipeGate: data?.swipeGate,
            moveSelf: data?.moveSelf,
            moveOpponent: data?.moveOpponent,
            moveAnOther: data?.moveAnOther,
            attractOpponent: data?.attractOpponent,
            cancelAbilities: data?.cancelAbilities,
            protectFromGate: data?.protectFromGate,
            protectFromAbilities: data?.protectFromAbilities,
            drainAbilityPower: data?.drainAbilityPower

        }
    });

    const queryClient = useQueryClient()

    const handleRefetch = () => {
        queryClient.invalidateQueries({
            queryKey: ['get-ability-cards']
        })
    }

    const mutation = useMutation({
        mutationFn: (formData: editAbilityCard_type) => EditAbilityCardsAction({ id, formData }),
        onSuccess: () => {
            toast.success('Ability Card created successfully')
            EditAbiliyCardForm.reset();
            handleRefetch()
            router.push('/dashboard/game-designer/manage-ability-cards')
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: editAbilityCard_type) => {
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
                    <Form {...EditAbiliyCardForm}>
                        <form onSubmit={EditAbiliyCardForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">

                            <Card>
                                <CardHeader>
                                    <CardTitle>About the Ability Card</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <FormField
                                        control={EditAbiliyCardForm.control}
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
                                        control={EditAbiliyCardForm.control}
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
                                        control={EditAbiliyCardForm.control}
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
                                        control={EditAbiliyCardForm.control}
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
                                        control={EditAbiliyCardForm.control}
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
                                        control={EditAbiliyCardForm.control}
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
                                            control={EditAbiliyCardForm.control}
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
                                {mutation.isPending ? 'Submiting in process...' : 'Update Ability Card'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>
            <Toaster />

        </>
    )
}