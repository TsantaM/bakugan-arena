'use client'

import { Button } from "@/components/ui/button";
import { addBakuganSchema } from "./add-bakugans-zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { niveauDePuissance_values } from "./add-bakugan-values";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBakugan } from "@/src/actions/game-designer/manage-bakugan/create-bakugan";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { AttributTable } from "@/src/variables/attribut";

export type addBakugan_type = z.infer<typeof addBakuganSchema>

export default function AddBakugan() {

    const queryClient = useQueryClient()

    const handleRefetch = () => {
        queryClient.invalidateQueries({
            queryKey: ["get-bakugans"]
        })
        console.log('clicked')

    }

    const addBakuganForm = useForm<addBakugan_type>({
        resolver: zodResolver(addBakuganSchema), defaultValues: {
            nom: '',
            attribut: 'Pyrus',
            image: '',
            niveauDePuissance: "220"
        }
    });

    const mutation = useMutation({
        mutationFn: (formData: addBakugan_type) => CreateBakugan({ formData }),
        onSuccess: () => {
            toast.success('Bakugan created successfully')
            addBakuganForm.reset();
            handleRefetch();
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: addBakugan_type) => {
        mutation.mutate(formData)
    }

    console.log(addBakuganForm.formState.errors)

    return (

        <>
            <Card>
                <CardHeader>
                    <CardTitle>Add new Bakugan in Game</CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quia commodi dicta quasi quisquam. Ut vel ad enim nesciunt nisi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...addBakuganForm}>
                        <form onSubmit={addBakuganForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormField
                                control={addBakuganForm.control}
                                name='nom'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dragonoid" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>{`The name of the bakugan`}</FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={addBakuganForm.control}
                                name='image'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input placeholder="dragonoid" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>{`The name of the folder where the sprite of the bakugan is`}</FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addBakuganForm.control}
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
                                            {`The attribut of the Bakugan, if you don't select it will be Pyrus by default`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addBakuganForm.control}
                                name="niveauDePuissance"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Power Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Bakugan Power Level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    niveauDePuissance_values.map((n, index) => <SelectItem key={index} value={n.value}>{n.label}</SelectItem>)
                                                }

                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {`The power level of the Bakugan, if you don't select it will be 225 by default`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={mutation.isPending ? true : false} >{mutation.isPending ? 'Submiting in process...' : 'Create Bakugan'}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster />
        </>


    )
}