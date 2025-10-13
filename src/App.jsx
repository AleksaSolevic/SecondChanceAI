import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
// In Vite, environment variables must be prefixed with VITE_ to be accessible in the browser
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Main App Component - AI Chatbot Interface
 *
 * This component creates a complete chatbot interface using Google's Gemini AI.
 * It handles user interactions, message display, and AI responses.
 *
 * Features:
 * - Real-time chat with Google Gemini AI
 * - Message history with timestamps
 * - Auto-scroll to latest messages
 * - Thinking indicator while AI responds
 * - Responsive design
 * - Keyboard support (Enter to send)
 */
const App = () => {
  // State to store all chat messages (user and bot)
  const [messages, setMessages] = useState([]);

  // State for the current input text being typed by user
  const [inputText, setInputText] = useState("");

  // State to track if AI is currently processing and responding
  const [isThinking, setIsThinking] = useState(false);

  // Ref to automatically scroll to the bottom of chat
  const messagesEndRef = useRef(null);

  // Initialize Google Generative AI with the API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  /**
   * Auto-scroll Effect
   *
   * Automatically scrolls to the bottom of the chat whenever new messages are added.
   * This ensures users always see the latest message without manual scrolling.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Convert Markdown to HTML Function
   *
   * Converts markdown formatting to HTML elements for proper display.
   * This allows ** to show as bold, * as italic, lists, etc.
   *
   * @param {string} text - The text that may contain markdown formatting
   * @returns {string} - HTML string with proper formatting
   */
  const convertMarkdownToHTML = (text) => {
    if (!text) return "";

    return (
      text
        // Convert bold text (**text** or __text__)
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.*?)__/g, "<strong>$1</strong>")

        // Convert italic text (*text* or _text_) - but avoid conflicts with bold
        .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>")
        .replace(/(?<!_)_([^_]+?)_(?!_)/g, "<em>$1</em>")

        // Convert bullet points
        .replace(/^\s*[\*\-\+]\s+(.+)$/gm, "<li>$1</li>")

        // Convert numbered lists
        .replace(/^\s*(\d+)\.\s+(.+)$/gm, "<li>$2</li>")

        // Convert headers
        .replace(/^### (.+)$/gm, "<h3>$1</h3>")
        .replace(/^## (.+)$/gm, "<h2>$1</h2>")
        .replace(/^# (.+)$/gm, "<h1>$1</h1>")

        // Convert inline code
        .replace(/`([^`]+)`/g, "<code>$1</code>")

        // Convert line breaks to <br>
        .replace(/\n/g, "<br>")

        // Wrap consecutive <li> elements in <ul>
        .replace(/(<li>.*?<\/li>)(?:\s*<br>\s*<li>.*?<\/li>)*/g, (match) => {
          return "<ul>" + match.replace(/<br>\s*/g, "") + "</ul>";
        })
    );
  };

  /**
   * Send Message Function
   *
   * Handles the complete flow of sending a user message and getting AI response:
   * 1. Validates input (non-empty, not already processing)
   * 2. Adds user message to chat
   * 3. Shows thinking indicator
   * 4. Calls Google Gemini API
   * 5. Adds AI response to chat
   * 6. Handles any errors that occur
   */
  const sendMessage = async () => {
    // Don't send empty messages or if already processing
    if (!inputText.trim() || isThinking) return;

    // Create user message object with unique ID and timestamp
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add user message to chat and clear input
    setMessages((prev) => [...prev, userMessage]);
    setInputText(""); // Clear input field
    setIsThinking(true); // Show thinking indicator

    try {
      // Send prompt to Gemini AI and get response
      const result = await model.generateContent(inputText);
      const response = await result.response;
      const botText = response.text();

      // Create bot message object with AI response (converted from markdown to HTML)
      const botMessage = {
        id: Date.now() + 1, // Ensure unique ID
        text: convertMarkdownToHTML(botText), // Convert markdown to HTML
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
        isHTML: true, // Flag to indicate this should be rendered as HTML
      };

      // Add AI response to chat
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Add error message to chat if API call fails
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

  /**
   * Handle Key Press Function
   *
   * Handles keyboard events in the input field.
   * Allows users to send messages by pressing Enter (without Shift).
   * Shift+Enter can be used for line breaks if needed.
   *
   * @param {Event} e - The keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default form submission
      sendMessage();
    }
  };

  /**
   * Handle Input Change Function
   *
   * Updates the input text state when user types in the input field.
   *
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  /**
   * Check API Key Function
   *
   * Determines if a valid API key is configured.
   * Used to show warning message if API key is not set.
   *
   * @returns {boolean} - True if API key appears to be set
   */
  const isApiKeySet = () => {
    return API_KEY && API_KEY !== "YOUR_GEMINI_API_KEY" && API_KEY.length > 10;
  };

  return (
    <div className="chat-container">
      {/* Header Section */}
      <div className="header">
        <h1>AI Chatbot</h1>
        <p>Powered by Google Gemini</p>
      </div>

      {/* Messages Container - Scrollable area for chat messages */}
      <div className="messages-container">
        {/* Welcome message when no messages exist */}
        {messages.length === 0 && (
          <div className="welcome">
            <h2>Welcome to AI Chatbot!</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}

        {/* Render all messages in the chat */}
        {messages.map((message) => (
          <div key={message.id} className={`message-row ${message.sender}`}>
            <div className={`message-bubble ${message.sender}`}>
              <div className="message-text">
                {message.isHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  message.text
                )}
              </div>
              <div className={`timestamp ${message.sender}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Thinking indicator - shown while AI is processing */}
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

        {/* Auto-scroll target - invisible element at bottom of messages */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom of screen */}
      <div className="input-area">
        <div className="input-container">
          {/* Text input field for user messages */}
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
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

        {/* API Key warning - shown if API key is not properly configured */}
        {!isApiKeySet() && (
          <div className="api-warning">
            <p>⚠️ Please set your Gemini API key in the .env file</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
