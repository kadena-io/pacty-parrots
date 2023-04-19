import { Box, Grid, Typography } from '@mui/material'
import styles from '../styles/home/homeStyle'
import { usePactState } from '../states/PactState'
import { useEffect, useState } from 'react'

import BlueParrotPng from '../assets/result/large/blue.png'
import YellowParrotPng from '../assets/result/large/yellow.png'
import StartButton from './buttons/StartButton'
import SpinAgainButton from './buttons/SpinAgainButton'
import CashOutButton from './buttons/CashOutButton'
import useGetAccountBalance from '../hooks/useGetAccountBalance'
import ListView from './ListView'
import Results from './Results'
import { TodoType } from '../types'

export default function Home() {
    const {
        playRoundButton: playRoundButtonStyle,
        leaderboardTypography: leaderboardTypographyStyle,
        scoreStyle,
        gridDisplay: gridDisplayStyle,
        typographyStyle,
        leaderboardBox: leaderboardBoxStyle,
    } = styles

    const playerTable = usePactState((state) => state.playerTable)
    const playerId = usePactState((state) => state.playerId)
    const accountBalance = usePactState((state) => state.balance)
    const playersData = usePactState((state) => state.playersData)
    const players = usePactState((state) => state.players)
    
    const [leftImage, setLeftImage] = useState(BlueParrotPng)
  const [rightImage, setRightImage] = useState(YellowParrotPng)

  const [spinText, setSpinText] = useState("")

  const [startDis, setStartDis] = useState(true);
  const [continueDis, setContinueDis] = useState(true);
  const [endDis, setEndDis] = useState(true)

    const showContent = () => {
        // TODO
        return true
    }

    const showStartButton = (startDis: boolean) => {

    }
    const showContEndButtons = (endDis: boolean) => {

    }

    const currentRound = usePactState(state => state.round) // -1

    const showRoundPoints = () => {
        //player is not registered
        if (!playerTable) {
          return "0"
        }
        else {
            if (startDis && playerTable["rounds"][currentRound] && playerTable["rounds"][currentRound][2] === "open") {
                return playerTable["rounds"][currentRound][1]["int"]
            } else {
                return '0'
            }
        }
        
      }

      const sortPlayersByScore = (playersData: TodoType, players: TodoType) => {
        const playersNew = playersData.slice();
        playersNew.map((usr: TodoType, i: number) => {
          usr['user'] = players[i];
        })
        const sorted = playersNew.sort(function(x: TodoType, y: TodoType) {
          const x1 = x["coins-out"] - x["coins-in"];
          const y1 = y["coins-out"] - y["coins-in"];
          if (x1 > y1) { return -1 }
          if (x1 < y1) { return 1 }
          return 0;
        });
        return sorted;
      }
    return (
        <Grid container direction="row">
            <Grid style={{ flex: 2 }}>
                {showContent() ? (
                    <div>
                        <Grid direction="row" style={gridDisplayStyle}>
                            <Box style={typographyStyle}>
                                <Typography>ROUNDS PLAYED:</Typography>
                                <Typography variant="h4" style={scoreStyle}>
                                    {playerTable ? playerTable['rounds-played']['int'] : '0'}
                                </Typography>
                            </Box>
                            <Box style={typographyStyle}>
                                <Typography>TOTAL SCORE:</Typography>
                                <Typography variant="h4" style={scoreStyle}>
                                    {playerTable
                                        ? playerTable['coins-out'] - playerTable['coins-in']
                                        : '0'}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid
                            style={{ marginTop: 0 }}
                            container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Grid
                                style={{ marginTop: 80, marginBottom: 0 }}
                                container
                                justifyContent="center"
                            ></Grid>

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                <img
                                    // src={require("../assets/result/large/mustache.png")}
                                    src={leftImage}
                                />

                                <img
                                    // src={require("../assets/loading_long_big.gif")}
                                    src={rightImage}
                                />
                            </Grid>
                            <Typography
                                variant="h4"
                                style={{ ...scoreStyle, marginTop: 20 }}
                            >
                                {spinText}
                            </Typography>
                            <Box style={{ height: 50, marginTop: 50 }}>
                                <StartButton display={startDis} />
                                <SpinAgainButton display={endDis}/>
                                <CashOutButton display={endDis} roundPoints={showRoundPoints()}/>
                            </Box>
                        </Grid>
                    </div>
                ) : (
                    <Typography variant="h4" style={{ ...scoreStyle, margin: 70 }}>
                        {playerId ? (
                            <div>connecting to an available node...</div>
                        ) : (
                            <div>please enter account</div>
                        )}
                    </Typography>
                )}
            </Grid>

            <Grid
                style={{
                    flex: 1,
                    background:
                        'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                    position: 'relative',
                    minHeight: '90vh',
                }}
            >
                <div style={{ overflow: 'scroll', height: window.innerHeight }}>
                    {playerId ? (
                        <Typography
                            variant="h6"
                            
                            style={{ ...leaderboardTypographyStyle, marginTop: 3 }}
                        >
                            account: {playerId} | balance: {accountBalance}
                        </Typography>
                    ) : (
                        <Typography
                            variant="h6"
                            
                            style={{ ...leaderboardTypographyStyle, marginTop: 3 }}
                        >
                            no account!
                        </Typography>
                    )}
                    {showContent() ? (
                        <Box style={leaderboardBoxStyle}>
                            <Results showRoundPoints={showRoundPoints}/>
                            <Typography
                                variant="h4"
                                
                                style={{ ...leaderboardTypographyStyle, marginTop: 30 }}
                            >
                                LEADERBOARD
                            </Typography>
                            <ListView
                                columns={[
                                    { key: 'rank', label: 'Rank' },
                                    { key: 'account', label: 'Account' },
                                    { key: 'score', label: 'Score' },
                                    { key: 'rounds', label: 'Rounds' },
                                ]}
                                items={sortPlayersByScore(playersData, players).map((usr: TodoType, i: number) => ({
                                    account: (
                                        <Typography
                                            //variant="h8"
                                            variant="h6"
                                            style={{ color: 'black', fontWeight: 'bold' }}
                                        >
                                            {usr['user'].slice(0, 10)}
                                        </Typography>
                                    ),
                                    score: (
                                        <Typography
                                            //variant="h8"
                                            variant="h6"
                                            style={{ color: 'orange', fontWeight: 'bold' }}
                                        >
                                            {`${usr['coins-out'] - usr['coins-in']}`}
                                        </Typography>
                                    ),
                                    rounds: (
                                        <Typography
                                            //variant="h8"
                                            variant="h6"
                                            style={{ color: 'purple', fontWeight: 'bold' }}
                                        >
                                            {usr['rounds-played']['int']}
                                        </Typography>
                                    ),
                                    rank: (
                                        <Typography
                                            //variant="h8"
                                            variant="h6"
                                            style={{ color: 'blue', fontWeight: 'bold' }}
                                        >
                                            {`${i + 1}º`}
                                        </Typography>
                                    ),
                                }))}
                            />

                            <div>
                                <img
                                    alt="pig_face"
                                    src={require('../assets/dadparrot.gif')}
                                    style={{
                                        position: 'absolute',
                                        marginLeft: '0p',
                                        marginTop: 0,
                                        left: 10,
                                        bottom: 0,
                                        zIndex: '-1',
                                    }}
                                />
                                <img
                                    alt="pig_face"
                                    src={require('../assets/dadparrot.gif')}
                                    style={{
                                        position: 'absolute',
                                        marginLeft: '0p',
                                        marginTop: 0,
                                        bottom: 0,
                                        right: 0,
                                        opacity: 0.3,
                                        zIndex: '-1',
                                    }}
                                />
                            </div>
                        </Box>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}
