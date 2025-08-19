'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttributTable } from "@/src/variables/attribut";
import { niveauDePuissance_values } from "../add-bakugans/add-bakugan-values";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { GetBakuganForEditorType } from "@/src/actions/game-designer/manage-bakugan/get-bakugan-for-editor";
import z from "zod";
import { EditBakuganSchema } from "./edit-bakugans-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditBakuganAction } from "@/src/actions/game-designer/manage-bakugan/edit-bakugan-action";

export type editBakugan_type = z.infer<typeof EditBakuganSchema>

export default function EditBakugan({ id, data }: { id :string , data: GetBakuganForEditorType | undefined }) {

    const router = useRouter()
    const editBakuganForm = useForm<editBakugan_type>({
        resolver: zodResolver(EditBakuganSchema), defaultValues: {
            nom: data?.nom,
            attribut: data?.attribut,
            image: data?.image,
            niveauDePuissance: data?.niveauDePuissance as "220" | "230" | "240" | "250" | "260" | "270" | "280" | "290" | "300" | "310" | "320" | "330" | "340" | "350" | "360" | "370" | "380" | "390" | "400" | "410" | "420" | "430" | "440" | undefined
        }
    });

    const queryClient = useQueryClient()

    const handleRefetch = () => {
        queryClient.invalidateQueries({
            queryKey: ["get-bakugans"]
        })
    }

    const mutation = useMutation({
        mutationFn: ({id, formData} : {id: string, formData: editBakugan_type}) => EditBakuganAction({id, formData }),
        onSuccess: () => {
            toast.success('Bakugan updated successfully')
            editBakuganForm.reset();
            handleRefetch();
            router.push('/dashboard/game-designer/manage-bakugans')
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData : editBakugan_type) => {
        mutation.mutate({id, formData})
    }

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
                    <Form {...editBakuganForm}>
                        <form onSubmit={editBakuganForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormField
                                control={editBakuganForm.control}
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
                                control={editBakuganForm.control}
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
                                control={editBakuganForm.control}
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
                                control={editBakuganForm.control}
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
                                            {`The power level of the Bakugan, if you don't select it will stay the same by default`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={mutation.isPending ? true : false} >{mutation.isPending ? 'Submiting in process...' : 'Update Bakugan'}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster />
        </>
    )
}