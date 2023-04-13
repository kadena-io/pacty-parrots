import { useCallback } from 'react'
import Pact from 'pact-lang-api'
import { createAPIHost, dumKeyPair } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetPlayerTable() {
    const playerId = usePactState((state) => state.playerId)
    const workingHosts = usePactState((state) => state.workingHosts)
    const setPlayerTable = usePactState((state) => state.setPlayerTable)
    return useCallback(async () => {
        const cmd = await Pact.fetch.local(
            {
                pactCode: `(user.pacty-parrots-two.get-table ${JSON.stringify(playerId)})`,
                keyPairs: dumKeyPair,
            },
            createAPIHost(workingHosts[0], '0')
        )
        // .then(res => {
        //   this.setState({ playerTable: res.data })
        // })
        const data = await cmd.data
        console.log(data)
        setPlayerTable(data)
    }, [playerId, workingHosts])
}
