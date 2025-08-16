'use client'

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export default function RefetchAbilityCards() {

    const queryClient = useQueryClient()

    const handleRefetch = () => {
        queryClient.invalidateQueries({
            queryKey: ['get-ability-cards']
        })
        console.log('clicked')
    }

    return (
        <Button variant='outline' onClick={handleRefetch}><RefreshCcw /></Button>
    )
}