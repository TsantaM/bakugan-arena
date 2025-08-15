'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function AddBakugan() {
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
            </DialogContent>
        </Dialog>
    )
}