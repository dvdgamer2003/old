import { useState, useCallback } from 'react';
import { generateNewsSummary } from '@/lib/api/mistral';
import { useLocalStorage } from './useLocalStorage';
import type { Article } from '@/types';

const DAILY_LIMIT = 5;
const STORAGE_KEY = 'news_ai_usage';

interface UsageData {
  count: number;
  date: string;
}

export function useNewsSummary(articles: Article[]) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useLocalStorage<UsageData>(STORAGE_KEY, {
    count: 0,
    date: new Date().toDateString()
  });

  const checkUsageLimit = useCallback((): boolean => {
    const today = new Date().toDateString();
    
    if (usage.date !== today) {
      setUsage({ count: 0, date: today });
      return true;
    }
    
    return usage.count < DAILY_LIMIT;
  }, [usage, setUsage]);

  const getRemainingUsage = useCallback((): number => {
    const today = new Date().toDateString();
    if (usage.date !== today) return DAILY_LIMIT;
    return Math.max(0, DAILY_LIMIT - usage.count);
  }, [usage]);

  const generateSummary = useCallback(async () => {
    if (!articles.length) return;
    
    if (!checkUsageLimit()) {
      setError('Daily AI usage limit reached. Try again tomorrow.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const headlines = articles.slice(0, 5).map(article => article.title);
      const result = await generateNewsSummary(headlines);
      
      setSummary(result);
      setUsage(prev => ({
        date: new Date().toDateString(),
        count: prev.date === new Date().toDateString() ? prev.count + 1 : 1
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [articles, checkUsageLimit, setUsage]);

  return {
    summary,
    loading,
    error,
    generateSummary,
    remainingUsage: getRemainingUsage(),
    usageLimit: DAILY_LIMIT
  };
}