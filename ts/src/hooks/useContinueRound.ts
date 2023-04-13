import { useCallback } from 'react'
import { usePactState } from '../states/PactState'
import Pact from 'pact-lang-api'
import { createAPIHost } from '../const'

export default function useContinueRound() {
    const playerId = usePactState((state) => state.playerId)
    const workingHosts = usePactState((state) => state.workingHosts)
    const setRequestKey = usePactState((state) => state.setRequestKey)
    return useCallback(async () => {
        if (!playerId) {
            alert('Please Log-in!')
            window.location.reload()
        }

        try {
            const signCmd = {
                pactCode: `(user.pacty-parrots-two.continue-round ${JSON.stringify(playerId)})`,
                // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
                caps: [Pact.lang.mkCap('Gas capability', 'description of gas cap', 'coin.GAS', [])],
                sender: playerId,
                gasLimit: 10000,
                chainId: '0',
                ttl: 28800,
                envData: {},
            }
            const cmd = await Pact.wallet.sign(signCmd)
            console.log(cmd)
            const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(workingHosts[0], '0'))

            console.log(reqKey.requestKeys[0])
            setRequestKey(reqKey.requestKeys[0])
        } catch (e) {
            alert('you cancelled the TX or you did not have the wallet app open')
            window.location.reload()
        }
    }, [playerId, workingHosts])
}
