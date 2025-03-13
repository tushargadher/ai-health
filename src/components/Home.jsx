import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaBrain, FaHeartbeat, FaRobot, FaRunning, FaClipboardList, FaChartLine, FaUtensils } from "react-icons/fa";
import "./../css/home.css";

const features = [
  { title: "AI-Powered Workout Recommendations", icon: <FaDumbbell /> },
  { title: "Meditation & Self-Help Suggestions", icon: <FaBrain /> },
  { title: "Symptoms Checker", icon: <FaHeartbeat /> },
  { title: "AI Chatbot Assistance", icon: <FaRobot /> },
  { title: "Personalized Fitness Plans", icon: <FaRunning /> },
  { title: "Daily Health & Wellness Tips", icon: <FaClipboardList /> },
  { title: "Goal-Based Exercise Plans", icon: <FaChartLine /> },
  { title: "Diet & Nutrition Guidance", icon: <FaUtensils /> },  // ✅ FIXED: Replaced FaBowlRice
];

const Home = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature) => {
    navigate(`/chatbot?title=${encodeURIComponent(feature)}`);
  };

  return (
    <div className="home-container">
      <p className="home-subtitle">Your personal AI assistant for fitness and well-being.</p>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <button key={index} className="feature-box" onClick={() => handleFeatureClick(feature.title)}>
            <span className="feature-icon">{feature.icon}</span>
            {feature.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
