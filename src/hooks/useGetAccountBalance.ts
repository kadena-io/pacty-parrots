import { useCallback } from "react";
import { dumKeyPair, FetchPactLocalRaw } from "../const";
import { usePactState } from "../states/PactState";

export default function useGetAccountBalance() {
  const playerId = usePactState((state) => state.playerId);
  const setAccountBalance = usePactState((state) => state.setAccountBalance);

  return useCallback(async () => {
    if (!playerId) return;
    let balance = "0";
    try {
      const cmd = await FetchPactLocalRaw({
        pactCode: `(coin.get-balance ${JSON.stringify(playerId)})`,
        keyPairs: dumKeyPair,
      });
      const data = await cmd.data;
      if (data) {
        try {
          balance = data["decimal"].toString().substring(0, 15);
        } catch {
          balance = data;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    setAccountBalance(parseFloat(balance));
  }, [playerId, setAccountBalance]);
}
