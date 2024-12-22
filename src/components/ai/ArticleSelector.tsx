import React from 'react';
import { X, Bot } from 'lucide-react';
import type { Article } from '@/types';

interface ArticleSelectorProps {
  articles: Article[];
  selectedArticles: Article[];
  onSelect: (article: Article) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function ArticleSelector({ articles, selectedArticles, onSelect, onClose, isOpen }: ArticleSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-600/10 via-blue-700/10 to-indigo-800/10">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">
              Select Articles to Summarize ({selectedArticles.length}/10)
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {articles.map(article => (
            <label
              key={article.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedArticles.some(a => a.id === article.id)}
                onChange={() => onSelect(article)}
                disabled={selectedArticles.length >= 10 && !selectedArticles.some(a => a.id === article.id)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{article.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{article.source}</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select up to 10 articles for AI-powered summary
          </p>
        </div>
      </div>
    </div>
  );
}