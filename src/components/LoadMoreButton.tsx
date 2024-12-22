import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
    >
      {loading ? <LoadingSpinner /> : 'Load More News'}
    </button>
  );
}