/*
  # Fix recommendations and user interactions

  1. Changes
    - Add missing columns to user_interactions table
    - Add indexes for better performance
    - Update RLS policies
*/

-- Add missing columns if they don't exist
ALTER TABLE user_interactions
ADD COLUMN IF NOT EXISTS source text,
ADD COLUMN IF NOT EXISTS weight integer DEFAULT 1;

-- Create composite index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_interactions_composite 
ON user_interactions(user_id, category, created_at DESC);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can insert their own interactions" ON user_interactions;
DROP POLICY IF EXISTS "Users can view their own interactions" ON user_interactions;

CREATE POLICY "Users can manage their own interactions"
ON user_interactions
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Function to clean up old interactions
CREATE OR REPLACE FUNCTION cleanup_old_interactions()
RETURNS trigger AS $$
BEGIN
  -- Keep only last 100 interactions per user
  DELETE FROM user_interactions
  WHERE id IN (
    SELECT id FROM (
      SELECT id,
      ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
      FROM user_interactions
      WHERE user_id = NEW.user_id
    ) ranked
    WHERE rn > 100
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for cleanup
DROP TRIGGER IF EXISTS trigger_cleanup_interactions ON user_interactions;
CREATE TRIGGER trigger_cleanup_interactions
  AFTER INSERT ON user_interactions
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_old_interactions();