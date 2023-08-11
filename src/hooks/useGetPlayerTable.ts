import { useCallback } from "react";
import { FetchPactLocal } from "../const";
import { usePactState } from "../states/PactState";

export default function useGetPlayerTable() {
  const setPlayerTable = usePactState((state) => state.setPlayerTable);
  return useCallback(
    async (playerId: string) => {
      try {
        if (!playerId) return;
        const data = await FetchPactLocal("get-table", playerId);
        setPlayerTable(data);
        return data;
      } catch (e) {
        console.warn(e);
        const emptyPlayerTable = {
          rounds: [],
          "rounds-played": [],
          "coins-out": 0,
          "coins-in": 0,
        };
        setPlayerTable(emptyPlayerTable);
        return emptyPlayerTable;
      }
    },
    [setPlayerTable]
  );
}
