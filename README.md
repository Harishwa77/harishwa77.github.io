# EchelonAI | Startup Ecosystem Engine

Advanced AI Startup Accelerator, VC, and Market Analyst.

## 🚀 Getting Started

1. **Connect**: Click "Secure Connect" to establish your session.
2. **Analyze**: Use the Founder or Investor modes to generate reports.
3. **Register**: Founders can publish ideas to the public pool.
4. **Invest**: Investors can pick from the pool and run deep-dive memos.

## 🔑 Recommended API Keys

To enable real-time intelligence, add these to your `.env`:

- `NEWS_API_KEY`: Get one at [newsapi.org](https://newsapi.org/) (Real-time sentiment).
- `ALPHA_VANTAGE_API_KEY`: Get one at [alphavantage.co](https://www.alphavantage.co/) (Market benchmarks).
- `CLEARBIT_API_KEY`: Get one at [clearbit.com](https://clearbit.com/) (Founder & Company enrichment).
- `GEMINI_API_KEY`: Required for the core Genkit AI Engine.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: Genkit with Google Gemini
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **UI**: Tailwind CSS + ShadCN UI
