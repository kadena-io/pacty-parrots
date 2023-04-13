import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
    </Router>
  );
};

export default AppRouter;
