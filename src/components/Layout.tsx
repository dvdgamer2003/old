import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Search, Bell, RefreshCw } from 'lucide-react';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './UserMenu';
import { UserPreferences } from './UserPreferences';
import { SearchBar } from './SearchBar';
import { CategoryNav } from './CategoryNav';
import { Footer } from './Footer';
import { RegionSelector } from './RegionSelector';
import { useAuth } from '@/hooks/useAuth';
import { usePreferences } from '@/hooks/usePreferences';
import { useNews } from '@/hooks/useNews';
import type { Category } from '@/types/categories';
import type { RegionCode } from '@/types/regions';

interface LayoutProps {
  children: React.ReactNode;
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category | undefined;
}

export function Layout({ children, onCategorySelect, selectedCategory }: LayoutProps) {
  const { user } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const { articles, refreshNews, loading } = useNews();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleRegionChange = async (region: RegionCode) => {
    if (!preferences) return;
    await updatePreferences({ ...preferences, region });
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-secondary hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <a href="/" className="text-lg md:text-xl font-bold text-primary dark:text-primary">
                Samachar 2.0
              </a>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <RegionSelector 
                selectedRegion={preferences?.region as RegionCode || 'us'} 
                onRegionChange={handleRegionChange}
              />

              <button
                onClick={refreshNews}
                disabled={loading}
                className="p-2 text-secondary hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                title="Refresh news"
              >
                <RefreshCw className={`w-5 h-5 md:w-6 md:h-6 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button 
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="md:hidden p-2 text-secondary hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="hidden md:block relative w-[300px] lg:w-[400px]">
                <SearchBar articles={articles} />
              </div>

              <button 
                className="p-2 text-secondary hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-secondary hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
              </button>

              {user ? (
                <UserMenu onShowPreferences={() => setIsPreferencesOpen(true)} />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-primary text-white text-sm md:text-base rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>

          {isSearchVisible && (
            <div className="mt-2 pb-2 md:hidden">
              <SearchBar articles={articles} />
            </div>
          )}
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-[280px] h-screen pt-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="h-full px-4 pb-4 overflow-y-auto">
          <CategoryNav
            onSelect={(category) => {
              onCategorySelect(category);
              setIsSidebarOpen(false);
            }}
            selectedCategory={selectedCategory}
          />
        </div>
      </aside>

      <main className="lg:ml-[280px] transition-[margin] duration-300">
        <div className="container mx-auto px-4 py-20 md:py-24 max-w-7xl">
          {children}
        </div>
        <Footer />
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <UserPreferences isOpen={isPreferencesOpen} onClose={() => setIsPreferencesOpen(false)} />
    </div>
  );
}