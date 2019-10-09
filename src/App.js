import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ModalStore } from "./contexts/ModalContext";
import { PactStore } from "./contexts/PactContext";

import { greenTheme } from "./styles/themeGreen";

import AppRouter from "./router/router";

function App() {
  return (
    <MuiThemeProvider theme={greenTheme}>
      <CssBaseline />
      <PactStore>
      <ModalStore>

          <AppRouter />

      </ModalStore>
      </PactStore>
    </MuiThemeProvider>
  );
}

export default App;
//import Header from "./components/Header";
