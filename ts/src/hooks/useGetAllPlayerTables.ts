import { useCallback } from 'react'
import { usePactState } from '../states/PactState'
import Pact from 'pact-lang-api'
import useGetAllPlayers from './useGetAllPlayers'
import { createAPIHost, dumKeyPair } from '../const'

export default function useGetAllPlayerTables() {
    const getAllPlayers = useGetAllPlayers()
    const workingHosts = usePactState((state) => state.workingHosts)
    const setPlayersData = usePactState((state) => state.setPlayersData)
    return useCallback(async () => {
        const players = await getAllPlayers()
        const cmd = await Pact.fetch.local(
            {
                pactCode: `(map (user.pacty-parrots-two.get-table) ${JSON.stringify(players)})`,
                keyPairs: dumKeyPair,
            },
            createAPIHost(workingHosts[0], '0')
        )
        const data = await cmd.data
        setPlayersData(data)
    }, [workingHosts])
}
