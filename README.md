
# EchelonAI | Startup Ecosystem Engine

Advanced AI Startup Accelerator, VC, and Market Analyst.

## 🚀 Getting Started

1. **Connect**: Click "Secure Connect" in the header to establish your session.
2. **Analyze**: 
   - **Founder Mode**: Enter your idea to get a 3-month roadmap, API recommendations, and **Geospatial Intelligence**.
   - **Investor Mode**: Select a startup from the public pool and run a deep-dive investment memo.
   - **Talent Mode**: Match your skills semantically with top startups.
3. **Register**: Founders can "Publish" analyzed startups to the public pool.

## ☁️ Cloud Deployment

This project is configured for **Firebase App Hosting**. 

1. **Initialize**: Run `firebase init apphosting` in your terminal.
2. **Connect**: Link your GitHub repository to a new App Hosting backend in the Firebase Console.
3. **Secrets**: Ensure your `NEWS_API_KEY`, `ALPHA_VANTAGE_API_KEY`, and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` are added as secrets in the App Hosting configuration.

## 🔑 Intelligence Layers

### Active
- **NewsAPI**: Real-time industry sentiment analysis.
- **Alpha Vantage**: Financial benchmarks and sector performance.
- **Google Maps JS API**: Geospatial Intelligence for regional strategy.

### Recommended (To Add)
- **Clearbit API** (`CLEARBIT_API_KEY`): Identity enrichment (Logos, Bio).
- **Unsplash API** (`UNSPLASH_ACCESS_KEY`): High-quality startup imagery.
- **Serper.dev API** (`SERPER_API_KEY`): Live competitor web-search.

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **AI**: Genkit with Google Gemini
- **Intelligence**: NewsAPI + Alpha Vantage
- **Database**: Firebase Firestore
- **UI**: Tailwind CSS + ShadCN UI + Recharts
