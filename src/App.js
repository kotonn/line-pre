import React, { Component } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./fonts.css";
import FV from "components/FV";
import Diagnosis from "components/Diagnosis";

class App extends Component {
  render() {
    return (
      <RecoilRoot>
        <Router basename={process.env.BASE_PATH}>
          <Routes>
            <Route path="/" element={<FV />} />
            <Route path="diagnosisone" element={<Diagnosis />} />
          </Routes>
        </Router>
      </RecoilRoot>
    );
  }
}

export default App;
