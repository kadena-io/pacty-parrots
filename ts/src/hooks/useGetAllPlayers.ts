import { useCallback } from 'react'
import Pact from 'pact-lang-api'
import { createAPIHost, dumKeyPair } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetAllPlayers() {
    const workingHosts = usePactState((state) => state.workingHosts)
    const setPlayers = usePactState((state) => state.setPlayers)
    return useCallback(async () => {
        const cmd = await Pact.fetch.local(
            {
                pactCode: `(pacty-parrots-two.get-users)`,
                keyPairs: dumKeyPair,
            },
            createAPIHost(workingHosts[0], '0')
        )
        const data = await cmd.data
        setPlayers(data)
        return data
    }, [workingHosts])
}
