import { useState, useEffect } from 'react';
import { newsHistoryCache } from '@/lib/api/newsCache';
import type { Article, Category } from '@/types';

export function useNewsHistory(category?: Category) {
  const [history, setHistory] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const articles = newsHistoryCache.get(category);
    setHistory(articles);
    setLoading(false);
  }, [category]);

  return {
    history,
    loading,
    lastUpdate: newsHistoryCache.getTimestamp(category),
  };
}