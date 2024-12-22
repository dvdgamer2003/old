import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TrendingNews } from './components/TrendingNews';
import { RecommendedNews } from './components/RecommendedNews';
import { NewsSection } from './components/NewsSection';
import { FloatingAiButton } from './components/ai/FloatingAiButton';
import { useAuth } from './hooks/useAuth';
import { useNews } from './hooks/useNews';
import type { Category } from './types/categories';

export default function App() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { 
    articles, 
    loading, 
    error, 
    refreshNews,
    currentPage,
    totalPages,
    onPageChange
  } = useNews(selectedCategory);

  const showTrendingAndRecommended = !selectedCategory && currentPage === 1;

  return (
    <>
      <Layout 
        onCategorySelect={setSelectedCategory} 
        selectedCategory={selectedCategory}
      >
        <div className="max-w-7xl mx-auto">
          {showTrendingAndRecommended && (
            <>
              <TrendingNews />
              <RecommendedNews />
            </>
          )}

          <NewsSection
            title={selectedCategory 
              ? `Top ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Stories`
              : "Latest Stories"}
            articles={articles}
            loading={loading}
            error={error}
            onRefresh={refreshNews}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            paginationType="pagination"
          />
        </div>
      </Layout>
      <FloatingAiButton articles={articles} />
    </>
  );
}