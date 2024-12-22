/*
  # Add region preference to user preferences

  1. Changes
    - Add region column to user_preferences table with default value 'us'
    - Add check constraint to ensure valid region codes
*/

ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS region text DEFAULT 'us';

-- Add check constraint for valid region codes
ALTER TABLE user_preferences
ADD CONSTRAINT valid_region CHECK (
  region IN ('us', 'gb', 'in', 'au', 'ca', 'fr', 'de', 'jp')
);