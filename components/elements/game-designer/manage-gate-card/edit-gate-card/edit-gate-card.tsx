'use client'

import z from "zod"
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
import { getGateCardForEditorType } from "@/src/actions/game-designer/manage-gate-cards/get-gate-card-for-editor"
import { editGateCardSchema } from "./edit-gate-card-zod"
import { EditGateCardAction } from "@/src/actions/game-designer/manage-gate-cards/edit-gate-card-action"
import { useRouter } from "next/navigation"

export type editGateCard_type = z.infer<typeof editGateCardSchema>

export default function EditGateCard({id, cardData} : {id: string, cardData: getGateCardForEditorType | undefined}) {

    const router = useRouter()

    const EditGateCardForm = useForm({
        resolver: zodResolver(editGateCardSchema), defaultValues: {
            nom: cardData?.nom,
            description: cardData?.description,
            maxPerDeck: cardData?.maxPerDeck,
            key: cardData?.key
        }
    })

    const EditGateCardFunction = async (formData: editGateCard_type) => {
        return await EditGateCardAction({id, formData})
    }

    const EditGateCardMuation = useMutation({
        mutationFn: EditGateCardFunction,
        mutationKey: ['createGateCard'],
        onSuccess: () => {
            toast.success('Gate Card created successfully!')
            EditGateCardForm.reset()
            router.push('/dashboard/game-designer/manage-gate-cards')
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: editGateCard_type) => {
        EditGateCardMuation.mutate(formData)
    }

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Create new Gate Card</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ea, eius praesentium nemo adipisci maiores officia veniam? Distinctio veritatis nihil dolore placeat aliquam asperiores ducimus perspiciatis, exercitationem reiciendis eius ipsa! Eius facilis autem obcaecati animi.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...EditGateCardForm}>
                        <form onSubmit={EditGateCardForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormField
                                control={EditGateCardForm.control}
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
                                control={EditGateCardForm.control}
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
                                control={EditGateCardForm.control}
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
                                control={EditGateCardForm.control}
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

                            <Button type="submit" disabled={EditGateCardMuation.isPending ? true : false} >{EditGateCardMuation.isPending ? 'Submiting in process...' : 'Update Gate Card'}</Button>
                        </form>
                    </Form>
                </CardContent>

            </Card >
            <Toaster />

        </>
    )
}