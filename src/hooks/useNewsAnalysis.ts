import { useState, useCallback } from 'react';
import { generateNewsAnalysis } from '@/lib/api/anthropic';
import type { Article } from '@/types';

export function useNewsAnalysis(articles: Article[]) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = useCallback(async () => {
    if (!articles.length) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Only analyze first 5 headlines to stay within token limits
      const headlines = articles.slice(0, 5).map(article => article.title);
      const result = await generateNewsAnalysis(headlines);
      
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate analysis');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  }, [articles]);

  return { analysis, loading, error, generateAnalysis };
}