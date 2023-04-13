import React from "react";
import Home from "../components/Home";
import Header from "../components/Header";
import { Box } from "@material-ui/core";
const HomePage = () => {
  return (
    <Box>
      <Header title="PACTY PARROTS" />
      <Home />
    </Box>
  );
};

export default HomePage;
