import React from 'react';
import { RefreshCw } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { Pagination } from './Pagination';
import { LoadMoreButton } from './LoadMoreButton';
import type { Article } from '@/types';
import type { PaginationType } from '@/types/pagination';

interface NewsSectionProps {
  title: string;
  articles: Article[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  paginationType?: PaginationType;
}

export function NewsSection({ 
  title, 
  articles, 
  loading, 
  error, 
  onRefresh,
  hasMore,
  onLoadMore,
  currentPage,
  totalPages,
  onPageChange,
  paginationType = 'load-more'
}: NewsSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh news"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Refresh</span>
          </button>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {articles.map((article, index) => (
              <NewsCard 
                key={article.id} 
                article={article}
                index={index}
              />
            ))}
            
            {loading && (
              [...Array(4)].map((_, i) => (
                <div 
                  key={`skeleton-${i}`} 
                  className="animate-pulse bg-gray-200 dark:bg-gray-700 h-72 md:h-96 rounded-lg"
                />
              ))
            )}
          </div>

          {paginationType === 'load-more' ? (
            hasMore && (
              <div className="mt-8 text-center">
                <LoadMoreButton onClick={onLoadMore!} loading={loading} />
              </div>
            )
          ) : (
            currentPage && totalPages && onPageChange && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )
          )}
        </>
      )}
    </section>
  );
}