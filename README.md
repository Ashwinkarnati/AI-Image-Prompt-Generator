# PromptGenius: Advanced Image Prompt Generator

PromptCraft AI is a cutting-edge web application that enables users to generate advanced image prompts using Google Generative AI (Gemini) . Users can customize various aspects of their prompt such as title, description, design style, color palette, and idea. This platform is built with Next.js and features a sleek, responsive UI.

## 🚀 Features

- Multi-step form to create detailed image prompts
- AI-powered prompt generation using Gemini (Google Generative AI)
- Save user details  with Convex
- Authentication and user management via Clerk
- Clean, responsive UI with Tailwind CSS and Framer Motion animations

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Auth:** Clerk
- **Database:** Convex
- **AI:** Google Generative AI (Gemini)

## 📁 Project Structure

```
app/
  |_ _components/         # Reusable UI components
  |_ _context/            # Context for user details
  |_ _data/               # Prompt templates and lookup data
  |_ api/ai-img-model     # API route to interact with Gemini
  |_ provider.jsx         # User detail and layout provider
  |_ providers.jsx        # Wraps app in Clerk and Convex providers
  |_ create/              # Multi-step form to collect prompt data
  |_ generate-logo/       # Display and regenerate AI prompt
convex/
  |_ schema.js            # Convex schema definitions
  |_ users.js             # Convex queries and mutations
configs/
  |_ AIModel.jsx          # Gemini model configuration
```

## 🔐 Environment Variables

Create a `.env.local` file in the root and add the following:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
GEMINI_API_KEY=your_google_generative_ai_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 🧑‍💻 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Visit** `http://localhost:3000`

## 🧠 Prompt Flow

1. User fills out multi-step form
2. Form data is saved to localStorage
3. On final step, prompt is generated via Gemini
4. Prompt is displayed and can be copied or regenerated

## 📦 Deployment

This app can be deployed on **Vercel** with ease. Just make sure all environment variables are configured in the dashboard.

## 🤝 Contributing

Feel free to fork this repo and make contributions via pull requests.

## 📄 License

MIT License

---

Craft smarter. Design better. 🎨✨
