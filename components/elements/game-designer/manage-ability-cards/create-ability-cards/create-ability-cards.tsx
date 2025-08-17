'use client'

import z from "zod"
import { createAbilityCardSchema } from "./create-ability-cards-zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateAbilityCardAction } from "@/src/actions/game-designer/manage-ability-cards/create-ability-cards";
import { Toaster } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttributTable } from "@/src/variables/attribut";


export type createAbilityCard_type = z.infer<typeof createAbilityCardSchema>
export default function CreateAbilityCards() {

    const createAbilityCardForm = useForm<createAbilityCard_type>({
        resolver: zodResolver(createAbilityCardSchema), defaultValues: {
            nom: '',
            description: '',
            key: '',
            maxPerDeck: 1,
            attribut: 'Pyrus'
        }
    });

    const queryClient = useQueryClient()

    const handleRefetch = () => {
        queryClient.invalidateQueries({
            queryKey: ['get-ability-cards']
        })
    }

    const mutation = useMutation({
        mutationFn: (formData: createAbilityCard_type) => CreateAbilityCardAction(formData),
        onSuccess: () => {
            toast.success('Ability Card created successfully')
            createAbilityCardForm.reset();
            handleRefetch()
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
                                                <FormLabel>Ability Card Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="" {...field} className="resize-none" />
                                                </FormControl>
                                                <FormDescription>{`The description of the ability card`}</FormDescription>
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
                                                            <SelectValue placeholder="Select Card Attribut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            AttributTable.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`The attribut of the Bakugan, if you don't select it will be Pyrus by default`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={createAbilityCardForm.control}
                                        name='key'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ability Card Key</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} className="text" />
                                                </FormControl>
                                                <FormDescription>{`The key of the ability card`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={createAbilityCardForm.control}
                                        name='maxPerDeck'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Max Per Deck</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} type="number" min={1} max={3} />
                                                </FormControl>
                                                <FormDescription>{`The number of the ability card in deck`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />

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