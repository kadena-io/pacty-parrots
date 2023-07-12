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
import useGetAllPlayerTables from '../hooks/useGetAllPlayerTables'
import useGetWorkingHosts from '../hooks/useGetWorkingHosts'
import useGetPayoutMatrix from '../hooks/useGetPayoutMatrix'
import { createAPIHost, getParrotImage, loadingParrots } from '../const'
import Pact from 'pact-lang-api'
import useStartRound from '../hooks/useStartRound'
import useContinueRound from '../hooks/useContinueRound'
import useGetPlayerTable from '../hooks/useGetPlayerTable'
import useEndRound from '../hooks/useEndRound'

export default function Home() {
    const {
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

    const [spinText, setSpinText] = useState('')

    const [startDis, setStartDis] = useState(false)
    const [endDis, setEndDis] = useState(true)

    const getWorkingHosts = useGetWorkingHosts()
    const getAllPlayersTable = useGetAllPlayerTables()
    const continueRound = useContinueRound()
    const getPlayerTable = useGetPlayerTable()
    const getPayoutMatrix = useGetPayoutMatrix()
    const getAccountBalance = useGetAccountBalance()

    const setRequestKey = usePactState((state) => state.setRequestKey)

    async function fetchPlayerData() {
        const currentRound = getCurrentRound()

        if (playerTable && playerTable.rounds[currentRound]) {
            const len = playerTable['rounds'][currentRound][0].length - 1
            const pt = playerTable['rounds'][currentRound][0][len]

            const first = pt[0]
            const second = pt[1]
            setLeftImage(getParrotImage('large', first))
            setRightImage(getParrotImage('large', second))
            //potentially tell people their score here...

            const text = pt.includes('I') || pt.includes('C') ? "Round Zero'd out!" : ''

            setSpinText(text)
            //toggle buttons:
            if (playerTable['rounds'][currentRound][2] === 'closed') {
                setStartDis(false)
            }
            if (playerTable['rounds'][currentRound][2] === 'open') {
                setEndDis(false)
            }
        } else {
            //supposed to only reach here if it is a new user
            setStartDis(false)
        }
    }

    useEffect(() => {
        const updateButtonStatus = () => {
            const currentRound = getCurrentRound()
            if (playerTable && playerTable.rounds[currentRound]) {
                if (playerTable['rounds'][currentRound][2] === 'closed') {
                    setStartDis(false)
                }
                if (playerTable['rounds'][currentRound][2] === 'open') {
                    setEndDis(false)
                }
            }
        }

        updateButtonStatus()
    }, [playerTable, getCurrentRound])
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {
        const fn = async () => {
            if (didMount) {
                return
            }
            setDidMount(true)
            await getWorkingHosts()

            await getPlayerTable(playerId)

            await getPayoutMatrix()

            await getAllPlayersTable()

            await fetchPlayerData()

            await getAccountBalance()
        }

        fn()
        // eslint-disable-next-line
    }, [setDidMount])

    const showContent = () => {
        if (playerId === '') {
            return true
        } else {
            if (playersData && playersData.length !== 0 && playerId) {
                return true
            }
            return false
        }
    }

    // eslint-disable-next-line
    function getCurrentRound() {
        if (playerTable) {
            return playerTable['rounds'].length - 1
        } else {
            return 0
        }
    }

    const showRoundPoints = () => {
        const currentRound = getCurrentRound()
        if (!playerTable) {
            return 0
        } else {
            if (
                playerTable['rounds'][currentRound] &&
                playerTable['rounds'][currentRound][2] === 'open'
            ) {
                return playerTable['rounds'][currentRound][1]['int']
            } else {
                return 0
            }
        }
    }

    const sortPlayersByScore = (playersData: TodoType, players: TodoType) => {
        const playersNew = playersData.slice()
        playersNew.map((usr: TodoType, i: number) => {
            return (usr['user'] = players[i])
        })
        const sorted = playersNew.sort(function (x: TodoType, y: TodoType) {
            const x1 = x['coins-out'] - x['coins-in']
            const y1 = y['coins-out'] - y['coins-in']
            if (x1 > y1) {
                return -1
            }
            if (x1 < y1) {
                return 1
            }
            return 0
        })
        return sorted
    }

    const spinParrots = () => {
        setInterval(() => {
            setLeftImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
            setRightImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
        }, 1500)
    }

    const startRound = useStartRound()

    const handlePlayRound = async (round: string) => {
        setStartDis(true)
        setEndDis(true)
        let requestKey = ''
        if (round === 'end') {
            setLeftImage(require('../assets/loading_money.gif'))
            setRightImage(require('../assets/loading_money.gif'))
            setSpinText('money coming your way!')
            requestKey = await endRound()
        } else if (round === 'start') {
            setLeftImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
            setRightImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
            spinParrots()
            setSpinText('wait for your result...')
            requestKey = await startRound()
        } else if (round === 'cont') {
            setLeftImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
            setRightImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
            spinParrots()
            setSpinText('wait for your result...')
            requestKey = await continueRound()
        } else {
            return
        }

        setRequestKey(requestKey)

        await Pact.fetch.listen({ listen: requestKey }, createAPIHost())

        setRequestKey('')
        window.location.reload()
    }

    const onStartClick = async () => {
        setSpinText('please sign tx in the wallet')
        setStartDis(true)
        setEndDis(true)
        handlePlayRound('start')
    }

    const onContinueClick = async () => {
        setSpinText('please sign tx in the wallet')
        setStartDis(true)
        setEndDis(true)

        handlePlayRound('cont')
    }

    const endRound = useEndRound()

    const onCashOutClick = async () => {
        setStartDis(true)
        setEndDis(true)
        setSpinText('please sign cash out tx in the wallet')
        handlePlayRound('end')
    }

    return (
        <Grid container direction="row">
            <Grid style={{ flex: 2 }}>
                {showContent() ? (
                    <div>
                        <Grid direction="row" container style={gridDisplayStyle}>
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
                                <img alt="parrot" src={leftImage} />

                                <img alt="parrot" src={rightImage} />
                            </Grid>
                            <Typography variant="h4" style={{ ...scoreStyle, marginTop: 20 }}>
                                {spinText}
                            </Typography>
                            <Box style={{ height: 50, marginTop: 50 }}>
                                {!startDis && endDis && !spinText && (
                                    <StartButton onClick={onStartClick} />
                                )}
                                {!endDis && <SpinAgainButton onClick={onContinueClick} />}
                                {!endDis && (
                                    <CashOutButton
                                        onClick={onCashOutClick}
                                        showRoundPoints={showRoundPoints}
                                    />
                                )}
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
                            <Results
                                getCurrentRound={getCurrentRound}
                                showRoundPoints={showRoundPoints}
                            />
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
                                items={sortPlayersByScore(playersData, players).map(
                                    (usr: TodoType, i: number) => ({
                                        account: (
                                            <Typography
                                                variant="h6"
                                                style={{ color: 'black', fontWeight: 'bold' }}
                                            >
                                                {usr['user'].slice(0, 10)}
                                            </Typography>
                                        ),
                                        score: (
                                            <Typography
                                                variant="h6"
                                                style={{ color: 'orange', fontWeight: 'bold' }}
                                            >
                                                {`${usr['coins-out'] - usr['coins-in']}`}
                                            </Typography>
                                        ),
                                        rounds: (
                                            <Typography
                                                variant="h6"
                                                style={{ color: 'purple', fontWeight: 'bold' }}
                                            >
                                                {usr['rounds-played']['int']}
                                            </Typography>
                                        ),
                                        rank: (
                                            <Typography
                                                variant="h6"
                                                style={{ color: 'blue', fontWeight: 'bold' }}
                                            >
                                                {`${i + 1}º`}
                                            </Typography>
                                        ),
                                    })
                                )}
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
