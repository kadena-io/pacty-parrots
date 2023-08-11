import { AppStyleType } from "../../types";

const styles: AppStyleType = {
  appBar: {
    padding: "15px 60px",
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: "50px",
    textAlign: "center",
  },
  iconSize: {
    height: "20px",
    width: "20px",
    marginRight: "10px",
  },
  chip: {
    flexFlow: "row-reverse",
    backgroundColor: "white",
    ":hover": {
      backgroundColor: "white",
    },
    marginRight: "20px",
  },
  kadena: {
    width: "60px",
    marginTop: "10px",
  },
  arrow: {
    marginLeft: "10px",
    marginRight: "-10px",
  },

  fab: {
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "white",
    width: "auto",
    height: "40px",
  },
  loginButton: {
    paddingRight: "40px",
  },
  loginIconButton: {},
};

export default styles;
