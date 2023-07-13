import { useCallback } from 'react'
import { FetchPactLocal } from '../const'
import { usePactState } from '../states/PactState'

export default function useGetAllPlayers() {
    const setPlayers = usePactState((state) => state.setPlayers)
    return useCallback(async () => {
        const cmd = await FetchPactLocal({
            pactCode: '(user.pacty-parrots.get-users)',
        })
        const data = await cmd.data
        setPlayers(data)
        return data
    }, [setPlayers])
}
