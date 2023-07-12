import { useCallback } from 'react'
import { usePactState } from '../states/PactState'
import Pact from 'pact-lang-api'
import { createAPIHost } from '../const'

export default function useEndRound() {
    const playerId = usePactState((state) => state.playerId)
    const workingHosts = usePactState((state) => state.workingHosts)
    const playerTable = usePactState((state) => state.playerTable)
    return useCallback(async () => {
        if (!playerId) {
            alert('Please Log-in!')
            window.location.reload()
        }

        try {
            const currentRound = playerTable['rounds'].length - 1
            const signCmd = {
                pactCode: `(user.pacty-parrots.end-round ${JSON.stringify(playerId)})`,
                caps: [
                    Pact.lang.mkCap('Gas capability', 'description of gas cap', 'coin.GAS', []),
                    Pact.lang.mkCap(
                        'transfer capability',
                        'description of transfer cap',
                        'coin.TRANSFER',
                        ['parrot-bank', playerId, playerTable['rounds'][currentRound][1]['int']]
                    ),
                    Pact.lang.mkCap(
                        'bet capability',
                        'description of bet cap',
                        'user.pacty-parrots.BET',
                        [playerId]
                    ),
                ],
                sender: playerId,
                gasLimit: 50000,
                chainId: '0',
                ttl: 28800,
                envData: {},
            }
            const cmd = await Pact.wallet.sign(signCmd)
            const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(workingHosts[0], '0'))
            return reqKey.requestKeys[0]
        } catch (err) {
            alert('you cancelled the TX or you did not have the wallet app open')
            window.location.reload()
        }
    }, [playerId, workingHosts, playerTable])
}
