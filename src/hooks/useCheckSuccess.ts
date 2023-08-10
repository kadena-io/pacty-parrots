import { useCallback } from "react";
import Pact from "pact-lang-api";
import { createAPIHost } from "../const";
import { usePactState } from "../states/PactState";

export default function useCheckSucces() {
  const workingHosts = usePactState((state) => state.workingHosts);
  const requestKey = usePactState((state) => state.requestKey);
  const setRequestKey = usePactState((state) => state.setRequestKey);
  return useCallback(async () => {
    const [res] = await Pact.fetch.poll(
      {
        requestKeys: [requestKey],
      },
      createAPIHost()
    );

    if (res) {
      const { status } = res.result;
      setRequestKey("");
      if (status === "failure") {
        alert("TX failed -> please check username and/or wallet signature");
        window.location.reload();
      }
    } else {
      console.info("pending");
    }
  }, [requestKey, workingHosts]);
}
