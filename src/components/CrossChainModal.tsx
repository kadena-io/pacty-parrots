import { Box, Dialog, Fab, Paper, Typography } from "@mui/material";
import style from "../styles/modal/modalStyle";
import { useModalState } from "../states/ModalState";

export default function CrossChainModal() {
  const isOpen = useModalState((state) => state.isCrossChainModalOpen);
  const close = useModalState((state) => state.closeCrossChainModal);
  const activeMessageKey = useModalState((state) => state.activeMessageKey);

  const {
    paperSize: paperSizeStyle,
    modalTitle: modalTitleStyle,
    enterAccountIdBox: enterAccountIdBoxStyle,
    enterId: enterIdStyle,
  } = style;

  const messages = {
    crossChain: (
      // todo: add the chain id where the funds are found at
      <Typography
        style={{ ...enterIdStyle, marginBottom: "50px" }}
        variant="h6"
      >
        It seems that your balance in the chain 0 is not enough to play the
        game, but your balance on chain 1 is enough.
        <br /> <br />
        You can learn how to transfer your balance across chains in our
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://medium.com/@kitty.kad.token/using-chainweaver-for-cross-chain-transfers-no-download-needed-5792f2ca430b"
        >
          Medium article
        </a>
        <br />
        or head to the
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://transfer.chainweb.com/xchain.html"
        >
          xChain Transfer Tool
        </a>
      </Typography>
    ),

    noBalance: (
      <Typography
        style={{ ...enterIdStyle, marginBottom: "50px" }}
        variant="h6"
      >
        Seems like that account is not registered.
        <br /> <br />
        You can head to the
        <a
          target="_blank"
          rel="noreferrer"
          href="https://faucet.testnet.chainweb.com/"
        >
          KDA Faucet
        </a>
        to register your name and claim some testnet KDA
      </Typography>
    ),
  };

  return (
    <Dialog open={isOpen}>
      <Box>
        <Paper style={paperSizeStyle}>
          <Typography style={{ ...modalTitleStyle, textAlign: "center" }}>
            Info
          </Typography>
          <Box style={enterAccountIdBoxStyle}>
            {messages[activeMessageKey]}

            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={close}
            >
              <Typography
                color="primary"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Close
              </Typography>
            </Fab>
          </Box>
        </Paper>
      </Box>
    </Dialog>
  );
}
