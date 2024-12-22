import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { NewsCard } from '@/components/NewsCard';
import { useNewsHistory } from '@/hooks/useNewsHistory';
import { usePreferences } from '@/hooks/usePreferences';
import { CATEGORIES, type Category } from '@/types/categories';
import { CategoryLabels } from '@/types/categories';

export function OldNews() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { history, loading } = useNewsHistory(selectedCategory);
  const { preferences, updatePreferences } = usePreferences();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Initialize selected categories when preferences load
  useEffect(() => {
    if (preferences?.categories) {
      setSelectedCategories(preferences.categories);
    }
  }, [preferences]);

  const handleCategoryToggle = async (category: Category) => {
    if (!preferences) return;
    
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    await updatePreferences({ ...preferences, categories: newCategories });
  };

  return (
    <Layout onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">News Archive</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse through previously published news articles and customize your preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-slide-in">
          {/* Preferences Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Your Preferences</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm capitalize">
                      {CategoryLabels[category]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 dark:bg-gray-700 h-72 rounded-lg"
                  />
                ))}
              </div>
            ) : history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map((article, index) => (
                  <div
                    key={article.id}
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No archived news found for the selected category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}