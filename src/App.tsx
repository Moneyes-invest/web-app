import React from "react";
import "./App.css";
import "./assets/css/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardScreen, LaunchScreen, ProfileScreen } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchScreen />} />
        <Route path="/home" element={<ProfileScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
