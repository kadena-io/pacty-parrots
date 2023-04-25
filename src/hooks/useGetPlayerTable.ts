import { useCallback } from 'react'
import { dumKeyPair, FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetPlayerTable() {
    const setPlayerTable = usePactState((state) => state.setPlayerTable)
    return useCallback(
        async (playerId: string) => {
            if (!playerId) return
            const cmd = await FetchPactLocal({
                pactCode: `(user.pacty-parrots.get-table ${JSON.stringify(playerId)})`,
                keyPairs: dumKeyPair,
            })
            const data = await cmd.data
            setPlayerTable(data)
            return data
        },
        [setPlayerTable]
    )
}
