import { useCallback } from "react";
import { FetchPactLocal } from "../const";
import { usePactState } from "../states/PactState";

export default function useGetAllPlayers() {
  const setPlayers = usePactState((state) => state.setPlayers);
  return useCallback(async () => {
    const data = await FetchPactLocal("get-users");
    setPlayers(data);
    return data;
  }, [setPlayers]);
}
