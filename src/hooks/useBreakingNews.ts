import { useState, useEffect } from 'react';
import { subscribeToBreakingNews } from '@/lib/notifications/breakingNews';
import type { Article } from '@/types';

export function useBreakingNews() {
  const [breakingNews, setBreakingNews] = useState<Article[]>([]);

  useEffect(() => {
    const subscription = subscribeToBreakingNews((article) => {
      setBreakingNews(prev => [article, ...prev]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return breakingNews;
}