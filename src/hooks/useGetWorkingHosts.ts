import { useCallback } from "react";
import { usePactState } from "../states/PactState";

export default function useGetWorkingHosts() {
  const setHosts = usePactState((state) => state.setHosts);
  const setWorkingHosts = usePactState((state) => state.setWorkingHosts);
  return useCallback(async () => {
    const hosts = [
      "https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact/api/v1/local",
    ];
    if (hosts.length === 0) {
      alert("All nodes currently unavailable. Please try again later.");
      window.location.reload();
    }
    setHosts(hosts.length);
    setWorkingHosts(hosts);
  }, [setHosts, setWorkingHosts]);
}
