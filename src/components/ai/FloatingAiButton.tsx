import React, { useState } from 'react';
import { Newspaper, Sparkles } from 'lucide-react';
import { AiMenu } from './AiMenu';
import { ArticleSelector } from './ArticleSelector';
import { SummaryModal } from './SummaryModal';
import { ChatModal } from './ChatModal';
import { useNewsSummary } from '@/hooks/useNewsSummary';
import type { Article } from '@/types';

interface FloatingAiButtonProps {
  articles: Article[];
}

export function FloatingAiButton({ articles }: FloatingAiButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);
  
  const {
    summary,
    loading,
    error,
    generateSummary,
    remainingUsage,
    usageLimit
  } = useNewsSummary(selectedArticles);

  const handleArticleSelect = (article: Article) => {
    setSelectedArticles(prev => {
      const exists = prev.some(a => a.id === article.id);
      if (exists) {
        return prev.filter(a => a.id !== article.id);
      }
      if (prev.length >= 10) return prev;
      return [...prev, article];
    });
  };

  const handleSummarize = async () => {
    if (selectedArticles.length === 0) return;
    setShowSelector(false);
    setShowSummary(true);
    await generateSummary();
  };

  return (
    <>
      <button
        onClick={() => setShowMenu(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group animate-float-custom"
        title="AI News Assistant"
      >
        <div className="relative flex items-center justify-center">
          <Newspaper className="w-6 h-6" />
          <Sparkles 
            className="absolute -top-2 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-300 animate-pulse-custom" 
          />
        </div>
      </button>

      <AiMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onSelectChat={() => setShowChat(true)}
        onSelectSummarize={() => setShowSelector(true)}
      />

      <ArticleSelector
        articles={articles}
        selectedArticles={selectedArticles}
        onSelect={handleArticleSelect}
        onClose={() => {
          setShowSelector(false);
          setSelectedArticles([]);
        }}
        isOpen={showSelector}
      />

      <SummaryModal
        summary={summary}
        loading={loading}
        error={error}
        remainingUsage={remainingUsage}
        usageLimit={usageLimit}
        onClose={() => {
          setShowSummary(false);
          setSelectedArticles([]);
        }}
        isOpen={showSummary}
      />

      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />

      {showSelector && selectedArticles.length > 0 && (
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="fixed bottom-6 right-24 px-6 py-3 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 animate-slide-in"
        >
          <Newspaper className="w-5 h-5" />
          Summarize ({selectedArticles.length})
        </button>
      )}
    </>
  );
}