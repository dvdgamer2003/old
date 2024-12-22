import React from 'react';
import { useNews } from '@/hooks/useNews';
import { NewsCard } from '@/components/NewsCard';

interface RelatedArticlesProps {
  category: string;
  currentArticleId: string;
}

export function RelatedArticles({ category, currentArticleId }: RelatedArticlesProps) {
  const { articles, loading } = useNews(category as any);
  
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  if (loading || relatedArticles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}