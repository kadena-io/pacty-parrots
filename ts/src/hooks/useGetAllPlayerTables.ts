import { useCallback } from 'react'
import { usePactState } from '../states/PactState'
import Pact from 'pact-lang-api'
import useGetAllPlayers from './useGetAllPlayers'
import { createAPIHost, dumKeyPair, FetchPactLocal } from '../const'

export default function useGetAllPlayerTables() {
    const getAllPlayers = useGetAllPlayers()
    const workingHosts = usePactState((state) => state.workingHosts)
    const setPlayersData = usePactState((state) => state.setPlayersData)
    return useCallback(async () => {
        const players = await getAllPlayers()
        const cmd = await FetchPactLocal({
            pactCode: `(map (user.pacty-parrots.get-table) ${JSON.stringify(players)})`,
            keyPairs: dumKeyPair,
        })
        const data = await cmd.data
        console.log({ cmd })
        setPlayersData(data)
    }, [workingHosts])
}
