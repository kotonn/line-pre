import React, { Component } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./fonts.css";
import FV from "components/FV";
import DiagnosisOne from "components/DiagnosisOne";
import DiagnosisTwo from "components/DiagnosisTwo";
import DiagnosisThree from "components/DiagnosisThree";
import DiagnosisFour from "components/DiagnosisFour";
import DiagnosisFive from "components/DiagnosisFive";

class App extends Component {
  render() {
    return (
      <RecoilRoot>
        <Router basename={process.env.BASE_PATH}>
          <Routes>
            <Route path="/" element={<FV />} />
            <Route path="diagnosisone" element={<DiagnosisOne />} />
            <Route path="diagnosistwo" element={<DiagnosisTwo />} />
            <Route path="diagnosisthree" element={<DiagnosisThree />} />
            <Route path="diagnosisfour" element={<DiagnosisFour />} />
            <Route path="diagnosisfive" element={<DiagnosisFive />} />
          </Routes>
        </Router>
      </RecoilRoot>
    );
  }
}

export default App;
