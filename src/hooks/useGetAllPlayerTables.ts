import { useCallback } from 'react'
import { usePactState } from '../states/PactState'
import useGetAllPlayers from './useGetAllPlayers'
import { dumKeyPair, FetchPactLocal } from '../const'

export default function useGetAllPlayerTables() {
    const getAllPlayers = useGetAllPlayers()
    const workingHosts = usePactState((state) => state.workingHosts)
    let players = usePactState((state) => state.players)
    const setPlayersData = usePactState((state) => state.setPlayersData)
    return useCallback(async () => {
        if (players.length === 0) {
            // eslint-disable-next-line
            players = await getAllPlayers()
        }
        const cmd = await FetchPactLocal({
            pactCode: `(map (user.pacty-parrots.get-table) ${JSON.stringify(players)})`,
            keyPairs: dumKeyPair,
        })
        const { data } = await cmd
        setPlayersData(data)
    }, [players, workingHosts])
}
