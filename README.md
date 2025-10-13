# AI Chatbot with Google Gemini

A simple React chatbot frontend that uses the Google Gemini API for AI conversations.

## Features

- Clean, responsive chat interface using custom CSS
- Real-time conversations with Google Gemini AI
- Message history with timestamps
- "Thinking..." indicator while AI responds
- Auto-scroll to latest messages
- Mobile-friendly design
- Enter key support for sending messages
- Environment variable configuration for API key

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

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` file
   - Replace `your_actual_gemini_api_key_here` with your actual API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```
   - **Important:** The `.env` file is already in `.gitignore` to prevent accidentally committing your API key

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - Start chatting with the AI!

## Environment Variables

This project uses Vite's environment variable system:

- Environment variables must be prefixed with `VITE_` to be accessible in the browser
- The `.env` file stores your API key securely
- Never commit your actual API key to version control

## Color Scheme

- Primary: #2563eb (blue-600)
- Secondary: #60a5fa (blue-400)
- Background: #f1f5f9 (slate-100)

## Security Note

⚠️ **Important Security Information:**

- **API Key Storage:** Your API key is stored in the `.env` file which is excluded from version control
- **Client-Side Usage:** This implementation calls the Gemini API directly from the frontend for simplicity
- **Production Considerations:** In a production environment, you should:
  - Implement a backend proxy to hide API keys completely
  - Add rate limiting and authentication
  - Validate and sanitize user inputs
  - Use proper authentication for your application

## Project Structure

```
src/
├── App.jsx          # Main chatbot component with detailed comments
├── index.css        # Custom CSS styles (replaces Tailwind)
└── main.jsx         # React entry point

Configuration files:
├── .env             # Environment variables (API key)
├── .env.example     # Template for environment variables
├── .gitignore       # Excludes .env from version control
└── vite.config.js   # Vite configuration
```

## Code Documentation

The codebase includes comprehensive comments above each function explaining:

- **Purpose:** What the function does
- **Parameters:** Input parameters and their types
- **Return values:** What the function returns
- **Side effects:** Any state changes or side effects
- **Usage examples:** How the function is used

## Technologies Used

- **React 19** with Hooks (useState, useEffect, useRef)
- **Google Generative AI** (@google/generative-ai) for API integration
- **Vite** for development and building
- **Custom CSS** for responsive styling
- **Environment Variables** for secure API key management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
