import React, { Component } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./fonts.css";
import FV from "components/FV";

class App extends Component {
  render() {
    return (
      <RecoilRoot>
        <Router basename={process.env.BASE_PATH}>
          <Routes>
            <Route path="/" element={<FV />} />
          </Routes>
        </Router>
      </RecoilRoot>
    );
  }
}

export default App;
