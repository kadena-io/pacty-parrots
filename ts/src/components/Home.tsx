import { Box, Grid, Typography } from '@mui/material'
import styles from '../styles/home/homeStyle'

export default function HomePage() {
    const {
        playRoundButton: playRoundButtonClass,
        leaderboardTypography: leaderboardTypographyClass,
        scoreStyle: scoreStyleClass,
        gridDisplay: gridDisplayClass,
        typographyStyle: typographyStyleClass,
        leaderboardBox: leaderboardBoxClass,
    } = styles()

    const showContent = () => {
        // TODO
        return true
    }

    return (
        <Grid container direction="row">
            <Grid style={{ flex: 2 }}>
                {showContent() ? (
                    <div>
                        <Grid direction="row" className={gridDisplayClass}>
                            <Box className={typographyStyleClass}>
                                <Typography>ROUNDS PLAYED:</Typography>
                                <Typography variant="h4" className={scoreStyle}>
                                    {playerTable ? playerTable['rounds-played']['int'] : '0'}
                                </Typography>
                            </Box>
                            <Box className={typographyStyleClass}>
                                <Typography>TOTAL SCORE:</Typography>
                                <Typography variant="h4" className={scoreStyle}>
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
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid
                                style={{ marginTop: 80, marginBottom: 0 }}
                                container
                                justify="center"
                            ></Grid>

                            <Grid
                                container
                                direction="row"
                                justify="space-around"
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
                                className={scoreStyle}
                                style={{ marginTop: 20 }}
                            >
                                {spinText}
                            </Typography>
                            <Box style={{ height: 50, marginTop: 50 }}>
                                {showStartButton(startDis)}
                                {showContEndButtons(endDis)}
                            </Box>
                        </Grid>
                    </div>
                ) : (
                    <Typography variant="h4" className={scoreStyle} style={{ margin: 70 }}>
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
                            className={leaderboardTypography}
                            style={{ marginTop: 3 }}
                        >
                            account: {pactContext.playerId} | balance: {pactContext.accountBalance}
                        </Typography>
                    ) : (
                        <Typography
                            variant="h6"
                            className={leaderboardTypography}
                            style={{ marginTop: 3 }}
                        >
                            no account!
                        </Typography>
                    )}
                    {showContent() ? (
                        <Box className={leaderboardBox}>
                            {showResults()}
                            <Typography
                                variant="h4"
                                className={leaderboardTypography}
                                style={{ marginTop: 30 }}
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
                                items={sortPlayersByScore(playersData, players).map((usr, i) => ({
                                    account: (
                                        <Typography
                                            variant="h8"
                                            style={{ color: 'black', fontWeight: 'bold' }}
                                        >
                                            {usr['user'].slice(0, 10)}
                                        </Typography>
                                    ),
                                    score: (
                                        <Typography
                                            variant="h8"
                                            style={{ color: 'orange', fontWeight: 'bold' }}
                                        >
                                            {`${usr['coins-out'] - usr['coins-in']}`}
                                        </Typography>
                                    ),
                                    rounds: (
                                        <Typography
                                            variant="h8"
                                            style={{ color: 'purple', fontWeight: 'bold' }}
                                        >
                                            {usr['rounds-played']['int']}
                                        </Typography>
                                    ),
                                    rank: (
                                        <Typography
                                            variant="h8"
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
