import { useCallback } from 'react'
import { dumKeyPair, FetchPactLocal } from '../const'

export default function useCheckCrossChainBalance() {
    return useCallback(async (playerId: string) => {
        if (!playerId) {
            return []
        }
        const promises = []
        for (let i = 0; i < 20; i++) {
            promises.push(
                FetchPactLocal(
                    {
                        pactCode: `(coin.get-balance ${JSON.stringify(playerId)})`,
                        keyPairs: dumKeyPair,
                    },
                    i.toString()
                )
            )
        }

        const res = await Promise.allSettled(promises)

        const balances: { chainId: number; balance: number }[] = []
        res.forEach((item, chainId: number) => {
            const balance = item.status === 'fulfilled' ? item.value.data : 0

            if (balance > 0) {
                balances.push({
                    chainId,
                    balance,
                })
            }
        })

        return balances
    }, [])
}
