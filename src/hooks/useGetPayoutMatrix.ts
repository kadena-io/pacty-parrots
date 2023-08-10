import { useCallback } from "react";
import { FetchPactLocal } from "../const";
import { usePactState } from "../states/PactState";

export default function useGetPayoutMatrix() {
  const setPayoutMatrix = usePactState((state) => state.setPayoutMatrix);
  return useCallback(async () => {
    try {
      const data = await FetchPactLocal("get-payout-matrix");

      setPayoutMatrix(data);
      return data;
    } catch (e) {
      console.warn(e);
      setPayoutMatrix({});
      return {};
    }
  }, [setPayoutMatrix]);
}
