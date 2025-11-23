/*
  # Add age_range column to roamer_submissions

  1. Changes
    - Add `age_range` column (text, nullable) to `roamer_submissions` table
    
  2. Purpose
    - Store user's age range selection from questionnaire Section 3
    - Optional field - users can skip or select "Prefer not to say"
    - Positioned before income-related questions in the form flow
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'roamer_submissions' AND column_name = 'age_range'
  ) THEN
    ALTER TABLE roamer_submissions ADD COLUMN age_range TEXT;
  END IF;
END $$;
