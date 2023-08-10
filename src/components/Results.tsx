import { Grid, Typography } from "@mui/material";
import { usePactState } from "../states/PactState";
import styles from "../styles/home/homeStyle";
import ListView from "./ListView";
import { TodoType } from "../types";
import { getParrotImage } from "../const";

interface Props {
  showRoundPoints: () => number;
  getCurrentRound: () => number;
}
export default function Results({ getCurrentRound, showRoundPoints }: Props) {
  const playerTable = usePactState((state) => state.playerTable);
  const currentRound = getCurrentRound();
  const { leaderboardTypography: leaderboardTypographyStyle, scoreStyle } =
    styles;
  const payoutMatrix = usePactState((state) => state.payoutMatrix);

  const filterCurrRound = (playerData: TodoType) => {
    if (
      playerData &&
      playerData["rounds"][currentRound] &&
      playerData["rounds"][currentRound][2] === "open"
    ) {
      const rounds = playerData.length !== 0 ? playerData["rounds"] : [];
      const currRound = rounds[rounds.length - 1];
      return currRound[0].slice(0, 30);
    } else {
      return [];
    }
  };

  return payoutMatrix &&
    playerTable["rounds"][currentRound] &&
    playerTable["rounds"][currentRound][2] === "open" ? (
    <div>
      <Typography
        variant="h4"
        style={{ ...leaderboardTypographyStyle, marginBottom: 30 }}
      >
        CURRENT ROUND
      </Typography>
      <ListView
        style={{ marginBottom: 30 }}
        columns={[
          { key: "spin", label: "Spin" },
          { key: "result", label: "Result" },
          { key: "points", label: "Points" },
        ]}
        items={filterCurrRound(playerTable).map((bet: TodoType, i: number) => {
          return {
            spin: (
              <Typography
                variant="h6"
                style={{ color: "black", fontWeight: "bold" }}
              >
                {i + 1}
              </Typography>
            ),
            result: (
              <Grid container>
                <img
                  alt="parrot"
                  src={getParrotImage("small", bet[0])}
                  style={{ marginRight: 20 }}
                />
                <img alt="parrot" src={getParrotImage("small", bet[1])} />
              </Grid>
            ),
            points: (
              <Typography
                variant="h6"
                style={{ color: "orange", fontWeight: "bold" }}
              >
                {payoutMatrix[bet] ? payoutMatrix[bet]["int"] : ""}
              </Typography>
            ),
          };
        })}
      />
      <Typography variant="h4" style={{ ...scoreStyle, color: "blue" }}>
        Total Round Score: {showRoundPoints() - 5}
      </Typography>
    </div>
  ) : null;
}
