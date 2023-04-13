import { makeStyles } from "@material-ui/styles";
import { greenPrimaryColor, greenSecondaryColor } from "../themeGreen";

const styles = {
  gridDisplay: () => ({
    display: "flex",
    justifyContent: "space-around"
  }),
  typographyStyle: () => ({
    backgroundColor: greenSecondaryColor,
    color: "white",
    padding: "10px 15px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center"
  }),
  scoreStyle: () => ({
    textAlign: "center",
    minWidth: 100,
    color: "white",
    fontWeight: "bold !important"
  }),
  enterId: () => ({
    fontWeight: "bold !important",
    color: greenPrimaryColor,
    textAlign: "center"
  }),
  playRoundButton: () => ({
    fontWeight: "bold !important",
    color: "white",
    padding: "10px 20px !important"
  }),
  enterAccountIdBox: () => ({
    display: "flex",
    flexDirection: "column",
    padding: "20px 150px 30px 150px"
  }),
  leaderboardTypography: () => ({
    color: greenPrimaryColor,
    fontWeight: "bold !important",
    textAlign: "center",
    marginBottom: "20px !important"
  }),
  leaderboardBox: () => ({
    marginBottom: 20,
    paddingLeft: "20px",
    paddingRight: "20px",
  })
};

export default makeStyles(styles);
