import { supabase } from '../supabase/client';
import type { Article } from '@/types';

export interface UserInteraction {
  articleId: string;
  category: string;
  timestamp: string;
  type: 'view' | 'bookmark';
  source: string;
  weight: number;
}

export async function trackUserInteraction(
  userId: string,
  article: Article,
  type: 'view' | 'bookmark'
): Promise<void> {
  if (!userId || !article) return;

  try {
    const weight = type === 'bookmark' ? 2 : 1;

    const { error } = await supabase
      .from('user_interactions')
      .insert({
        user_id: userId,
        article_id: article.id,
        category: article.category,
        interaction_type: type,
        source: article.source,
        weight,
      })
      .single();

    if (error) {
      console.error('Error tracking interaction:', error.message);
      return;
    }
  } catch (error) {
    // Log error but don't throw to prevent breaking the app
    console.error('Error tracking user interaction:', error);
  }
}

export async function getUserInteractions(userId: string): Promise<UserInteraction[]> {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from('user_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching interactions:', error.message);
      return [];
    }

    return (data || []).map(interaction => ({
      articleId: interaction.article_id,
      category: interaction.category,
      timestamp: interaction.created_at,
      type: interaction.interaction_type,
      source: interaction.source,
      weight: interaction.weight,
    }));
  } catch (error) {
    console.error('Error fetching user interactions:', error);
    return [];
  }
}