import { useState, useCallback } from 'react';
import type { Article } from '@/types';

export function useSearch() {
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const searchArticles = useCallback((articles: Article[], query: string) => {
    setLoading(true);
    try {
      const searchTerms = query.toLowerCase().split(' ');
      
      const results = articles.filter(article => {
        const searchableText = `${article.title} ${article.description} ${article.category}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchResults,
    loading,
    searchArticles,
  };
}