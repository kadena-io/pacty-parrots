import { useCallback } from 'react'
import Pact from 'pact-lang-api'
import { createAPIHost, dumKeyPair, FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetAllPlayers() {
    const workingHosts = usePactState((state) => state.workingHosts)
    const setPlayers = usePactState((state) => state.setPlayers)
    return useCallback(async () => {
        /*
        const cmd = await Pact.fetch.local(
            {
                //pactCode: `(pacty-parrots-two.get-users)`,
                pactCode: '(user.pacty-parrots.get-users)',
                keyPairs: dumKeyPair,
                gasLimit: 5000,
                networkId: '0',
            },
            createAPIHost()
            //createAPIHost(workingHosts[0], '0')
        )*/
        const cmd = await FetchPactLocal({
            //pactCode: `(pacty-parrots-two.get-users)`,
            pactCode: '(user.pacty-parrots.get-users)',
        })
        const data = await cmd.data
        console.log('getAllPlayers', { data })
        setPlayers(data)
        return data
    }, [workingHosts])
}
