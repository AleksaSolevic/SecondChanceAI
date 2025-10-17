# Reflektioner 

### Vilken ny AI-teknik/bibliotek identifierade ni och hur tillämpade ni det?

De bibliotek/tekniker vi använde oss av är:
- ***gemini-2.5-flash-lite*** - en förtränad maskininlärningsmodell. 
- ***Natural Language Processing (NLP)*** - Chatboten kan föra konversationer, ställa öppna frågor och ge reflekterande stöd.
- ***Systeminstruktion*** - AI:n är tränad med psykologiska principer (CBT, mindfulness, positiv psykologi) för att ge evidensbaserad support.
- ***Empatisk responsgenerering*** - Validerar användarens känslor innan råd ges, håller en varm och lugn ton.
- ***Krisigenkänning*** - AI:n kan känna igen krissituationer och ge information om hjälplinjer.

### Motivera varför ni valde den AI-tekniken/det biblioteket.

Vi valde dessa tekniker/bibliotek för att AI:n ska kunna förstå och bemöta användaren på ett mänskligt, stödjande sätt, och vi valde Gemini API som bibliotek för att snabbt och säkert implementera detta i vår React-app.

Vi testade flera modeller, men den som passade bäst för vår app var Gemini-2.5-flash-lite, eftersom den gav oss mycket snabbare svar än de andra modellerna av gemini-flash.
Dessutom var integrationen i koden väldigt enkel, vi behövde bara skriva några rader kod för att använda GenerativeModel och generateContent för att kunna använda modellen.
En annan bra sak med den här modellen är att den förstår vanligt språk väldigt bra.

### Varför behövdes AI-komponenten? Skulle ni kunna löst det på ett annat sätt?

AI-komponenten behövdes för att kunna skapa en dynamisk och empatisk konversation med användaren, där AI:n kan förstå känslor, ge evidensbaserade råd och identifiera potentiella krissituationer i realtid. Ett alternativ hade varit att använda statisk text eller förinspelade svar, men det skulle inte ge samma flexibilitet, anpassning eller förmåga att reagera på individuella behov hos användaren.

### Vidareutveckling

Vi fördjupade oss i AI-världen genom att göra flera försök att använda olika AI-verktyg, tekniker och modeller.
Under arbetets gång fick vi en god förståelse för att AI kan vara väldigt hjälpsamt vid kodskrivning, men att man aldrig ska lita på AI till 100 % utan att själv förstå koden.
En annan sak vi insåg tidigt var vikten av att försöka hålla sig till ett verktyg, eftersom det blir svårare om man börjar blanda flera olika, då är det lätt att tappa bort sig.

# MindMate - Your AI Conversation Partner

A compassionate React-based chatbot that provides mental health support using Google's Gemini AI. MindMate serves as a supportive companion for emotional wellness, offering evidence-based coping strategies and reflective conversation.

## 🎨 Design Theme

MindMate features a calm, lively green color palette with a modern app-like interface:

**Color Palette:**
- **Background:** #F1F5F3 (Green-50) with gradient to Green-100
- **Header:** Gradient from #166534 to #14532D (Green-800 to Green-900) with slate-100 text
- **User Messages:** #4ADE80 (Green-400) with white text - right-aligned
- **Bot Messages:** #D1FAE5 (Green-100) with slate-800 text - left-aligned
- **Input Area:** White with green-200 border, shadow, rounded corners
- **Send Button:** #16A34A (Green-600) with hover to Green-700
- **Text:** #1E293B (Slate-800) for high readability

**Visual Features:**
- Modern app-like header with rounded bottom corners (rounded-b-3xl) and shadow-lg
- 🌿 Leaf emoji branding element
- Dynamic status line showing "MindMate is listening..." when AI is thinking
- Decorative floating circles with blur effect for depth
- Message bubbles with small "tails" (rounded-bl-sm/br-sm) for chat feel
- Smooth fade-in animations for new messages
- Emoji icons in input field (💭 thought bubble)
- Backdrop blur effects for modern glass-morphism look
- Fully responsive design for desktop and mobile
- Inter font family for clean, modern typography

## 🌟 Features

- **Empathetic AI Support:** Configured with mental health psychology principles (CBT, mindfulness, positive psychology)
- **Safe Space for Reflection:** Non-judgmental environment to explore thoughts and emotions
- **Evidence-Based Guidance:** Actionable coping strategies, journaling prompts, and grounding exercises
- **Crisis Support Resources:** Automatically provides helpline information when needed
- **Real-time Conversations:** Responsive chat interface with message history
- **Mobile-Friendly Design:** Works seamlessly across all devices

## 🧠 Mental Health Features

The AI assistant is trained to:
- Validate emotions before offering advice
- Use open-ended questions to encourage self-reflection
- Provide psychologically-informed tools and techniques
- Recognize crisis situations and offer appropriate resources
- Maintain a warm, calm, and conversational tone
- **Never diagnose or prescribe** - always encourages professional help when needed

## 🚨 Important Disclaimer

**This application is NOT a replacement for professional mental health care.**

- If you're experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately
- **US:** 988 Suicide & Crisis Lifeline
- **UK:** 116 123 (Samaritans)  
- **International:** [Find A Helpline](https://findahelpline.com)

This AI provides supportive conversation and wellness strategies but cannot diagnose conditions or prescribe treatment.

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

**MindMate Green Palette:**
- **Background:** #F1F5F3 (Green-50) with gradient to #DCFCE7 (Green-100)
- **Header Gradient:** #166534 (Green-800) to #14532D (Green-900)
- **User Messages:** #4ADE80 (Green-400) - Fresh, lively green
- **Bot Messages:** #D1FAE5 (Green-100) - Soft, calming green tint
- **Input Border:** #BBF7D0 (Green-200)
- **Send Button:** #16A34A (Green-600) with hover to #15803D (Green-700)
- **Text Primary:** #1E293B (Slate-800) - High contrast readability
- **Decorative Elements:** Green-200, Green-300 with blur effects

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
- **Google Generative AI** (@google/generative-ai) for API integration with mental health system instructions
- **Vite** for development and building
- **Custom CSS** with utility classes for responsive styling (Tailwind-inspired design system)
- **Environment Variables** for secure API key management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
