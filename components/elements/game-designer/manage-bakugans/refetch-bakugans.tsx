'use client'

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export default function RefetchBakugans() {

    const queryClient = useQueryClient()

    const handleRefetch = () => {
        queryClient.invalidateQueries({
            queryKey: ["get-bakugans"]
        })
        console.log('clicked')

    }

    return (
        <Button variant='outline' onClick={handleRefetch}><RefreshCcw /></Button>
    )
}