import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { trackUserInteraction } from '../lib/recommendations/userInteractions';
import type { Article } from '../types';

export function useBookmarks(userId: string | undefined) {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;

        setBookmarks(
          data.map((bookmark) => ({
            id: bookmark.article_id,
            title: bookmark.article_title,
            url: bookmark.article_url,
            imageUrl: bookmark.article_image,
            category: bookmark.category,
            publishedAt: bookmark.created_at,
            source: bookmark.source,
            description: bookmark.description,
            content: bookmark.content,
          }))
        );
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  const addBookmark = async (article: Article) => {
    if (!userId) return;

    try {
      const { error } = await supabase.from('bookmarks').insert({
        user_id: userId,
        article_id: article.id,
        article_title: article.title,
        article_url: article.url,
        article_image: article.imageUrl,
        category: article.category,
        source: article.source,
        description: article.description,
        content: article.content,
      });

      if (error) throw error;

      // Track interaction for recommendations
      await trackUserInteraction(userId, article, 'bookmark');

      setBookmarks([...bookmarks, article]);
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  };

  const removeBookmark = async (articleId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('article_id', articleId);

      if (error) throw error;

      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== articleId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
  };
}