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

  // System instructions for mental health assistant role
  const systemInstruction = `Role:
You are a supportive and empathetic AI assistant designed to help users improve their mental well-being through reflective conversation, evidence-based coping strategies, and emotional support. You are not a replacement for professional therapy but can provide guidance inspired by psychological principles such as CBT (Cognitive Behavioral Therapy), mindfulness, and positive psychology.


Tone & Style:
- Warm, calm, and non-judgmental
- Conversational, natural, and emotionally intelligent
- Avoid overly clinical language — sound like a compassionate coach or listener

Core Objectives:
- Help users explore their thoughts and emotions safely.
- Encourage self-reflection and awareness.
- Offer actionable, psychologically informed tools (e.g., journaling prompts, grounding exercises, reframing thoughts).
- Gently guide users toward professional help if they mention distress, crisis, or self-harm.
- Maintain privacy and trust at all times.

Guidelines:
- Always validate the user's emotions before giving advice.
- Use open-ended questions to help the user reflect ("What do you think might help you feel a bit better right now?").
- Keep responses concise and emotionally grounded.
- Never give medical diagnoses or prescriptions.
- If a user expresses thoughts of self-harm or suicide, respond with compassion and recommend they contact a trusted person or a mental health hotline:
  * US: 988 Suicide & Crisis Lifeline
  * UK: 116 123 (Samaritans)
  * International: https://findahelpline.com

Example tone:
"It sounds like you've been carrying a lot lately. That must be really difficult. Would you like to talk about what's been weighing on you most?"`;

  //ToDo:
  //   Answers: Always reply in the same language the user uses.
  //  Do not translate or define words unless asked.

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: systemInstruction,
    temperature: 0.1,
  });

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
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Decorative background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Modern Header Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-900 text-slate-100 h-28 rounded-b-3xl shadow-lg px-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌿</span>
          <div>
            <h1 className="text-3xl font-bold">MindMate</h1>
            <p className="text-sm font-medium text-green-200">
              Your AI conversation partner
            </p>
          </div>
        </div>
        {/* Dynamic status line */}
        {isThinking && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <p className="text-xs text-green-300 animate-pulse">
              MindMate is listening...
            </p>
          </div>
        )}
      </div>

      {/* Messages Container - Scrollable area for chat messages */}
      <div className="relative flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
        {/* Welcome message when no messages exist */}
        {messages.length === 0 && (
          <div className="text-center text-slate-600 mt-12 animate-fade-in">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-lg">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Welcome to MindMate
              </h2>
              <p className="text-slate-700">
                I'm here to support you. How are you feeling today?
              </p>
            </div>
          </div>
        )}

        {/* Render all messages in the chat */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } animate-fade-in`}
          >
            <div
              className={`relative max-w-[75%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                message.sender === "user"
                  ? "bg-green-400 text-white rounded-br-sm"
                  : "bg-green-100 text-slate-800 rounded-bl-sm"
              }`}
            >
              <div className="text-sm leading-relaxed mb-1">
                {message.isHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  message.text
                )}
              </div>
              <div
                className={`text-xs mt-2 ${
                  message.sender === "user" ? "text-green-50" : "text-slate-500"
                }`}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Thinking indicator - shown while AI is processing */}
        {isThinking && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-green-100 text-slate-800 max-w-xs rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full dot"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full dot"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full dot"></div>
                </div>
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Auto-scroll target - invisible element at bottom of messages */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom of screen */}
      <div className="relative bg-white/80 backdrop-blur-sm border-t border-green-200 p-4 md:p-6">
        <div className="flex gap-3 max-w-4xl mx-auto">
          {/* Text input field with icon */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600">
              💭
            </span>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              disabled={isThinking}
              className="w-full border border-green-200 rounded-xl pl-12 pr-4 py-3 text-base outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            />
          </div>

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isThinking}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Send
          </button>
        </div>

        {/* API Key warning - shown if API key is not properly configured */}
        {!isApiKeySet() && (
          <div className="text-center mt-3">
            <p className="text-xs text-red-500">
              ⚠️ Please set your Gemini API key in the .env file
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
