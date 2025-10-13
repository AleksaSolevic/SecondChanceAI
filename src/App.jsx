import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// WARNING: Replace YOUR_GEMINI_API_KEY with your actual API key
// NEVER expose API keys in production - use environment variables or backend proxy
const API_KEY = "AIzaSyBFyPJ7bM36rySCKKz9VLZsMsb9dTzrmhs";

const App = () => {
  // State to store all chat messages
  const [messages, setMessages] = useState([]);

  // State for the current input text
  const [inputText, setInputText] = useState("");

  // State to track if AI is currently responding
  const [isThinking, setIsThinking] = useState(false);

  // Ref to auto-scroll to latest messages
  const messagesEndRef = useRef(null);

  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send message to Gemini AI
  const sendMessage = async () => {
    // Don't send empty messages or if already processing
    if (!inputText.trim() || isThinking) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputText(""); // Clear input
    setIsThinking(true); // Show thinking indicator

    try {
      // Send prompt to Gemini AI
      const result = await model.generateContent(inputText);
      const response = await result.response;
      const botText = response.text();

      // Add AI response to chat
      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please check your API key and try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false); // Hide thinking indicator
    }
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="header">
        <h1>AI Chatbot</h1>
        <p>Powered by Google Gemini</p>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {/* Welcome message when no messages exist */}
        {messages.length === 0 && (
          <div className="welcome">
            <h2>Welcome to AI Chatbot!</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}

        {/* Render all messages */}
        {messages.map((message) => (
          <div key={message.id} className={`message-row ${message.sender}`}>
            <div className={`message-bubble ${message.sender}`}>
              <div className="message-text">{message.text}</div>
              <div className={`timestamp ${message.sender}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div className="thinking">
            <div className="thinking-bubble">
              <div className="thinking-content">
                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="input-area">
        <div className="input-container">
          {/* Text input field */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isThinking}
            className="input-field"
          />

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isThinking}
            className="send-button"
          >
            Send
          </button>
        </div>

        {/* API Key warning */}
        {API_KEY === "YOUR_GEMINI_API_KEY" && (
          <div className="api-warning">
            <p>
              ⚠️ Please replace YOUR_GEMINI_API_KEY with your actual Gemini API
              key
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
