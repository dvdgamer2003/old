/*
  # Add region preferences
  
  1. Changes
    - Add region column to user_preferences table
    - Set default region to 'us'
    
  2. Security
    - Maintains existing RLS policies
*/

ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS region text DEFAULT 'us';