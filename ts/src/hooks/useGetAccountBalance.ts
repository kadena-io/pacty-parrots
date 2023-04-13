import { useCallback } from 'react'
import Pact from 'pact-lang-api'
import { createAPIHost, dumKeyPair } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetAccountBalance() {
    const playerId = usePactState((state) => state.playerId)
    const workingHosts = usePactState((state) => state.workingHosts)

    return useCallback(async () => {
        const cmd = await Pact.fetch.local(
            {
                pactCode: `(coin.get-balance ${JSON.stringify(playerId)})`,
                keyPairs: dumKeyPair,
            },
            createAPIHost(workingHosts[0], '0')
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
    }, [playerId, workingHosts])
}
