import Pact from 'pact-lang-api'
import { useCallback } from 'react'
import { usePactState } from '../states/PactState'

export default function useGetWorkingHosts() {
    const setHosts = usePactState((state) => state.setHosts)
    return useCallback(async () => {
        const hosts = await Pact.network.hosts()
        if (hosts.length === 0) {
            alert('All nodes currently unavailable. Please try again later.')
            window.location.reload()
        }
        setHosts(hosts.length)
    }, [])
}
