import React from 'react';
import { TrendingUp } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { useNews } from '@/hooks/useNews';

export function TrendingNews() {
  const { articles, loading } = useNews();
  
  if (loading || !articles.length) return null;

  // Get top 3 trending articles
  const trendingArticles = articles.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold">Trending Now</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {trendingArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}