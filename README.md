# AI Chatbot with Google Gemini

A simple React chatbot frontend that uses the Google Gemini API for AI conversations.

## Features

- Clean, responsive chat interface using Tailwind CSS
- Real-time conversations with Google Gemini AI
- Message history with timestamps
- "Thinking..." indicator while AI responds
- Auto-scroll to latest messages
- Mobile-friendly design
- Enter key support for sending messages

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get a Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

3. **Configure API Key:**
   - Open `src/App.jsx`
   - Replace `YOUR_GEMINI_API_KEY` with your actual API key
   - **Important:** Never commit API keys to version control in production

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - Start chatting with the AI!

## Color Scheme

- Primary: #2563eb (blue-600)
- Secondary: #60a5fa (blue-400) 
- Background: #f1f5f9 (slate-100)

## Security Note

⚠️ **Important:** This implementation calls the Gemini API directly from the frontend for simplicity. In a production environment, you should:

- Use environment variables for API keys
- Implement a backend proxy to hide API keys
- Add rate limiting and authentication
- Validate and sanitize user inputs

## Project Structure

```
src/
├── App.jsx          # Main chatbot component
├── index.css        # Tailwind CSS imports
└── main.jsx         # React entry point
```

## Technologies Used

- React 18 with Hooks (useState, useEffect, useRef)
- Google Generative AI (@google/generative-ai)
- Tailwind CSS for styling
- Vite for development and building
