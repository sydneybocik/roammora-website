/*
  # Add "How did you hear about us" fields

  ## Overview
  Adds fields to track how users discovered Roammora for marketing attribution.

  ## New Columns
  
  ### `heard_about_us` (jsonb)
  - Stores array of selected channels (e.g., ["TikTok", "A friend or fellow Roamer"])
  - Nullable to support existing rows
  - Part of Section 1 data collection
  
  ### `heard_about_us_other_text` (text)
  - Stores free-text specification when "Other" is selected
  - Nullable to support existing rows and optional selection
  - Only populated when "Other" is included in heard_about_us array

  ## Important Notes
  1. These fields are added to existing table without data loss
  2. Existing rows will have NULL values for these columns
  3. New submissions will populate these fields in Section 1
*/

-- Add new columns to track referral source
ALTER TABLE roamer_submissions
ADD COLUMN IF NOT EXISTS heard_about_us JSONB,
ADD COLUMN IF NOT EXISTS heard_about_us_other_text TEXT;
