import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import type { Article } from '@/types';

interface NewsCardProps {
  article: Article;
  index?: number;
}

export function NewsCard({ article, index = 0 }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link 
      to={`/article/${article.id}`}
      className="group block bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-xl overflow-hidden card-hover"
      style={{
        '--delay': `${index * 100}ms`,
      } as React.CSSProperties}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <LoadingSpinner />
          </div>
        )}
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800' : article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-sm md:text-base text-secondary mb-3 md:mb-4 line-clamp-2">
          {article.description}
        </p>
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-secondary truncate mr-2">
            {article.source} • {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <span className="px-2 py-1 md:px-3 bg-accent/10 text-accent rounded-full font-medium whitespace-nowrap">
            {article.category}
          </span>
        </div>
      </div>
    </Link>
  );
}