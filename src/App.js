import React from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot"; // AI Chatbot Page
import Login from "./components/Login";
import Registration from "./components/Registration";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  // Hide navbar on ResetPassword page
  const hideNavbarRoutes = ["/reset-password"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;

