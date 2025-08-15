'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { addBakuganSchema } from "./add-bakugans-zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { niveauDePuissance_values } from "./add-bakugan-values";
import { useMutation } from "@tanstack/react-query";
import { CreateBakugan } from "@/src/actions/game-designer/manage-bakugan/create-bakugan";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export type addBakugan_type = z.infer<typeof addBakuganSchema>

export default function AddBakugan() {

    const addBakuganForm = useForm<addBakugan_type>({
        resolver: zodResolver(addBakuganSchema), defaultValues: {
            nom: '',
            attribut: 'Pyrus',
            image: '',
            niveauDePuissance: "225"
        }
    });

    const mutation = useMutation({
        mutationFn: (formData: addBakugan_type) => CreateBakugan({ formData }),
        onSuccess: () => {
            toast.success('Bakugan successfully')
            addBakuganForm.reset();
        },
        onError: (error) => {
            console.error("Erreur lors de la création :", error);
            toast.error(error.message)
        }
    })

    const onSubmit = (formData: addBakugan_type) => {
        mutation.mutate(formData)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'><Plus /> Add new Bakugan</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Bakugan in Game</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quia commodi dicta quasi quisquam. Ut vel ad enim nesciunt nisi.
                    </DialogDescription>
                </DialogHeader>
                <Form {...addBakuganForm}>
                    <form onSubmit={addBakuganForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5 max-h-[75vh] overflow-y-auto">
                        <div className="flex flex-col space-y-5 max-h-[75vh] overflow-y-auto">
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
                                                <SelectItem value="Pyrus">Pyrus</SelectItem>
                                                <SelectItem value="Ventuus">Ventus</SelectItem>
                                                <SelectItem value="Aquos">Aquos</SelectItem>
                                                <SelectItem value="Subterra">Subterra</SelectItem>
                                                <SelectItem value="Haos">Haos</SelectItem>
                                                <SelectItem value="Darkus">Darkus</SelectItem>
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
                                                    <SelectValue placeholder="Select Bakugan Attribut" />
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
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline' onClick={() => addBakuganForm.reset()}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit"disabled={mutation.isPending ? true : false} >{mutation.isPending ? 'Submiting in process' : 'Create Bakugan'}</Button>
                        </DialogFooter>
                    </form>
                </Form>
                    <Toaster />
            </DialogContent>
        </Dialog>
    )
}