'use client'

import z from "zod"
import { createGateCardSchema } from "./create-gate-card-zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateGateCardAction } from "@/src/actions/game-designer/manage-gate-cards/create-gate-card-action"

export type createGateCard_type = z.infer<typeof createGateCardSchema>

export default function CreateGateCard() {

    const CreateGateCardForm = useForm({
        resolver: zodResolver(createGateCardSchema), defaultValues: {
            nom: '',
            description: '',
            maxPerDeck: 1,
            key: ''
        }
    })

    const CreateGateCardFunction = async (formData: createGateCard_type) => {
        return await CreateGateCardAction(formData)
    }

    const CreateGateCardMuation = useMutation({
        mutationFn: CreateGateCardFunction,
        mutationKey: ['createGateCard'],
        onSuccess: () => {
            toast.success('Gate Card created successfully!')
            CreateGateCardForm.reset()
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: createGateCard_type) => {
        CreateGateCardMuation.mutate(formData)
    }

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Create new Gate Card</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ea, eius praesentium nemo adipisci maiores officia veniam? Distinctio veritatis nihil dolore placeat aliquam asperiores ducimus perspiciatis, exercitationem reiciendis eius ipsa! Eius facilis autem obcaecati animi.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...CreateGateCardForm}>
                        <form onSubmit={CreateGateCardForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormField
                                control={CreateGateCardForm.control}
                                name='nom'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Blow Away" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>{`The name of the Gate Card`}</FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={CreateGateCardForm.control}
                                name='key'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Key</FormLabel>
                                        <FormControl>
                                            <Input placeholder="blowAway" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>{`The name of the bakugan`}</FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={CreateGateCardForm.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>{`The description of the Gate Card effect`}</FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={CreateGateCardForm.control}
                                name='maxPerDeck'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Per Deck</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" min={1} max={3} />
                                        </FormControl>
                                        <FormDescription>{`The max exemplary per deck`}</FormDescription>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={CreateGateCardMuation.isPending ? true : false} >{CreateGateCardMuation.isPending ? 'Submiting in process...' : 'Create Bakugan'}</Button>
                        </form>
                    </Form>
                </CardContent>

            </Card >
            <Toaster />

        </>
    )
}