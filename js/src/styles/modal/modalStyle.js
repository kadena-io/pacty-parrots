import { makeStyles } from "@material-ui/core/styles";
import { greenPrimaryColor } from "../themeGreen";

const style = {
  modalset: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    //zIndex: 99999
  }),
  modalTitle: props => ({
    backgroundColor: greenPrimaryColor,
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 10,
    color: "white",
    fontWeight: "bold"
  }),
  modalMsg: () => ({
    paddingLeft: 25,
    paddingTop: 15,
    paddingRight: 25,
    fontSize: 15
  }),
  modalProps: () => ({
    paddingLeft: 25,
    paddingBottom: 20,
    paddingTop: 10,
    paddingRight: 25,
    fontWeight: "bold"
  }),
  button: props => ({
    backgroundColor: greenPrimaryColor,
    color: "white",
    paddingLeft: 5,
    paddingRight: 5,
    width: 80
  }),
  buttonBox: () => ({
    display: "flex",
    flexDirection: "row-reverse",
    paddingRight: 20,
    paddingBottom: 20
  }),
  enterAccountIdBox: () => ({
    display: "flex",
    flexDirection: "column",
    padding: "20px 150px 30px 150px"
  }),
  enterId: () => ({
    fontWeight: "bold !important",
    color: greenPrimaryColor,
    textAlign: "center"
  })
};

export default makeStyles(style);
