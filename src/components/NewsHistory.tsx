import React from 'react';
import { History } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { useNewsHistory } from '@/hooks/useNewsHistory';
import type { Category } from '@/types';

interface NewsHistoryProps {
  category?: Category;
}

export function NewsHistory({ category }: NewsHistoryProps) {
  const { history, loading, lastUpdate } = useNewsHistory(category);

  if (loading || !history.length) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <History className="w-6 h-6 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold">Previously Seen News</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last updated {new Date(lastUpdate).toLocaleTimeString()}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {history.slice(0, 6).map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}