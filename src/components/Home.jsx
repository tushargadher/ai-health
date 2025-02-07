import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/home.css";

const features = [
  "AI-Powered Workout Recommendations",
  "Meditation & Self-Help Suggestions",
  "Symptoms Checker",
  "AI Chatbot Assistance",
  "Personalized Fitness Plans",
  "Daily Health & Wellness Tips",
  "Goal-Based Exercise Plans",
  "Diet & Nutrition Guidance",
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
          <button key={index} className="feature-box" onClick={() => handleFeatureClick(feature)}>
            {feature}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
