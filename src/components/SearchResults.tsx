import React from 'react';
import { NewsCard } from './NewsCard';
import { LoadingSpinner } from './LoadingSpinner';
import type { Article } from '@/types';

interface SearchResultsProps {
  results: Article[];
  loading: boolean;
  query: string;
  onClose: () => void;
}

export function SearchResults({ results, loading, query, onClose }: SearchResultsProps) {
  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto z-50">
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Found {results.length} results for "{query}"
              </h3>
              <button
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {results.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}