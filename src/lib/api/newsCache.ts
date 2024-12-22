import { Article } from '@/types';

// Cache for storing news history
class NewsHistoryCache {
  private static readonly MAX_HISTORY = 50;
  private cache: Map<string, Article[]>;
  private timestamps: Map<string, number>;

  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  add(category: string | undefined, articles: Article[]) {
    const key = category || 'all';
    const existing = this.cache.get(key) || [];
    
    // Add new articles while avoiding duplicates
    const combined = [...articles, ...existing]
      .filter((article, index, self) => 
        index === self.findIndex(a => a.id === article.id)
      )
      .slice(0, NewsHistoryCache.MAX_HISTORY);

    this.cache.set(key, combined);
    this.timestamps.set(key, Date.now());
  }

  get(category: string | undefined): Article[] {
    const key = category || 'all';
    return this.cache.get(key) || [];
  }

  getTimestamp(category: string | undefined): number {
    const key = category || 'all';
    return this.timestamps.get(key) || 0;
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }
}

export const newsHistoryCache = new NewsHistoryCache();