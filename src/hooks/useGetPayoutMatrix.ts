import { useCallback } from 'react'
import { dumKeyPair, FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetPayoutMatrix() {
    const setPayoutMatrix = usePactState((state) => state.setPayoutMatrix)
    return useCallback(async () => {
        const cmd = await FetchPactLocal({
            pactCode: `(user.pacty-parrots.get-payout-matrix)`,
            keyPairs: dumKeyPair,
        })
        const data = await cmd.data

        setPayoutMatrix(data)
        return data
    }, [setPayoutMatrix])
}
