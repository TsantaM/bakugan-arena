'use client'

import { useEffect, useState } from "react"
import { useSocket } from "../providers/socket-provider"
import { redirect } from "next/navigation"


type PlayerData = {
    userId: string,
    deckId: string
}

export default function UseSearchOpponent() {
    const socket = useSocket()
    const [waitingOpponent, setWaitingOpponent] = useState(false)

    const emitPlayerData = (data: PlayerData) => {
        const {deckId, userId} = data
        if(socket && !waitingOpponent && data.deckId != '') {
        socket?.emit('search-opponent', ({userId, deckId}))
        setWaitingOpponent(true)
    }
    }

    useEffect(() => {
        if(!socket) return

        socket.on('match-found', (roomId) => {
            console.log('Match found', roomId)
            redirect(`/dashboard/battlefield?id=${roomId}`)
        })
    }, [socket])

    return {
        waitingOpponent,
        emitPlayerData
    }

}