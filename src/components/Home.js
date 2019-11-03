import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/home/homeStyle";
import { Box, Button, Typography, Grid } from "@material-ui/core";
import ListView from "./ListView";

import Pact from 'pact-lang-api';

import PactContext from "../contexts/PactContext";

const ROUND_TIMEOUT = 300000;
const REFRESH_TIME = 600;
const hosts = ["eu2","us2","eu1","eu2","ap1","ap2"]
const chainIds = ["0","1",'2',"3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet02/chain/${chainId}/pact`
const devNetUrl = (network, chainId) => `https://${network}.tn1.chainweb.com/chainweb/0.0/development/chain/${chainId}/pact`
const devNetHosts = ["us1", "us2", "us3"]
const imgMap = {
  "B": require("../assets/result/large/blue.png"),
  "G": require("../assets/result/large/green.png"),
  "P": require("../assets/result/large/purple.png"),
  "R": require("../assets/result/large/red.png"),
  "T": require("../assets/result/large/teal.png"),
  "Y": require("../assets/result/large/yellow.png"),
  "I": require("../assets/result/large/pirate.png"),
  "C": require("../assets/result/large/cop.png"),
  "M": require("../assets/result/large/mustache.png"),
  "H": require("../assets/result/large/sherlock.png"),
  "D": require("../assets/result/large/dealwithit.gif"),
  "S": require("../assets/result/large/spyparrot.png"),
  "K": require("../assets/result/large/keanu.png"),
  "A": require("../assets/result/large/cage.png"),
  "F": require("../assets/result/large/fieri.png"),
}
const imgMapSmall = {
  "B": require("../assets/result/small/blue.png"),
  "G": require("../assets/result/small/green.png"),
  "P": require("../assets/result/small/purple.png"),
  "R": require("../assets/result/small/red.png"),
  "T": require("../assets/result/small/teal.png"),
  "Y": require("../assets/result/small/yellow.png"),
  "I": require("../assets/result/small/pirate.png"),
  "C": require("../assets/result/small/cop.png"),
  "M": require("../assets/result/small/mustache.png"),
  "H": require("../assets/result/small/sherlock.png"),
  "D": require("../assets/result/small/dealwithit.gif"),
  "S": require("../assets/result/small/spyparrot.png"),
  "K": require("../assets/result/small/keanu.png"),
  "A": require("../assets/result/small/cage.png"),
  "F": require("../assets/result/small/fieri.png"),
}
const loadingParrots = [
  require("../assets/loading/60fpsparrot.gif"),
  require("../assets/loading/angryparrot.gif"),
  require("../assets/loading/backwardsparrot.gif"),
  require("../assets/loading/beerparrot.gif"),
  require("../assets/loading/beretparrot.gif"),
  require("../assets/loading/bikerparrot.gif"),
  require("../assets/loading/birthdaypartyparrot.gif"),
  require("../assets/loading/bluntparrot.gif"),
  require("../assets/loading/bobaparrot.gif"),
  require("../assets/loading/bootlegparrot.gif"),
  require("../assets/loading/boredparrot.gif"),
  require("../assets/loading/brazilianfanparrot.gif"),
  require("../assets/loading/brazilianplayerparrot.gif"),
  require("../assets/loading/bunnyparrot.gif"),
  require("../assets/loading/calvinist_parrot.gif"),
  require("../assets/loading/chicoparrot.gif"),
  require("../assets/loading/christmasparrot.gif"),
  require("../assets/loading/confusedparrot.gif"),
  require("../assets/loading/congaparrot.gif"),
  require("../assets/loading/congapartyparrot.gif"),
  require("../assets/loading/copparrot.gif"),
  require("../assets/loading/dealwithitnowparrot.gif"),
  require("../assets/loading/dealwithitparrot.gif"),
  require("../assets/loading/discoparrot.gif"),
  require("../assets/loading/donutparrot.gif"),
  require("../assets/loading/evilparrot.gif"),
  require("../assets/loading/fastparrot.gif"),
  require("../assets/loading/flowerparrot.gif"),
  require("../assets/loading/flyingmoneyparrot.gif"),
  require("../assets/loading/footballparrot.gif"),
  require("../assets/loading/frenchparrot.gif"),
  require("../assets/loading/gentlemanparrot.gif"),
  require("../assets/loading/gothparrot.gif"),
  require("../assets/loading/grouchoparrot.gif"),
  require("../assets/loading/hardhatparrot.gif"),
  require("../assets/loading/harpoparrot.gif"),
  require("../assets/loading/headsetparrot.gif"),
  require("../assets/loading/horizontalparrot.gif"),
  require("../assets/loading/jediparrot.gif"),
  require("../assets/loading/laptop_parrot.gif"),
  require("../assets/loading/mardigrasparrot.gif"),
  require("../assets/loading/marshmallowparrot.gif"),
  require("../assets/loading/middleparrot.gif"),
  require("../assets/loading/moonwalkingparrot.gif"),
  require("../assets/loading/mustacheparrot.gif"),
  require("../assets/loading/opensourceparrot.gif"),
  require("../assets/loading/partyparrot.gif"),
  require("../assets/loading/pingpongparrot.gif"),
  require("../assets/loading/pirateparrot.gif"),
  require("../assets/loading/popcornparrot.gif"),
  require("../assets/loading/pumpkinparrot.gif"),
  require("../assets/loading/redenvelopeparrot.gif"),
  require("../assets/loading/redhatparrot.gif"),
  require("../assets/loading/reversecongaparrot.gif"),
  require("../assets/loading/reverseparrot.gif"),
  require("../assets/loading/reverseportalorangeparrot.gif"),
  require("../assets/loading/sassyparrot.gif"),
  require("../assets/loading/scienceparrot.gif"),
  require("../assets/loading/sherlockholmesparrot.gif")
]


const HomePage = () => {
  const classes = styles();

  const pactContext = useContext(PactContext);

  useEffect(() => {
    async function fetchPlayers() {
      await pactContext.getAllPlayerTables();
    }

    async function fetchPlayerData() {
      await pactContext.getPlayerTable();
      await pactContext.getPayoutMatrix()

      if (pactContext.getPT()) {
        const len = pactContext.getPT()["rounds"][pactContext.getCurrentRound()][0].length - 1
        const pt = pactContext.getPT()["rounds"][pactContext.getCurrentRound()][0][len]
        const first = pt[0]
        const second = pt[1]
        setLeftImage(imgMap[first])
        setRightImage(imgMap[second])
        //potentially tell people their score here...

        const text = pt.includes("I") || pt.includes("C") ? "Round Zero'd out!" : ""

        setSpinText(text)
        //toggle buttons:
        if (pactContext.getPT()["rounds"][pactContext.getCurrentRound()][2] === "closed") {
          setStartDis(false)
        }
        if (pactContext.getPT()["rounds"][pactContext.getCurrentRound()][2] === "open") {
          setEndDis(false)
          setContinueDis(false)
        }
     }
     else {
       //supposed to only reach here if it is a new user
       setStartDis(false)
     }
    }

    async function fetchReqKey() {
      const reqKey = await pactContext.getReqKey();
      console.log(reqKey);
      if (reqKey) {
        setStartDis(true)
        setEndDis(true)
        setContinueDis(true)
        handlePlayRound();
      }
    }

    async function fetchCurrentRound() {
      pactContext.getCurrentRound()
    }

    async function fetchPayouts() {
      pactContext.getPayoutMatrix()
    }

    async function hosts() {
      await pactContext.getWorkingHosts();
      fetchReqKey();
      fetchPayouts();
      fetchPlayers();
      fetchPlayerData();
      fetchCurrentRound();
      await pactContext.getAccountBalance();
    }
    hosts();

  }, [])

  const [isLoading, setIsLoading] = useState(false);
  const [playersData, setPlayersData] = useState([]);
  const [startDis, setStartDis] = useState(true);
  const [continueDis, setContinueDis] = useState(true);
  const [endDis, setEndDis] = useState(true)
  const [spinText, setSpinText] = useState("")
  const [leftImage, setLeftImage] = useState(require("../assets/result/large/blue.png"))
  const [rightImage, setRightImage] = useState(require("../assets/result/large/yellow.png"))
  // const [leftImage, setLeftImage] = useState("")
  // const [rightImage, setRightImage] = useState("")
  const [timer, setTimer] = useState(ROUND_TIMEOUT);

  const handlePlayRound = async (round) => {
    // const oldState = { "end": endDis, "cont": continueDis, "start": startDis }
    setContinueDis(true);
    setStartDis(true);
    setEndDis(true);
    if (round === "end") {
      setLeftImage(require("../assets/loading_money.gif"))
      setRightImage(require("../assets/loading_money.gif"))
      setSpinText("money coming your way!")
    } else {
      setLeftImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
      setRightImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
      spinParrots();
      setSpinText("wait for your result...")

    }
    const reqKey = await pactContext.getReqKey();
    console.log(reqKey)
    Pact.fetch.listen({ listen: reqKey }, createAPIHost(pactContext.workingHosts[0], "0"))
      .then(res => {
        // console.log(res);
        if (res.status === "success") {
          console.log("success");
          pactContext.setReqKey("");
          window.location.reload();
        } else if (res.status === "failure") {
          console.log("failed");
          pactContext.setReqKey("")
          alert(`your requested bet tx failed with error: ${res.error.message}`);
          window.location.reload()
        } else if (res === "timeout") {
          pactContext.setReqKey("");
          alert(`cannot process your bet at this time`);
          window.location.reload();
        }
      }).catch(() => {
        window.location.reload();
      })
  };

  const spinParrots = () => {
    setInterval(() => {
      setLeftImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
      setRightImage(loadingParrots[Math.floor(Math.random() * loadingParrots.length)])
    }, 1500)
  }

  const showRoundPoints = () => {
    //player is not registered
    if (!pactContext.playerTable) {
      return "0"
    }
    else {
      //start button disabled, so not first roll in round.
      if (startDis && pactContext.playerTable["rounds"][pactContext.getCurrentRound()][2] === "open") {
        return pactContext.playerTable["rounds"][pactContext.getCurrentRound()][1]["int"];
      //first roll in round
      } else {
        return "0";
      }
    }
  }

  const sortPlayersByScore = (playersData, players) => {
    const playersNew = playersData.slice();
    playersNew.map((usr, i) => {
      usr['user'] = players[i];
    })
    const sorted = playersNew.sort(function(x, y) {
      const x1 = x["coins-out"] - x["coins-in"];
      const y1 = y["coins-out"] - y["coins-in"];
      if (x1 > y1) { return -1 }
      if (x1 < y1) { return 1 }
      return 0;
    });
    return sorted;
  }

  const filterCurrRound = (playerData) => {
    if (playerData && playerData["rounds"][pactContext.getCurrentRound()][2] === "open") {
      const rounds = (playerData.length !== 0) ? playerData["rounds"] : [];
      const currRound = rounds[rounds.length - 1]
      console.log(currRound);
      return currRound[0].slice(0,30);
    } else {
      return [];
    }
  }

  const showStartButton = (startDis) => {
    if (!startDis) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.playRoundButton}
            disabled={startDis}
            style={{marginRight: 10}}
            onClick={async () => {
              setSpinText("please sign tx in the wallet")
              setContinueDis(true);
              setStartDis(true);
              setEndDis(true);
              let bool = false;
              if (pactContext.getCurrentRound() === 0) {
                if (pactContext.getPT()){
                 bool = false;
               } else {
                 bool = true;
               }
               }
              await pactContext.startRound(bool ?
                  pactContext.getCurrentRound() : pactContext.getCurrentRound() + 1)
              handlePlayRound("start")
            }}
          >
            START NEW ROUND
          </Button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  const showContEndButtons = (endDis) => {
    if (!endDis) {
      return (
        <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.playRoundButton}
          // onClick={handlePlayRound}
          // onClick={pactCalls}
          style={{marginRight: 10}}
          onClick={async () => {
            setSpinText("please sign tx in the wallet")
            setContinueDis(true);
            setStartDis(true);
            setEndDis(true);
            await pactContext.continueRound(pactContext.getCurrentRound())
            handlePlayRound("cont")
          }}
        >
          SPIN AGAIN
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.playRoundButton}
          onClick={async () => {
            setContinueDis(true);
            setStartDis(true);
            setEndDis(true);
            setSpinText("please sign tx in the wallet")
            await pactContext.endRound(pactContext.getCurrentRound())
            handlePlayRound("end")
            // handleEndRound()
          }}
        >
          CASH OUT {showRoundPoints() - 5} coins
        </Button>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  const handleRoundInfo = (bet, i) => {
    return {
      spin:
        <Typography variant="h6" style={{color:'black', fontWeight: 'bold'}}>
          {i + 1}
        </Typography>,
      result:
        <Grid direction="column">
          <img
            src={imgMapSmall[bet[0]]}
            style={{marginRight: 20}}
          />
          <img
            src={imgMapSmall[bet[1]]}
          />
        </Grid>,
      points:
        <Typography variant="h6" style={{color:'orange', fontWeight: 'bold'}}>
          {pactContext.payoutMatrix[bet] ? pactContext.payoutMatrix[bet]["int"] : ""}
        </Typography>,
    }
  }

  const showResults = () => {
    if (pactContext.playerTable) {
      if (pactContext.playerTable["rounds"][pactContext.getCurrentRound()][2] === "open") {
      return (
        <div>

        <Typography variant="h4" className={classes.leaderboardTypography} style={{marginBottom:30}}>
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
          filterCurrRound(pactContext.playerTable).map((bet, i) => {
            return handleRoundInfo(bet, i);
        })}
        />
        <Typography variant="h4" className={classes.scoreStyle} style={{color:'blue'}}>
          Total Round Score: {showRoundPoints() - 5}
        </Typography>

        </div>
      )
    }
  }
  }

  const showContent = () => {
    if (pactContext.playerId === "") {
      return true
    } else {
      if (pactContext.playersData.length !== 0 && pactContext.playerId) {
        return true
      }
      return false;
    }
  }

  return (
    <PactContext.Consumer>
      {({
        setPlayerId,
        setPublicKey,
        getAllPlayerTables,
        playersData,
        players,
        startRound,
        continueRound,
        endRound,
        playerTable,
        getCurrentRound,
        round,
        getPlayerTable,
        getPT,
        playerId }) => {
        return (
        <Grid container direction="row">
          <Grid style={{ flex: 2 }}>
          {showContent() ?
            <div>
            <Grid
              direction="row"
              justify="space-around"
              className={classes.gridDisplay}
            >
              <Box className={classes.typographyStyle}>
                <Typography>ROUNDS PLAYED:</Typography>
                <Typography variant="h4" className={classes.scoreStyle}>
                  {playerTable ? playerTable["rounds-played"]["int"] : "0"}
                </Typography>
              </Box>
              <Box className={classes.typographyStyle}>
                <Typography>TOTAL SCORE:</Typography>
                <Typography variant="h4" className={classes.scoreStyle}>
                  {playerTable ? playerTable["coins-out"] - playerTable["coins-in"] : "0"}
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
            >

            </Grid>

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
              <Typography variant="h4" className={classes.scoreStyle} style={{marginTop: 20}}>
                {spinText}
              </Typography>
              <Box style={{ height: 50, marginTop: 50 }}>
              {showStartButton(startDis)}
              {showContEndButtons(endDis)}
              </Box>
            </Grid>
            </div>
            : <Typography variant="h4" className={classes.scoreStyle} style={{ margin: 70 }}>{playerId ? <div>connecting to an available node...</div> : <div>please enter account</div>}</Typography>}


          </Grid>

          <Grid
            style={{
              flex: 1,
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
              position: "relative",
              minHeight: "90vh"
            }}
          >

          <div
            style={{overflow: "scroll",
            height: window.innerHeight}}
          >
          {playerId ?
            <Typography variant="h6" className={classes.leaderboardTypography} style={{ marginTop: 3 }}>
              account: {pactContext.playerId} | balance: {pactContext.accountBalance}
            </Typography>
            :
            <Typography variant="h6" className={classes.leaderboardTypography} style={{ marginTop: 3 }}>
              no account!
            </Typography>
        }
          {showContent() ?
            <Box className={classes.leaderboardBox}>
              {showResults()}
              <Typography variant="h4" className={classes.leaderboardTypography} style={{marginTop:30}}>
                LEADERBOARD
              </Typography>
              <ListView
                columns={[
                  { key: "rank", label: "Rank" },
                  { key: "account", label: "Account" },
                  { key: "score", label: "Score" },
                  { key: "rounds", label: "Rounds" }
                ]}
                items={
  			          sortPlayersByScore(playersData, players).map((usr, i) => ({
                    account:
                      <Typography variant="h8" style={{color:'black', fontWeight: 'bold'}}>
                        {usr["user"].slice(0,10)}
                      </Typography>,
                    score:
                      <Typography variant="h8" style={{color:'orange', fontWeight: 'bold'}}>
                        {`${usr["coins-out"] - usr["coins-in"]}`}
                      </Typography>,
                    rounds:
                      <Typography variant="h8" style={{color:'purple', fontWeight: 'bold'}}>
                        {usr["rounds-played"]["int"]}
                      </Typography>,
                    rank:
                      <Typography variant="h8" style={{color:'blue', fontWeight: 'bold'}}>
                        {`${i + 1}º`}
                      </Typography>
                }))}
              />

                <div>
                  <img
                    alt="pig_face"
                    src={require("../assets/dadparrot.gif")}
                    style={{
                      position: "absolute",
                      marginLeft: "0p",
                      marginTop: 0,
                      left:10,
                      bottom:0,
                      zIndex: "-1",
                    }}
                  />
                  <img
                    alt="pig_face"
                    src={require("../assets/dadparrot.gif")}
                    style={{
                      position: "absolute",
                      marginLeft: "0p",
                      marginTop: 0,
                      bottom:0,
                      right:0,
                      opacity:0.3,
                      zIndex: "-1",
                    }}
                  />
                </div>
            </Box>
            : <div></div>}
            </div>

          </Grid>

        </Grid>

        );
      }}
    </PactContext.Consumer>
  );
};

export default HomePage;
