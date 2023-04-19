import { useCallback } from 'react'
import Pact from 'pact-lang-api'
import { createAPIHost, dumKeyPair, FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetAccountBalance() {
    const playerId = usePactState((state) => state.playerId)
    const workingHosts = usePactState((state) => state.workingHosts)
    const setAccountBalance = usePactState((state) => state.setAccountBalance)

    return useCallback(async () => {
        const cmd = await FetchPactLocal(
            {
                pactCode: `(coin.get-balance ${JSON.stringify(playerId)})`,
                keyPairs: dumKeyPair,
            },
            '1'
        )
        const data = await cmd.data
        let balance = '0'
        if (data) {
            try {
                balance = data['decimal'].toString().substring(0, 15)
            } catch {
                balance = data
            }
        }
        setAccountBalance(parseFloat(balance))
    }, [playerId, workingHosts])
}
