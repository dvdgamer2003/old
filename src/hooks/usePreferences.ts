import { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { RegionCode } from '@/types/regions';

interface Preferences {
  categories: string[];
  theme: 'light' | 'dark';
  notification_enabled: boolean;
  region: RegionCode;
}

export function usePreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setPreferences(null);
      setLoading(false);
      return;
    }

    const fetchPreferences = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await handleSupabaseError(
          () => supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', user.id)
            .single(),
          'Error fetching preferences'
        );

        if (error) throw error;
        setPreferences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  const updatePreferences = async (newPreferences: Partial<Preferences>) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await handleSupabaseError(
        () => supabase
          .from('user_preferences')
          .update({
            ...newPreferences,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id),
        'Error updating preferences'
      );

      if (error) throw error;
      setPreferences(prev => prev ? { ...prev, ...newPreferences } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  return { preferences, updatePreferences, loading, error };
}