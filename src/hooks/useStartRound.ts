import { useCallback } from "react";
import { usePactState } from "../states/PactState";
import Pact from "pact-lang-api";
import { createAPIHost } from "../const";

export default function useStartRound() {
  const playerId = usePactState((state) => state.playerId);
  return useCallback(async () => {
    if (!playerId) {
      alert("Please Log-in!");
      window.location.reload();
    }

    try {
      const signCmd = {
        pactCode: `(user.pacty-parrots.start-round ${JSON.stringify(
          playerId
        )})`,
        caps: [
          Pact.lang.mkCap(
            "Gas capability",
            "description of gas cap",
            "coin.GAS",
            []
          ),
          Pact.lang.mkCap(
            "transfer capability",
            "description of transfer cap",
            "coin.TRANSFER",
            [playerId, "parrot-bank", 5.0]
          ),
          Pact.lang.mkCap(
            "bet capability",
            "description of bet cap",
            "user.pacty-parrots.BET",
            [playerId]
          ),
        ],
        sender: playerId,
        gasLimit: 10000,
        chainId: "0",
        ttl: 28800,
        envData: {},
      };
      const cmd = await Pact.wallet.sign(signCmd);
      const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost());
      return reqKey.requestKeys[0];
    } catch (err) {
      alert("you cancelled the TX or you did not have the wallet app open");
      window.location.reload();
    }
  }, [playerId]);
}
