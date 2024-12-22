import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useBreakingNews } from '@/hooks/useBreakingNews';

export function BreakingNewsAlert() {
  const breakingNews = useBreakingNews();

  if (!breakingNews.length) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      {breakingNews.map((article) => (
        <div
          key={article.id}
          className="bg-red-600 text-white p-4 rounded-lg shadow-lg mb-2 animate-slide-in"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Breaking News</span>
          </div>
          <p className="text-sm">{article.title}</p>
        </div>
      ))}
    </div>
  );
}