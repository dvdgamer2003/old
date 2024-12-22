import React, { useState } from 'react';
import { Brain, AlertCircle, Loader2, Info } from 'lucide-react';
import { useNewsSummary } from '@/hooks/useNewsSummary';
import type { Article } from '@/types';

interface NewsSummaryProps {
  articles: Article[];
}

export function NewsSummary({ articles }: NewsSummaryProps) {
  const [showSummary, setShowSummary] = useState(false);
  const {
    summary,
    loading,
    error,
    generateSummary,
    remainingUsage,
    usageLimit
  } = useNewsSummary(articles);

  const handleAnalyze = () => {
    setShowSummary(true);
    generateSummary();
  };

  if (!showSummary) {
    return (
      <div className="mb-8">
        <button
          onClick={handleAnalyze}
          disabled={remainingUsage === 0}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Brain className="w-5 h-5" />
          Summarize with AI
        </button>
        <p className="mt-2 text-sm text-secondary flex items-center gap-1">
          <Info className="w-4 h-4" />
          {remainingUsage} of {usageLimit} daily AI summaries remaining
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <p>Generating summary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
        {remainingUsage > 0 && (
          <button
            onClick={generateSummary}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Summary</h3>
        </div>
        <button
          onClick={() => setShowSummary(false)}
          className="text-sm text-secondary hover:text-primary transition-colors"
        >
          Hide
        </button>
      </div>
      <p className="text-secondary leading-relaxed whitespace-pre-line">
        {summary}
      </p>
      <p className="mt-4 text-sm text-secondary flex items-center gap-1">
        <Info className="w-4 h-4" />
        {remainingUsage} of {usageLimit} daily AI summaries remaining
      </p>
    </div>
  );
}