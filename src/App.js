import React, { Component } from "react";
import styled from "styled-components";
import { Route, Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import MainScreen from "./components/MainScreen";
import NavBar from "./components/NavBar";

const Bg = styled.div`
  background-color: black;
  min-height: 100vh;
  height: 100%;
`;

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Bg>
          <NavBar />
          <Route path="/" component={MainScreen} />
        </Bg>
      </Router>
    );
  }
}

export default App;
