import React, { useState } from 'react';
import { Brain, AlertCircle, Loader2 } from 'lucide-react';
import { useNewsAnalysis } from '@/hooks/useNewsAnalysis';
import type { Article } from '@/types';

interface NewsAnalysisProps {
  articles: Article[];
}

export function NewsAnalysis({ articles }: NewsAnalysisProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { analysis, loading, error, generateAnalysis } = useNewsAnalysis(articles);

  const handleAnalyze = () => {
    setShowAnalysis(true);
    generateAnalysis();
  };

  if (!showAnalysis) {
    return (
      <div className="mb-8">
        <button
          onClick={handleAnalyze}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Brain className="w-5 h-5" />
          Analyze with AI
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <p>Generating AI analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p>Unable to generate AI analysis</p>
        </div>
        <button
          onClick={generateAnalysis}
          className="mt-2 text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Analysis</h3>
        </div>
        <button
          onClick={() => setShowAnalysis(false)}
          className="text-sm text-secondary hover:text-primary transition-colors"
        >
          Hide
        </button>
      </div>
      <p className="text-secondary leading-relaxed whitespace-pre-line">
        {analysis}
      </p>
    </div>
  );
}