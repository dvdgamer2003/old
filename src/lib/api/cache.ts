import type { Article } from '@/types';

// In-memory cache for articles with expiration
class ArticleCache {
  private cache: Map<string, { article: Article; timestamp: number }>;
  private readonly TTL: number; // Time to live in milliseconds

  constructor(ttl: number = 5 * 60 * 1000) { // Default 5 minutes
    this.cache = new Map();
    this.TTL = ttl;
  }

  set(id: string, article: Article): void {
    this.cache.set(id, {
      article,
      timestamp: Date.now()
    });
  }

  get(id: string): Article | undefined {
    const cached = this.cache.get(id);
    if (!cached) return undefined;

    // Check if cache is expired
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(id);
      return undefined;
    }

    return cached.article;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const articleCache = new ArticleCache();