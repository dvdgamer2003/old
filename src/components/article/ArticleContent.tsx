import React from 'react';
import { ExternalLink } from 'lucide-react';
import { openArticle } from '@/lib/utils/url';

interface ArticleContentProps {
  title: string;
  description: string;
  content: string;
  url: string;
}

export function ArticleContent({ title, description, content, url }: ArticleContentProps) {
  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!url) return;
    
    try {
      openArticle(url);
    } catch (error) {
      console.error('Error opening article:', error);
    }
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold text-foreground mb-6">{title}</h1>
      <p className="text-lg text-secondary leading-relaxed mb-6">{description}</p>
      <div className="text-foreground leading-relaxed mb-8">{content}</div>
      <button
        onClick={handleReadMore}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Read full article <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}