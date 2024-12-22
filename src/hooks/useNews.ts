import { useState, useEffect, useCallback } from 'react';
import { fetchTopNews } from '@/lib/api/newsApi';
import { newsHistoryCache } from '@/lib/api/newsCache';
import { usePreferences } from './usePreferences';
import { toast } from 'react-hot-toast';
import type { Article, Category } from '@/types';
import type { RegionCode } from '@/types/regions';

const ARTICLES_PER_PAGE = 12;
const MAX_PAGES = 5;
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useNews(category?: Category) {
  const { preferences } = usePreferences();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(MAX_PAGES);

  const fetchNews = useCallback(async (pageNum: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const region = preferences?.region || 'us';
      const data = await fetchTopNews(category, region as RegionCode, pageNum, ARTICLES_PER_PAGE);
      
      if (data.length > 0) {
        setArticles(data);
        
        // Add to history cache only first page
        if (pageNum === 1) {
          newsHistoryCache.add(category, data);
        }

        setLastRefresh(new Date());
      } else {
        setError('No articles found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
      toast.error('Failed to refresh news');
    } finally {
      setLoading(false);
    }
  }, [category, preferences?.region]);

  // Initial fetch and refresh interval
  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const loadNews = async () => {
      if (!mounted) return;
      await fetchNews(1);
    };

    loadNews();

    // Set up refresh interval
    intervalId = setInterval(loadNews, REFRESH_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [fetchNews]);

  // Handle page changes
  const handlePageChange = useCallback(async (page: number) => {
    setCurrentPage(page);
    await fetchNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchNews]);

  // Manual refresh with rate limiting
  const refreshNews = useCallback(async () => {
    const timeSinceLastRefresh = Date.now() - lastRefresh.getTime();
    if (timeSinceLastRefresh < 30000) { // 30 seconds
      toast.error('Please wait before refreshing again');
      return;
    }

    setCurrentPage(1);
    await fetchNews(1);
    toast.success('News refreshed successfully');
  }, [fetchNews, lastRefresh]);

  return { 
    articles, 
    loading, 
    error,
    refreshNews,
    lastRefresh,
    currentPage,
    totalPages,
    onPageChange: handlePageChange
  };
}