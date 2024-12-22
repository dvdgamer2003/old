import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { SearchResults } from './SearchResults';
import type { Article } from '@/types';

interface SearchBarProps {
  articles: Article[];
  className?: string;
}

export function SearchBar({ articles, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { searchResults, loading, searchArticles } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      searchArticles(articles, query);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [query, articles, searchArticles]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 bg-white/50 focus:bg-white dark:border-gray-600 dark:bg-gray-700/50 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showResults && (
        <SearchResults
          results={searchResults}
          loading={loading}
          query={query}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
}