import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getUserInteractions } from '@/lib/recommendations/userInteractions';
import { generateRecommendations } from '@/lib/recommendations/recommendationEngine';
import type { Article } from '@/types';

export function useRecommendations(articles: Article[]) {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadRecommendations = async () => {
      if (!user || !articles.length) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const interactions = await getUserInteractions(user.id);
        
        if (!mounted) return;

        // If we fail to get interactions, still show some articles
        const recommended = interactions.length > 0
          ? generateRecommendations(articles, interactions)
          : articles.slice(0, 3); // Show first 3 articles as fallback

        setRecommendations(recommended);
      } catch (err) {
        console.error('Error loading recommendations:', err);
        setError('Failed to load recommendations');
        // Show some articles even if recommendations fail
        setRecommendations(articles.slice(0, 3));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRecommendations();

    return () => {
      mounted = false;
    };
  }, [user, articles]);

  return { recommendations, loading, error };
}