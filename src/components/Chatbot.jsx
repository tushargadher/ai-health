import React, { useState, useEffect, useRef ,useMemo } from "react";
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
    <div className="chat-container">
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
