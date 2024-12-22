/*
  # Fix bookmarks table schema

  1. Changes
    - Add content and description columns initially without NOT NULL
    - Update existing rows with default values
    - Add NOT NULL constraints after data migration
    - Add performance indexes
    
  2. Security
    - Maintains existing RLS policies
*/

-- First add columns without NOT NULL constraint
ALTER TABLE bookmarks 
ADD COLUMN IF NOT EXISTS content text,
ADD COLUMN IF NOT EXISTS description text;

-- Update existing rows with default values
UPDATE bookmarks 
SET content = COALESCE(content, description, article_title, ''),
    description = COALESCE(description, article_title, '');

-- Now add NOT NULL constraints
ALTER TABLE bookmarks
ALTER COLUMN content SET NOT NULL,
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN article_title SET NOT NULL,
ALTER COLUMN article_url SET NOT NULL,
ALTER COLUMN article_image SET NOT NULL,
ALTER COLUMN category SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_category ON bookmarks(category);