import { Grid, Typography } from "@mui/material";
import { usePactState } from "../states/PactState";
import styles from '../styles/home/homeStyle'
import ListView from "./ListView";
import { TodoType } from "../types";
import { getParrotImage } from "../const";

interface Props {
    showRoundPoints: () => number
}
export default function Results({
    showRoundPoints
}: Props) {
    const playerTable = usePactState(state => state.playerTable)
    const currentRound = usePactState(state => state.round) // - 1
    const { leaderboardTypography: leaderboardTypographyClass, scoreStyle: scoreStyleClass } = styles;
    const payoutMatrix = usePactState(state => state.payoutMatrix)

    const filterCurrRound = (playerData: TodoType) => {
        if (playerData && playerData["rounds"][currentRound][2] === "open") {
          const rounds = (playerData.length !== 0) ? playerData["rounds"] : [];
          const currRound = rounds[rounds.length - 1]
          console.log(currRound);
          return currRound[0].slice(0,30);
        } else {
          return [];
        }
      }

    return (
        playerTable['rounds'][currentRound][2] === "open" ? (
            <div>
            <Typography variant="h4" className={leaderboardTypographyClass} style={{marginBottom:30}}>
          CURRENT ROUND
        </Typography>
        <ListView
          style={{ marginBottom: 30 }}
          columns={[
            { key: "spin", label: "Spin" },
            { key: "result", label: "Result" },
            { key: "points", label: "Points" }
          ]}
          items={
          filterCurrRound(playerTable).map((bet: TodoType, i: number) => {
                return {
                  spin:
                    <Typography variant="h6" style={{color:'black', fontWeight: 'bold'}}>
                      {i + 1}
                    </Typography>,
                  result:
                    <Grid direction="column">
                      <img
                        src={getParrotImage('small', bet[0])}
                        style={{marginRight: 20}}
                      />
                      <img
                        src={getParrotImage('small', bet[1])}
                      />
                    </Grid>,
                  points:
                    <Typography variant="h6" style={{color:'orange', fontWeight: 'bold'}}>
                      {payoutMatrix[bet] ? payoutMatrix[bet]["int"] : ""}
                    </Typography>,
                }
              
        })}
        />
        <Typography variant="h4" className={scoreStyleClass} style={{color:'blue'}}>
          Total Round Score: {showRoundPoints() - 5}
        </Typography>
        </div>
        ): null
    )
}
