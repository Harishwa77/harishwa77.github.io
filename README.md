# EchelonAI | Startup Ecosystem Engine

Advanced AI Startup Accelerator, VC, and Market Analyst.

## 🚀 Getting Started

1. **Connect**: Click "Secure Connect" in the header to establish your session.
2. **Analyze**: 
   - **Founder Mode**: Enter your idea to get a 3-month roadmap, API recommendations, and **Geospatial Intelligence**.
   - **Investor Mode**: Select a startup from the public pool and run a deep-dive investment memo.
   - **Talent Mode**: Match your skills semantically with top startups.
3. **Register**: Founders can "Publish" analyzed startups to the public pool.

## ☁️ Cloud Deployment Status

EchelonAI is **Cloud-Ready**. It is currently configured for deployment on **Firebase App Hosting**.

### Steps to Deploy to Production:
1. **Repository**: Push this code to your GitHub repository.
2. **Firebase Console**: 
   - Go to the **App Hosting** section in the Firebase Console.
   - Click "Create Backend" and link your GitHub repository.
3. **Environment Secrets**: Add the following secrets in the App Hosting configuration:
   - `NEWS_API_KEY`
   - `ALPHA_VANTAGE_API_KEY`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. **Build**: Firebase will automatically detect the `apphosting.yaml` and trigger a Next.js 15 production build.

## 🔑 Intelligence Layers

### Active
- **Genkit + Gemini 2.5**: Core reasoning and flow engine.
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
