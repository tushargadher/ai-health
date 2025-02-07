import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineRobot } from "react-icons/ai";
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBars, FaInfoCircle } from "react-icons/fa";
import "./../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("user"); // Check if user is logged in
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide Navbar on Login & Register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <h2 className="logo">
          <AiOutlineRobot className="logo-icon" /> AI Powered Mind and Body Tracker
        </h2>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <FaInfoCircle className="icon" /> About Us
          </Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <FaSignInAlt className="icon" /> Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <FaUserPlus className="icon" /> Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
