import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokedexPage from "./routes/PokedexPage";
import AboutPage from "./routes/AboutPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
