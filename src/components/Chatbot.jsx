import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoIosSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { generateContent } from "./Model";
import { useLocation } from "react-router-dom";
import "./../css/Chatbot.css";

const Chatbot = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTitle = searchParams.get("title") || "AI Chatbot Assistance";

  const [chatTitle] = useState(initialTitle);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Background images mapping
  const backgroundImages = useMemo(
    () => ({
      "AI-Powered Workout Recommendations": "https://www.anytimefitness.com/wp-content/uploads/2024/09/AF_Blog_Best-Workout-Schedule-for-Weight-Loss_3.jpg",
      "Meditation & Self-Help Suggestions": "https://thearbor.com/wp-content/uploads/2024/03/Self-Care-Activities-to-Help-With-Anxiety-1024x683.jpeg",
      "AI Chatbot Assistance": "https://cdn.now.gg/apps-content/8738/ogimage/ai-chat-ai-chatbot-assistant.jpg",
      "Symptoms Checker": "https://www.mountsinai.org/files/MSHealth/Assets/HS/About/MSHS-DigitalCareAdvisor-Symptoms-2col-770x420-1.jpg",
      "Personalized Fitness Plans": "https://cdn.outsideonline.com/wp-content/uploads/2024/09/personalized-training-coach_h.jpg",
      "Daily Health & Wellness Tips": "https://cdn.shopify.com/s/files/1/0561/9253/2651/files/InlineImage1.jpg",
      "Goal-Based Exercise Plans": "https://hips.hearstapps.com/hmg-prod/images/personal-trainer-instructing-young-man-doing-push-royalty-free-image-1595599338.jpg",
      "Diet & Nutrition Guidance": "https://foodtank.com/wp-content/uploads/2020/05/FoodTank_MediterraneanDietMonth.jpg",
    }),
    []
  );

  // Default prompts based on selected feature
  const defaultPrompts = useMemo(
    () => ({
      "AI-Powered Workout Recommendations": "Suggest a workout plan for beginners.",
      "Meditation & Self-Help Suggestions": "Recommend mindfulness exercises for stress relief.",
      "AI Chatbot Assistance": "How can I assist you today?",
      "Symptoms Checker": "What are common symptoms of the flu?",
      "Personalized Fitness Plans": "Create a personalized fitness plan for weight loss.",
      "Daily Health & Wellness Tips": "Give me a daily health tip.",
      "Goal-Based Exercise Plans": "Suggest an exercise plan for muscle gain.",
      "Diet & Nutrition Guidance": "What are some healthy foods for weight loss?",
    }),
    []
  );

  // Set default user input prompt
  useEffect(() => {
    setUserInput(defaultPrompts[chatTitle] || "");
  }, [chatTitle, defaultPrompts]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleClear = () => {
    setUserInput("");
    setChatHistory([]);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setChatHistory((prev) => [...prev, { type: "user", message: userInput }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateContent(userInput);
      setChatHistory((prev) => [...prev, { type: "bot", message: aiResponse }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: "system", message: "Failed to get response from AI." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        backgroundImage: `url(${backgroundImages[chatTitle] || "/images/default-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3 className="chat-title">{chatTitle}</h3>
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message-box ${msg.type}`}>
            <ReactMarkdown>{msg.message}</ReactMarkdown>
          </div>
        ))}
        {isLoading && <p className="loading">Thinking...</p>}
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input-area">
        <button onClick={handleClear} className="clear-btn">Clear</button>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit} className="send-btn">
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
