import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <p>
        Welcome to <strong>Health AI</strong>, your personal assistant for wellness, fitness, and healthy living.
        Our AI-powered platform provides personalized health recommendations, workout plans, diet guidance, and 
        mindfulness tips to help you achieve your wellness goals.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        At Health AI, we believe in making healthcare accessible, smart, and tailored to each individual. 
        Our goal is to empower users with AI-driven insights that support a healthier lifestyle.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>AI-Powered Workout & Fitness Recommendations</li>
        <li>Daily Health & Wellness Tips</li>
        <li>Personalized Diet & Nutrition Guidance</li>
        <li>Mindfulness & Meditation Support</li>
        <li>AI-Based Symptoms Checker</li>
      </ul>

      <h2>Why Choose Health AI?</h2>
      <p>
        We combine cutting-edge AI technology with expert-backed wellness strategies to provide reliable 
        and personalized health solutions. Whether you want to stay fit, eat healthier, or reduce stress, 
        Health AI is here to guide you every step of the way.
      </p>
    </div>
  );
};

export default AboutUs;
