/*
  # User Interactions Table

  1. New Tables
    - `user_interactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `article_id` (text)
      - `category` (text)
      - `interaction_type` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `user_interactions` table
    - Add policies for users to manage their own interactions
*/

-- Create user_interactions table
CREATE TABLE IF NOT EXISTS user_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  article_id text NOT NULL,
  category text NOT NULL,
  interaction_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_interaction_type CHECK (interaction_type IN ('view', 'bookmark'))
);

-- Enable RLS
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Policies for user_interactions
CREATE POLICY "Users can insert their own interactions"
  ON user_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own interactions"
  ON user_interactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS user_interactions_user_id_idx ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS user_interactions_created_at_idx ON user_interactions(created_at DESC);