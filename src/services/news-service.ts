
'use server';

/**
 * @fileOverview Service for fetching real-time industry news via NewsAPI.
 */

export async function fetchIndustryNews(industry: string): Promise<string> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey || apiKey === 'your_news_api_key_here') {
    return "News API key not configured or invalid. Using historical benchmarks only.";
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(industry)}&sortBy=relevance&pageSize=5&apiKey=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      return "Could not reach News intelligence layer. Analysis grounded in general market knowledge.";
    }

    const data = await response.json();

    if (data.status !== 'ok' || !data.articles || data.articles.length === 0) {
      return "No recent major news found for this specific industry segment. Analysis using secondary trends.";
    }

    return data.articles
      .map((article: any) => `- ${article.title}: ${article.description || article.content?.substring(0, 100)}...`)
      .join('\n');
  } catch (error) {
    console.error("Error fetching news intelligence:", error);
    return "Neural news link failed. Reverting to internal knowledge base.";
  }
}
