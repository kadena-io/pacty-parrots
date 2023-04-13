import { useCallback } from 'react'
import Pact from 'pact-lang-api'
import { createAPIHost, dumKeyPair } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetPayoutMatrix() {
    const workingHosts = usePactState((state) => state.workingHosts)
    const setPayoutMatrix = usePactState((state) => state.setPayoutMatrix)
    return useCallback(async () => {
        const cmd = await Pact.fetch.local(
            {
                pactCode: `(pacty-parrots-two.get-payout-matrix)`,
                keyPairs: dumKeyPair,
            },
            createAPIHost(workingHosts[0], '0')
        )
        const data = await cmd.data

        setPayoutMatrix(data)
        return data
    }, [workingHosts])
}
