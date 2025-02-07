import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot"; // AI Chatbot Page
import Login from "./components/Login";
import Registration from "./components/Registration";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
