import React, { useContext, useState } from "react";
import style from "../styles/modal/modalStyle";
import { Box, Typography, Paper, Fab, TextField } from "@material-ui/core";

import ModalContext from "../contexts/ModalContext";
import PactContext from "../contexts/PactContext";

const LoginModal = props => {
  const classes = style();
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  // const [id, setId] = useState("");

  const modalContext = useContext(ModalContext);
  const pactContext = useContext(PactContext);

  const onHandleClick = event => {
    if (value !== "") {
      modalContext.setModalClose();
      pactContext.getPlayerTable();
      window.location.reload();
    }
  };

  const setPlayerId = (id) => {
    pactContext.setPlayerId(id);
  }

  return (
          <Box>
            <Paper className={classes.paperSize}>
              <Typography className={classes.modalTitle}>Login</Typography>
              <Box className={classes.enterAccountIdBox}>
                <Typography variant="h6" className={classes.enterId}>
                  Enter Account Name
                </Typography>
                <TextField
                  placeholder="account"
                  margin="normal"
                  variant="outlined"
                  value={value}
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor: "white"
                  }}
                  onChange={e => {
                    // setId(e.target.value)
                    setValue(e.target.value)
                    setPlayerId(e.target.value)
                  }}
                ></TextField>

                <Fab variant="contained" color="primary" size="small">
                  <Typography
                    color="primary"
                    style={{
                      color: "white",
                      textTransform: "capitalize"
                    }}
                    onClick={onHandleClick}
                  >
                    Let's Play!
                  </Typography>
                </Fab>
              </Box>
            </Paper>
          </Box>
  );
};
export default LoginModal;
