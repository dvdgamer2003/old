import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Article } from '@/types';

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
        <div className="relative h-64 md:h-96">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
              {article.category}
            </span>
            <span className="text-sm text-secondary">
              {article.source} • {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground">{article.title}</h2>
          
          <p className="text-secondary leading-relaxed">{article.description}</p>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Read full article <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}