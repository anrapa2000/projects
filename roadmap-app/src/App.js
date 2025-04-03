import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyList from "./CompanyList";
import Roadmap from "./Roadmap";
import problemsData from "./companyWiseData/problemsData";
import neetcodeData from "./companyWiseData/NeetcodeProblemsData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route
          path="/roadmap/neetcode"
          element={
            <Roadmap problemsData={neetcodeData} companyName={"neetcode"} />
          }
        />
        <Route
          path="/roadmap/general"
          element={
            <Roadmap problemsData={problemsData} companyName={"general"} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
