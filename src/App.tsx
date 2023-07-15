import React from "react";
import "./App.css";
import "./assets/css/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LaunchScreen, ProfileScreen } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchScreen />} />
        <Route path="/home" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
