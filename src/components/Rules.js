import React, { useContext, useEffect } from "react";
import PactContext from "../contexts/PactContext";
import ModalContext from "../contexts/ModalContext";
import { Box, TextField, Grid, Typography, Button } from "@material-ui/core";
import ListView from "./ListView";
import LoginModal from "./LoginModal";

import styles from "../styles/home/homeStyle";

const Rules = (props) => {
  const classes = styles();

  const pactContext = useContext(PactContext);
  const modalContext = useContext(ModalContext);

  const info = [
    {
      value: "Yellow",
      parrot: require("../assets/result/medium/yellow.gif"),
      description: "I'm just your average below average party parrot",
      payout: "2"
    },
    {
      value: "Teal",
      parrot: require("../assets/result/medium/teal.gif"),
      description: "I'm just your average below average party parrot",
      payout: "3"
    },
    {
      value: "Red",
      parrot: require("../assets/result/medium/red.gif"),
      description: "I'm just your average party parrot",
      payout: "4"
    },
    {
      value: "Purple",
      parrot: require("../assets/result/medium/purple.gif"),
      description: "I'm just your average party parrot",
      payout: "5"
    },
    {
      value: "Green",
      parrot: require("../assets/result/medium/green.gif"),
      description: "I'm just your average above average party parrot",
      payout: "6"
    },
    {
      value: "Blue",
      parrot: require("../assets/result/medium/blue.gif"),
      description: "I'm just your average above average party parrot",
      payout: "7"
    },
    {
      value: "Mustache",
      parrot: require("../assets/result/medium/mustache.gif"),
      description: "Mo mustache mo money",
      payout: "15"
    },
    {
      value: "Sherlock",
      parrot: require("../assets/result/medium/sherlock.gif"),
      description: "Coins for clues",
      payout: "30"
    },
    {
      value: "Deal With It",
      parrot: require("../assets/result/medium/dealwithit.gif"),
      description: "Too cool for parrot school",
      payout: "50"
    },
    {
      value: "Spy",
      parrot: require("../assets/result/medium/spyparrot.gif"),
      description: "Vant to trade crypto-ruble for corporate secret?",
      payout: "60"
    },
    {
      value: "Keanu Reeves",
      parrot: require("../assets/result/medium/keanu.gif"),
      description: "Subsidizing your movie ticket for John Wick 7: Revenge of the Party Parrot",
      payout: "100"
    },
    {
      value: "Nicolas Cage",
      parrot: require("../assets/result/medium/cage.gif"),
      description: "I outbid DiCaprio on some dinosaur skulls, so what's another 200 coins?",
      payout: "200"
    },
    {
      value: "Guy Fieri",
      parrot: require("../assets/result/medium/fieri.gif"),
      description: "Consider this your rebate for moving to Flavortown, USA",
      payout: "500"
    },
    {
      value: "Police",
      parrot: require("../assets/result/medium/cop.gif"),
      description: "PPPD!!! Wings in the air, you are BUSTED.",
      payout: "Ends round and zeros"
    },
    {
      value: "Pirate",
      parrot: require("../assets/result/medium/pirate.gif"),
      description: "Yarr, ahoy matey! Robbed you've been",
      payout: "Ends round and zeros"
    }
  ]

  return (
    <div
      style={{ width: window.innerWidth }}
    >
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography
          style={{ fontWeight: "bold", color: "black", fontSize: 50, marginTop: 50 }}
        >
          PACTY PARROT RULES
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography style={{ fontWeight: "bold", color: "blue", fontSize: 20, marginTop: 5 }}>
          Entry Fee: 5 coin per round
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography style={{ fontWeight: "bold", color: "#19a33c", fontSize: 20, marginTop: 5 }}>
          Prize: Total Points scored in each round minus entry fee
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography style={{ fontWeight: "bold", color: "orange", fontSize: 20, marginTop: 5 }}>
          Game: Each spin within a round will return two party parrots
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography style={{ fontWeight: "bold", color: "purple", fontSize: 20, marginTop: 5 }}>
          Points: If you spin two DIFFERENT parrots, SUM points. If you spin two of the SAME parrot, MULTIPLY points
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography style={{ fontWeight: "bold", color: "red", fontSize: 20, marginTop: 5 }}>
          but you lose all your coins for that round if one of the two parrots is a cop or a pirate
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography style={{ fontWeight: "bold", color: "red", fontSize: 20, marginTop: 5 }}>
           try you luck and have fun with Pacty Parrots!!
        </Typography>
      </Box>
      <Box style={{ padding: 50 }}>
        <ListView
          isButton={false}
          headerBackgroundColor="#19A33C"
          columns={[
            { key: "parrot", label: "Parrot" },
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            { key: "payout", label: "Payout" }
          ]}
          items={info.map((parrot, i) => ({
            parrot: <img src={parrot.parrot} />,
            name:
              <Typography variant="h6" style={{color:'purple', fontWeight: "bold"}}>
                {parrot.value}
              </Typography>,
            description:
              <Typography variant="h6" style={{color:'grey', fontWeight: "bold"}}>
                {parrot.description}
              </Typography>,
            payout:
              <Typography variant="h6" style={{color:'red', fontWeight: "bold"}}>
                {parrot.payout} coins
              </Typography>
          }))}
        />

      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
      {pactContext.playerId ?
      <Button
        variant="contained"
        color="primary"
        className={classes.playRoundButton}
        style={{marginBottom: 20}}
        onClick={() => {
          props.anchorEl(null);
        }}
      >
        GOT IT!
      </Button>
      :
      <Button
        variant="contained"
        color="primary"
        className={classes.playRoundButton}
        style={{marginBottom: 20}}
        onClick={() => {
          modalContext.setModalOpen(<LoginModal />);
        }}
      >
        ENTER ACCOUNT NAME
      </Button>
    }
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
      <Typography
        style={{ fontWeight: "bold", color: "black", fontSize: 15, marginBottom: 40}}
      >
        * this game is for entertainment purposes only
      </Typography>
      </Box>

    </div>
  );

}


export default Rules;
