# Reflektioner

Vi skapade en AI-chatbot med fokus på mental hälsa och empatiska samtal. Under projektet testade vi flera AI-verktyg och tekniker för att förstå hur de kan användas för att skapa en trygg och stödjande användarupplevelse.

### Vilken ny AI-teknik/bibliotek identifierade ni och hur tillämpade ni det?

Vi testade många olika tekniker och fick både bra och dåliga erfarenheter. Vi började med Cursor, som faktiskt var väldigt bra och hjälpte oss att skapa en bra frontend. Vi gillade den eftersom den påminner mycket om VS Code och är ganska smidig att arbeta i. Men på grund av att vi fick slut på tokens behövde vi byta till ett annat verktyg. Då uppstod en ”soppa” i projektet, och vi märkte tydligt att det inte fungerade att blanda flera olika verktyg. Vi blev förvirrade när vi började testa olika verktyg, samtidigt som vi försökte förstå koden och manuellt lösa de problem som uppstod.

Efter många misslyckade försök bestämde vi oss för att börja om från början med hjälp av ChatGPT för att förbättra vår prompt, samt använda GitHub Copilot som stöd i kodningsdelen, och det fungerade mycket smidigare.

Vi använde följande AI-komponenter och tekniker i projektet:

- **_gemini-2.5-flash-lite_** - en förtränad maskininlärningsmodell.
- **_Natural Language Processing (NLP)_** - Chatboten kan föra konversationer, ställa öppna frågor och ge reflekterande stöd.
- **_Systeminstruktion_** - AI:n är tränad med psykologiska principer (CBT, mindfulness, positiv psykologi) för att ge evidensbaserad support.
- **_Empatisk responsgenerering_** - Validerar användarens känslor innan råd ges, håller en varm och lugn ton.
- **_Krisigenkänning_** - AI:n kan känna igen krissituationer och ge information om hjälplinjer.

### Motivera varför ni valde den AI-tekniken/det biblioteket.

Vi valde dessa tekniker eftersom vi ville skapa en AI som kunde förstå och bemöta användaren på ett mänskligt och stödjande sätt. Gemini API gjorde det enkelt att integrera AI direkt i vår React-app.

Vi testade flera modeller och övervägde dessa, men den som passade bäst för vår app var Gemini-2.5-flash-lite. Vi valde denna främst eftersom den gav oss mycket snabbare svar än de andra modellerna av gemini-flash, och var lätt att integrera i vår kod. Vi märkte också att Gemini-modellen hanterade kontext mycket bättre än andra modeller vi testade, vilket gjorde att konversationerna kändes mer naturliga och relevanta över tid.

### Varför behövdes AI-komponenten? Skulle ni kunna löst det på ett annat sätt?

GitHub Copilot hjälpte oss väldigt mycket med tempot när vi skapade vår grundläggande app. Vi hade kunnat skapa den utan AI, men det skulle ha tagit betydligt längre tid.

När det gäller AI-komponenten (Gemini API) var den helt nödvändig för att skapa en dynamisk och empatisk konversation med användaren, där AI:n kan förstå känslor, ge råd och identifiera potentiella krissituationer i realtid. Eftersom vår app handlar om mental hälsa så krävs det att svaren känns genuina, inkännande och varierande. Det är något som en statisk lösning aldrig hade klarat.

I teorin hade det dock varit möjligt att bygga något liknande. Ett alternativ hade varit att använda statisk text eller förinspelade svar, men det skulle inte ge samma flexibilitet, anpassning eller förmåga att reagera på individuella behov hos användaren.

Att använda ett AI-API kändes som ett modernt och effektivt sätt att skapa något verkligt användbart, och gav oss också en bättre förståelse för hur man kan använda AI i framtida projekt.

### Sammanfattning och Reflektion

Trots att vårt första försök blev rörigt lyckades vi i det andra projektet ta fram en enklare fungerande version, vilket gav oss en bättre förståelse för hur AI kan användas på rätt sätt, och vi fick både positiva och negativa erfarenheter av att arbeta med AI.

Det gav oss inspiration att fördjupa oss vidare, särskilt när det gäller hur man skriver tydliga prompts och hur mycket AI'ns svar påverkas av instruktionernas formulering.

Vi lärde oss också hur viktigt det är att förstå logiken bakom koden som AI:n skapar, och att inte bara lita på resultatet. När vi testade att låta AI göra nästan allt själv märkte vi snabbt att kvaliteten blev sämre, men när vi tog mer kontroll själva blev resultatet mycket bättre. Det visade oss att AI fungerar bäst som ett verktyg, inte som en ersättare. Vi insåg också att AI-modeller ofta gissar när de saknar information, vilket gör det viktigt att förstå kodens logik och alltid verifiera resultatet själv.

Vi lämnar kursen med en positiv bild av AI och en större trygghet i hur man kan använda det på rätt sätt i utvecklingsprojekt. Så länge vi håller balansen mellan “vibecoding” och riktig kodning kommer vi kunna använda AI för att både arbeta snabbare och mer effektivt framöver.

### Fördjupning och Vidareutveckling

Under arbetet valde vi att testa flera olika AI-verktyg och tekniker för att förstå deras styrkor och begränsningar. Vi började med Cursor, gick vidare till ChatGPT och använde även GitHub Copilot i kodningsdelen. Genom att jämföra resultaten fick vi en tydlig bild av hur olika verktyg hanterar kod, struktur och språk.

Detta gjorde att vi kunde identifiera vilka verktyg som var mest lämpliga för vårt syfte, där vi till exempel märkte att Gemini-modellen passade bäst för vår typ av AI-chatbot. Vi lärde oss också att AI inte alltid är den bästa lösningen, till exempel när man behöver full kontroll över logik eller datasäkerhet.

Vi fördjupade oss också i hur man kan styra en AI-modell genom systeminstruktioner och hur promptningen påverkar resultatet, vilket gjorde att vi kunde anpassa AI:ns ton och svar så de kändes empatiska och professionella.

En viktig lärdom var att inte blanda för många verktyg samtidigt, eftersom det skapade förvirring i projektet. Vi förstod att stabilitet och tydliga processer är lika viktiga som själva AI-tekniken.

Den här processen gav oss både teknisk förståelse och praktisk erfarenhet av hur AI faktiskt kan användas i ett riktigt utvecklingsflöde. Det visade oss också hur viktigt det är att vi som utvecklare fortfarande styr processen och tänker kritiskt. Vi har förstått varför vi aldrig ska lita på AI till 100% och insett vikten i att förstå koden vi skriver.

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
