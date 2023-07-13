import { useCallback } from 'react'
import { dumKeyPair, FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetPayoutMatrix() {
    const setPayoutMatrix = usePactState((state) => state.setPayoutMatrix)
    return useCallback(async () => {
        try {
            const cmd = await FetchPactLocal({
                pactCode: `(free.pacty-parrots.get-payout-matrix)`,
                keyPairs: dumKeyPair,
            })
            const data = await cmd.data

            setPayoutMatrix(data)
            return data
        } catch (e) {
            console.warn(e)
            setPayoutMatrix({})
            return {}
        }
    }, [setPayoutMatrix])
}
