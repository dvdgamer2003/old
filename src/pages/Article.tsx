import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '@/hooks/useArticle';
import { useAuth } from '@/hooks/useAuth';
import { useBookmarks } from '@/hooks/useBookmarks';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { ArticleImage } from '@/components/article/ArticleImage';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { ArticleContent } from '@/components/article/ArticleContent';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { ArticleNotFound } from '@/components/article/ArticleNotFound';
import { Toaster } from 'react-hot-toast';

export function Article() {
  const { id } = useParams();
  const { user } = useAuth();
  const { article, loading, error } = useArticle(id!);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks(user?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !article) {
    return <ArticleNotFound />;
  }

  const isBookmarked = bookmarks.some(b => b.id === article.id);
  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="bottom-center" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ArticleHeader />

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-custom overflow-hidden">
          <ArticleImage
            imageUrl={article.imageUrl}
            title={article.title}
            isBookmarked={isBookmarked}
            onBookmark={handleBookmark}
          />

          <div className="p-6 md:p-8">
            <ArticleMeta
              category={article.category}
              source={article.source}
              publishedAt={article.publishedAt}
            />

            <ArticleContent
              title={article.title}
              description={article.description}
              content={article.content}
              url={article.url}
            />
          </div>
        </article>

        <RelatedArticles 
          category={article.category}
          currentArticleId={article.id}
        />
      </div>
    </div>
  );
}