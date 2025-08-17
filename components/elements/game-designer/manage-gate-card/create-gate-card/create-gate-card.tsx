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
import { Switch } from "@/components/ui/switch"
import { GateCardBonusAndMalus, gateCardCategory, GateCardsEffects1, GateCardsEffects1Conditions, GateCardsEffects2, GateCardsEffects2Conditions, GateCardsSideEffects, gateCardTarget } from "@/src/variables/gate-cards-variables"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttributTable } from "@/src/variables/attribut"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateGateCardAction } from "@/src/actions/game-designer/manage-gate-cards/create-gate-card-action"

export type createGateCard_type = z.infer<typeof createGateCardSchema>

export default function CreateGateCard() {

    const CreateGateCardForm = useForm({
        resolver: zodResolver(createGateCardSchema), defaultValues: {
            nom: '',
            description: '',
            category: 'Elementary',
            maxPerDeck: 1,

            auto: false,

            countGates: false,
            countSameAttr: false,
            turnLimit: 0,

            // Effect 1 Condition
            Effect1_Conditions_MinBakugans: 0,
            Effect1_Conditions_FightEnd: false,

            // Cible de l'effet 1
            Effect1_target: 'All',

            // Effects 1
            Effect1_bonus: '0',
            Effect1_malus: '0',
            Effect1_elimination: false,
            Effect1_blockElementAbilities: false,
            Effect1_blockEntries: false,
            Effect1_noRetreat: false,
            Effect1_twoBasePower: false,
            Effect1_swipePower: false,
            Effect1_drainOponent: false,
            Effect1_changeTargetAttr: false,
            Effect1_changeAttrExeptSecAtrr: false,
            Effect1_addCard: 0,

            // Effect 2 Condition
            Effect2_Conditions_MinBakugans: 0,
            Effect2_Conditions_FightEnd: false,

            // Cible de l'effet 2
            Effect2_target: 'All',

            // Effects 1
            Effect2_bonus: '0',
            Effect2_malus: '0',
            Effect2_elimination: false,
            Effect2_blockElementAbilities: false,
            Effect2_blockEntries: false,
            Effect2_noRetreat: false,
            Effect2_twoBasePower: false,
            Effect2_swipePower: false,
            Effect2_drainOponent: false,
            Effect2_changeTargetAttr: false,
            Effect2_changeAttrExeptSecAtrr: false,
            Effect2_addCard: 0,
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

                            {/* GLOBALITY ABOUT GATE CARD */}

                            <Card>
                                <CardHeader>
                                    <CardTitle>About the Gate Card</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name='nom'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gate Card Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Mine Fantome" {...field} type="text" />
                                                </FormControl>
                                                <FormDescription>{`The name of the ability card`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name="category"
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
                                                            gateCardCategory.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
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
                                        control={CreateGateCardForm.control}
                                        name="attributFirst"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>First Attribut</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Gate Card firs Attribut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            AttributTable.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`The first attribut of the Ability Card, if you don't select it will be Pyrus by default`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name="attributSecond"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Second Attribut</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Gate Card second Attribut" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            AttributTable.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`The second attribut of the Ability Card, if you don't select it will be Pyrus by default`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name='description'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gate Card Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="" {...field} className="resize-none" />
                                                </FormControl>
                                                <FormDescription>{`The name of the ability card`}</FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={CreateGateCardForm.control}
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

                                </CardContent>
                            </Card>

                            {/* SIDE EFFECTS */}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Side Effects</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-3">
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name={'turnLimit'}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <FormItem>
                                                    <FormLabel>Turn Limit of the gate card effect</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} type="number" min={0} max={4} />
                                                    </FormControl>
                                                    <FormDescription>{`Maximum turn of the effect of the card`}</FormDescription>
                                                </FormItem>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {
                                            GateCardsSideEffects.map((a, index) => <FormField key={index}
                                                control={CreateGateCardForm.control}
                                                name={a.controler as "Effect1_elimination" | "Effect1_blockElementAbilities" | "Effect1_blockEntries" | "Effect1_noRetreat" | "Effect1_twoBasePower" | "Effect1_swipePower" | "Effect1_drainOponent" | "Effect1_changeTargetAttr" | "Effect1_changeAttrExeptSecAtrr" | "Effect1_addCard"}
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
                                    </div>


                                </CardContent>
                            </Card>

                            {/* EFFECT ONE AND AUTOMATIC ACTIVATION */}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Effect one and Auto Activation Conditions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-3">
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name={'auto'}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Automatic Activation</FormLabel>
                                                    <FormDescription>
                                                        Is this card will be activated automatically when some condition are completed.
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
                                    />
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name={'Effect1_Conditions_MinBakugans'}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <FormItem>
                                                    <FormLabel>Min Bakugans Before Effect one Activation</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} type="number" min={0} max={4} />
                                                    </FormControl>
                                                    <FormDescription>{`Maximum explemplar of this card in one Deck`}</FormDescription>
                                                </FormItem>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name="Effect1_target"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Gate Effect one Card Target</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select effect one targets" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                           gateCardTarget.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`Target of the first effect of the gate card`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {
                                            GateCardsEffects1Conditions.map((a, index) => <FormField key={index}
                                                control={CreateGateCardForm.control}
                                                name={a.controler as "Effect1_elimination" | "Effect1_blockElementAbilities" | "Effect1_blockEntries" | "Effect1_noRetreat" | "Effect1_twoBasePower" | "Effect1_swipePower" | "Effect1_drainOponent" | "Effect1_changeTargetAttr" | "Effect1_changeAttrExeptSecAtrr" | "Effect1_addCard"}
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
                                    </div>


                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Bonus and Malus (effect one)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='flex flex-col w-full gap-3'>
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name="Effect1_bonus"
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
                                                            GateCardBonusAndMalus.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
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
                                        control={CreateGateCardForm.control}
                                        name="Effect1_malus"
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
                                                            GateCardBonusAndMalus.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
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
                                    <CardTitle>Principals Effects of the card</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {
                                        GateCardsEffects1.map((a, index) => <FormField key={index}
                                            control={CreateGateCardForm.control}
                                            name={a.controler as "Effect1_elimination" | "Effect1_blockElementAbilities" | "Effect1_blockEntries" | "Effect1_noRetreat" | "Effect1_twoBasePower" | "Effect1_swipePower" | "Effect1_drainOponent" | "Effect1_changeTargetAttr" | "Effect1_changeAttrExeptSecAtrr" | "Effect1_addCard"}
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

                            {/* EFFECT TWO */}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Effect two Conditions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-3">
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name={'Effect2_Conditions_MinBakugans'}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <FormItem>
                                                    <FormLabel>Min Bakugans Before Effect one Activation</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} type="number" min={0} max={4} />
                                                    </FormControl>
                                                    <FormDescription>{`Maximum explemplar of this card in one Deck`}</FormDescription>
                                                </FormItem>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name="Effect2_target"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Gate Effect two Card Target</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select effect two targets" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            gateCardTarget.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    {`Target of the second effect of the gate card`}
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {
                                            GateCardsEffects2Conditions.map((a, index) => <FormField key={index}
                                                control={CreateGateCardForm.control}
                                                name={a.controler as "Effect1_elimination" | "Effect1_blockElementAbilities" | "Effect1_blockEntries" | "Effect1_noRetreat" | "Effect1_twoBasePower" | "Effect1_swipePower" | "Effect1_drainOponent" | "Effect1_changeTargetAttr" | "Effect1_changeAttrExeptSecAtrr" | "Effect1_addCard"}
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
                                    </div>


                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Secondary Effects of the card</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {
                                        GateCardsEffects2.map((a, index) => <FormField key={index}
                                            control={CreateGateCardForm.control}
                                            name={a.controler as "Effect1_elimination" | "Effect1_blockElementAbilities" | "Effect1_blockEntries" | "Effect1_noRetreat" | "Effect1_twoBasePower" | "Effect1_swipePower" | "Effect1_drainOponent" | "Effect1_changeTargetAttr" | "Effect1_changeAttrExeptSecAtrr" | "Effect1_addCard"}
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
                                        Bonus and Malus (effect two)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='flex flex-col w-full gap-3'>
                                    <FormField
                                        control={CreateGateCardForm.control}
                                        name="Effect2_bonus"
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
                                                            GateCardBonusAndMalus.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
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
                                        control={CreateGateCardForm.control}
                                        name="Effect2_malus"
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
                                                            GateCardBonusAndMalus.map((a, index) => <SelectItem key={index} value={a.value}>{a.label}</SelectItem>)
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

                            <Button type="submit" disabled={CreateGateCardMuation.isPending ? true : false} >
                                {CreateGateCardMuation.isPending ? 'Submiting in process...' : 'Create Gate Card'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

            </Card >
            <Toaster />

        </>
    )
}