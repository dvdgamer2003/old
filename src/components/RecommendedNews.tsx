import React from 'react';
import { Sparkles } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useNews } from '@/hooks/useNews';

export function RecommendedNews() {
  const { articles } = useNews();
  const { recommendations, loading } = useRecommendations(articles);

  if (loading || !recommendations.length) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-primary animate-pulse-custom" />
        <h2 className="text-xl md:text-2xl font-bold">Recommended For You</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {recommendations.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}