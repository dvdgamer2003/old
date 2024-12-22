import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';

export function subscribeToBreakingNews(
  onNewArticle: (article: any) => void
): RealtimeChannel {
  return supabase
    .channel('breaking_news')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'breaking_news',
      },
      (payload) => onNewArticle(payload.new)
    )
    .subscribe();
}