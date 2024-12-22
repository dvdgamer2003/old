import React from 'react';

interface ArticleMetaProps {
  category: string;
  source: string;
  publishedAt: string;
}

export function ArticleMeta({ category, source, publishedAt }: ArticleMetaProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
        {category}
      </span>
      <span className="text-sm text-secondary">
        {source} • {new Date(publishedAt).toLocaleDateString()}
      </span>
    </div>
  );
}