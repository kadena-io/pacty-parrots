import { useCallback } from 'react'
import { dumKeyPair, FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetPlayerTable() {
    const setPlayerTable = usePactState((state) => state.setPlayerTable)
    return useCallback(
        async (playerId: string) => {
            try {
                if (!playerId) return
                const cmd = await FetchPactLocal({
                    pactCode: `(free.pacty-parrots-two.get-table ${JSON.stringify(playerId)})`,
                    keyPairs: dumKeyPair,
                })
                const data = await cmd.data
                setPlayerTable(data)
                return data
            } catch (e){
                console.warn(e)
                const emptyPlayerTable = {
                    rounds: [],
                    'rounds-played': [],
                    'coins-out': 0,
                    'coins-in': 0,
                }
                setPlayerTable(emptyPlayerTable)
                return emptyPlayerTable
            }
        },
        [setPlayerTable]
    )
}
