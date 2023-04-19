import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Fab, Popover } from "@material-ui/core";
import ModalContext from "../contexts/ModalContext";
import PactContext from "../contexts/PactContext";
import LoginModal from "./LoginModal";
import Rules from "./Rules";

import styles from "../styles/header/headerStyle";

export default function Header({ title }) {
  const classes = styles;
  const modalContext = useContext(ModalContext);
  const pactContext = useContext(PactContext);

  let kadenaLogo = require("../assets/images/logo_green.png");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }

    function handleClose() {
      setAnchorEl(null);
    }

    let open = Boolean(anchorEl);
    if (!pactContext.playerId) { open = true }
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/" onClick>
          <div onClick={() => window.location.href = "http://testnet.chainweb.com"} style={{color:"green"}}>
            <img className={classes.kadena} alt="kadena" src={kadenaLogo} />
          </div>
          </Link>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Box className={classes.textTitle}>{title}</Box>
          </Typography>

          <Box className={classes.loginButton}>
            <Fab
              variant="extended"
              size="medium"
              className={classes.fab}
              onClick={() => {
                modalContext.setModalOpen(<LoginModal />);
                // alert(`You just create a new tournament with the name ${bracketName}`);
                // //wrong page to navigate to
                // props.history.push('/');
                //if success should navigate to new page
              }}
            >
              <Typography
                color="primary"
                style={{
                  fontSize: "13px",
                  textTransform: "capitalize"
                }}
              >
                Choose Account
              </Typography>
            </Fab>
          </Box>
          <Box className={classes.loginIconButton}>
          <Fab
            aria-describedby={id}
            variant="extended"
            size="medium"
            className={classes.fab}
            onClick={handleClick}
          >
            <Typography
              color="primary"
              style={{
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              Game Rules
            </Typography>
          </Fab>
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Rules anchorEl={setAnchorEl}/>
          </Popover>

        </Toolbar>

      </AppBar>

    </Box>
  );
}
