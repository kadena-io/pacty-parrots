import React, { ReactElement } from 'react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PlayerTableType, TodoType } from '../types'

interface PactState {
    // values
    playerId: string
    playerTable: PlayerTableType
    round: number
    players: TodoType[]
    playersData: TodoType[]
    chainId: number
    hosts: number
    requestKey: string
    payoutMatrix: TodoType
    workingHosts: TodoType[]
    balance: number
    // setters
    setPlayerId: (playerId: string) => void
    setPlayerTable: (playerTable: PlayerTableType) => void
    setRound: (round: number) => void
    setPlayers: (players: TodoType[]) => void
    setPlayersData: (playersData: TodoType[]) => void
    setChainId: (chainId: number) => void
    setHosts: (hosts: number) => void
    setRequestKey: (requestKey: string) => void
    setPayoutMatrix: (payoutMatrix: TodoType) => void
    setWorkingHosts: (workingHosts: TodoType[]) => void
    setAccountBalance: (balance: number) => void
}

export const usePactState = create<PactState>()(
    persist(
        (set) => ({
            playerId: '',
            playerTable: {
                rounds: [],
                'rounds-played': [],
                'coins-out': 0,
                'coins-in': 0,
            },
            round: 0,
            players: [],
            playersData: [],
            chainId: 0,
            hosts: 0,
            requestKey: '',
            payoutMatrix: {},
            workingHosts: [],
            balance: 0,
            setPlayerId: (playerId: string) => set({ playerId }),
            setPlayerTable: (playerTable: TodoType) => set({ playerTable }),
            setRound: (round: number) => set({ round }),
            setPlayers: (players: TodoType[]) => set({ players }),
            setPlayersData: (playersData: TodoType[]) => set({ playersData }),
            setChainId: (chainId: number) => set({ chainId }),
            setHosts: (hosts: number) => set({ hosts }),
            setRequestKey: (requestKey: string) => set({ requestKey }),
            setPayoutMatrix: (payoutMatrix: TodoType) => set({ payoutMatrix }),
            setWorkingHosts: (workingHosts: TodoType[]) => set({ workingHosts }),
            setAccountBalance: (balance: number) => set({ balance }),
        }),
        {
            name: 'pact-state',
            partialize: (state) => ({
                playerId: state.playerId,
                requestKey: state.requestKey,
            }),
        }
    )
)
