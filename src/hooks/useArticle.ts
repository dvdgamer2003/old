import { useState, useEffect } from 'react';
import { articleCache } from '@/lib/api/cache';
import { fetchTopNews } from '@/lib/api/newsApi';
import type { Article } from '@/types';

export function useArticle(id: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);

        // First try to get from cache
        const cachedArticle = articleCache.get(id);
        if (cachedArticle && mounted) {
          setArticle(cachedArticle);
          setLoading(false);
          return;
        }

        // If not in cache, fetch fresh data
        const articles = await fetchTopNews();
        const foundArticle = articles.find(a => a.id === id);
        
        if (mounted) {
          if (!foundArticle) {
            throw new Error('Article not found');
          }
          setArticle(foundArticle);
          // Cache the article for future use
          articleCache.set(id, foundArticle);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load article'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadArticle();

    return () => {
      mounted = false;
    };
  }, [id]);

  return { article, loading, error };
}