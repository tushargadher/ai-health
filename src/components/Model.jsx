// src/components/Model.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// Select the desired model; here we use "gemini-1.5-flash" (adjust if needed)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
  try {
    // Call the generateContent method from the Gemini API
    const result = await model.generateContent(prompt);
    // Depending on the response structure, you may call result.response.text() or access .text directly
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
