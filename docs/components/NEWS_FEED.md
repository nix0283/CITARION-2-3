# News Feed Documentation

**Last Updated:** March 2026  
**Status:** ✅ Complete  
**Coverage:** 100%

---

## Overview

The News Feed component provides real-time financial news aggregation from multiple sources, sentiment analysis, and integration with trading decisions.

---

## Component: News Panel (`news-panel.tsx`)

```typescript
interface NewsPanelProps {
  sources?: NewsSource[];
  symbols?: string[];
  maxItems?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}
```

---

## News Source Configuration

### Supported Sources

```typescript
type NewsSource = 
  | 'coindesk'
  | 'cointelegraph'
  | 'decrypt'
  | 'theblock'
  | 'benzinga'
  | 'reuters_crypto'
  | 'twitter_influencers'
  | 'telegram_channels';
```

### Source Configuration

```typescript
interface NewsSourceConfig {
  id: NewsSource;
  name: string;
  enabled: boolean;
  priority: number;
  refreshInterval: number;
  filters?: {
    keywords?: string[];
    excludeKeywords?: string[];
    minSentiment?: number;
  };
}
```

---

## News Article Structure

```typescript
interface NewsArticle {
  id: string;
  source: NewsSource;
  
  // Content
  title: string;
  summary: string;
  content?: string;
  url: string;
  
  // Metadata
  publishedAt: Date;
  fetchedAt: Date;
  author?: string;
  category: NewsCategory;
  
  // Analysis
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentScore: number; // -1 to 1
  
  // Entities
  mentionedSymbols: string[];
  mentionedExchanges: string[];
  
  // User Interaction
  isRead: boolean;
  isBookmarked: boolean;
  userTags: string[];
  notes?: string;
  
  // Trading Impact
  impactLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  relatedAlerts?: Alert[];
}
```

---

## Features

### 1. Real-time Feed

```typescript
// WebSocket subscription for news
ws.subscribe('news:feed', {
  sources: ['coindesk', 'cointelegraph'],
  symbols: ['BTC', 'ETH']
}, (article: NewsArticle) => {
  prependToFeed(article);
  showNotification(article);
});
```

### 2. Sentiment Analysis

```typescript
interface SentimentAnalysis {
  overall: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  score: number;
  confidence: number;
  
  // Breakdown
  aspects: {
    price: SentimentAspect;
    adoption: SentimentAspect;
    regulation: SentimentAspect;
    technology: SentimentAspect;
  };
  
  // Related
  relatedSymbols: string[];
  impactPrediction: {
    symbol: string;
    direction: 'UP' | 'DOWN';
    confidence: number;
  }[];
}
```

### 3. Symbol Filtering

```typescript
// Filter news by watched symbols
const filterBySymbols = (symbols: string[]) => {
  setNewsFilter({
    type: 'SYMBOLS',
    values: symbols,
    matchMode: 'ANY' // or 'ALL'
  });
};
```

### 4. Bookmarks & Alerts

```typescript
// Bookmark article
const bookmarkArticle = async (articleId: string) => {
  await fetch('/api/news/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ articleId })
  });
};

// Create alert from news
const createAlertFromNews = (article: NewsArticle) => {
  openAlertModal({
    trigger: 'NEWS',
    symbol: article.mentionedSymbols[0],
    condition: 'SENTIMENT_MATCH',
    sentiment: article.sentiment
  });
};
```

---

## API Endpoints

### Get News
```
GET /api/news
```

Query Parameters:
- `sources`: Comma-separated source IDs
- `symbols`: Comma-separated symbols
- `sentiment`: Filter by sentiment
- `from`: Start date
- `to`: End date
- `limit`: Max results (default: 50)

### Get Sources
```
GET /api/news/sources
```

### Manage Bookmarks
```
GET /api/news/bookmarks
POST /api/news/bookmarks
DELETE /api/news/bookmarks/[id]
```

### Manage Alerts
```
GET /api/news/alerts
POST /api/news/alerts
DELETE /api/news/alerts/[id]
```

---

## UI Components

### News Feed

```tsx
<NewsFeed
  sources={activeSources}
  symbols={watchedSymbols}
  onArticleClick={handleArticleClick}
  onBookmark={handleBookmark}
  onAlertCreate={handleCreateAlert}
/>
```

### News Card

```tsx
<NewsCard
  article={article}
  showSentiment={true}
  showRelatedSymbols={true}
  compact={false}
/>
```

### Sentiment Indicator

```tsx
<SentimentIndicator
  sentiment={article.sentiment}
  score={article.sentimentScore}
  showLabel={true}
/>
```

---

## Trading Integration

### Auto-trading Triggers

```typescript
// Configure auto-trading based on news
const configureNewsTrigger = (config: NewsTriggerConfig) => {
  return {
    condition: 'NEWS_SENTIMENT',
    source: config.source,
    keywords: config.keywords,
    minSentiment: config.minSentiment,
    action: {
      type: 'OPEN_POSITION',
      symbol: config.symbol,
      side: config.sentimentDirection === 'BULLISH' ? 'LONG' : 'SHORT',
      size: config.positionSize
    }
  };
};
```

### Signal Generation

```typescript
// Generate trading signal from news
const generateSignalFromNews = (article: NewsArticle): TradingSignal => {
  return {
    source: 'NEWS_FEED',
    symbol: article.mentionedSymbols[0],
    direction: article.sentiment === 'BULLISH' ? 'BUY' : 'SELL',
    confidence: Math.abs(article.sentimentScore),
    reason: article.title,
    expiry: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours
  };
};
```

---

## Sentiment Indicators

### Aggregate Sentiment

```typescript
interface AggregateSentiment {
  period: '1h' | '4h' | '24h';
  overall: number; // -1 to 1
  
  breakdown: {
    bullish: number; // percentage
    neutral: number;
    bearish: number;
  };
  
  trending: {
    direction: 'IMPROVING' | 'DECLINING' | 'STABLE';
    change: number;
  };
}
```

### Sentiment by Symbol

```typescript
const getSymbolSentiment = (symbol: string) => {
  const recentNews = getRecentNews({ symbols: [symbol], hours: 24 });
  return {
    symbol,
    sentiment: calculateAggregateSentiment(recentNews),
    articleCount: recentNews.length,
    topSources: getTopSources(recentNews)
  };
};
```

---

## Filtering & Search

### Filter Options

```typescript
interface NewsFilter {
  // Content filters
  search?: string;
  keywords?: string[];
  excludeKeywords?: string[];
  
  // Source filters
  sources?: NewsSource[];
  
  // Entity filters
  symbols?: string[];
  exchanges?: string[];
  
  // Sentiment filters
  sentiment?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  minSentimentScore?: number;
  
  // Time filters
  from?: Date;
  to?: Date;
  
  // Impact filters
  impactLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
}
```

### Search Implementation

```typescript
const searchNews = async (query: string) => {
  const response = await fetch('/api/news', {
    params: {
      search: query,
      limit: 20
    }
  });
  return response.json();
};
```

---

## Notifications

### Breaking News Alerts

```typescript
// Configure breaking news notifications
const configureBreakingNews = (config: BreakingNewsConfig) => {
  ws.subscribe('news:breaking', config, (article) => {
    if (config.symbols.some(s => article.mentionedSymbols.includes(s))) {
      showBreakingNewsNotification(article);
      if (config.sound) playAlertSound();
    }
  });
};
```

### Notification Preferences

```typescript
interface NewsNotificationPrefs {
  enabled: boolean;
  sound: boolean;
  
  // Filters
  sources: NewsSource[];
  symbols: string[];
  minImpact: 'HIGH' | 'MEDIUM' | 'LOW';
  
  // Sentiment alerts
  bullishAlert: boolean;
  bearishAlert: boolean;
  sentimentThreshold: number;
}
```

---

## Data Sources Integration

### External API Configuration

```typescript
interface NewsAPIConfig {
  source: NewsSource;
  apiKey?: string;
  endpoint: string;
  refreshInterval: number;
  rateLimit: {
    requests: number;
    period: number;
  };
}
```

### Rate Limiting

```typescript
// Implement rate limiting for news fetching
const rateLimiter = new RateLimiter({
  requests: 100,
  period: 60 * 1000 // 1 minute
});

const fetchNews = async (source: NewsSource) => {
  await rateLimiter.waitForToken(source);
  return api.fetchNews(source);
};
```

---

## Performance

### Caching Strategy

- Recent news cached for 5 minutes
- Sentiment analysis cached for 1 hour
- Source list cached for 24 hours

### Pagination

```typescript
const fetchPaginatedNews = async (page: number, limit: number = 20) => {
  const offset = page * limit;
  return fetch(`/api/news?offset=${offset}&limit=${limit}`);
};
```

---

*Documentation for CITARION Algorithmic Trading Platform*
