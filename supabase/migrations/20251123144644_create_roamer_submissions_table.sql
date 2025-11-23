/*
  # Create roamer_submissions table for multi-step questionnaire

  ## Overview
  This migration creates the core table for storing Roamer waitlist questionnaire submissions
  with progressive auto-save functionality and resume capability.

  ## New Tables
  
  ### `roamer_submissions`
  Core submission tracking table allowing multiple submissions per email.
  
  #### Metadata & Tracking Fields
  - `submission_id` (uuid, primary key) - Unique identifier for each submission
  - `email` (text, indexed but NOT unique) - User email, allows multiple submissions per email
  - `created_at` (timestamptz) - When submission was first created
  - `updated_at` (timestamptz) - Last update timestamp
  - `current_section` (text) - Progress tracker: '1', '2', '3', '4' (4 = completed)
  - `source` (text, indexed) - Attribution tracking (e.g., 'homepage', 'newsletter', 'hero', 'final_cta')
  - `consent_timestamp` (timestamptz, nullable) - When user gave consent for communications (compliance tracking)
  
  #### Page 1 Fields - Name and Email
  - `first_name` (text) - User's first name
  - `last_name` (text) - User's last name
  - `phone_number` (text) - International phone in E.164 format (e.g., +14155551234)
  - `phone_country_code` (text) - Selected country code for reference
  - `opt_in_updates` (text) - "Can we keep you in the loop?" values: 'yes', 'no'
  
  #### Page 2 Fields - Dream
  - `dream_pull` (text) - "What's pulling you toward a new country?"
  - `dream_days_feel` (text) - "How do your days feel right now?"
  - `dream_life_too_small` (text) - "Do you ever feel like your life is too small for who you really are?"
  - `dream_frequency` (text) - "How often do you think about moving abroad?"
  - `dream_community` (text) - "Are you looking for a deeper sense of community?"
  - `dream_excites` (text) - "What excites you most about starting fresh somewhere new?"
  
  #### Page 3 Fields - Plan
  - `current_location` (text) - User's current location
  - `regions_interested` (jsonb) - Array of interested regions
  - `work_situation` (text) - Current work situation
  - `work_field` (text) - Field of work
  - `income_range` (text) - Income range
  - `income_urgency` (text) - "How important is maintaining your current income?"
  - `moving_with` (jsonb) - Array of who they're moving with
  - `timeline` (text) - When they want to move
  - `blockers` (jsonb) - Array of potential blockers
  - `blockers_other_text` (text) - Additional blocker details
  - `move_intention` (text) - Intention level for the move
  
  #### Page 4 Fields - Arrive
  - `languages` (jsonb) - Array of {language: string, proficiency: string} objects
  - `feeling_at_home` (text) - "What makes you feel most at home?"
  - `safety_considerations` (jsonb) - Array of safety considerations
  - `safety_considerations_other_text` (text) - Additional safety details
  - `home_preferences` (text) - Preferences for where to live
  - `anything_else` (text) - Open-ended additional information
  - `opt_in_path_alert` (text) - "Want to be first to know?" values: 'yes', 'no'

  ## Security
  - Enable Row Level Security on `roamer_submissions` table
  - Allow anonymous inserts (for new submissions)
  - Allow anonymous updates (for progressive save functionality)
  - Allow anonymous selects (for resume functionality via email lookup)

  ## Indexes
  - Regular (non-unique) index on `email` for efficient resume lookups
  - Index on `source` for analytics queries
  - Primary key index on `submission_id`

  ## Important Notes
  1. Email is NOT unique - users can have multiple submissions over time
  2. Resume logic finds most recent submission WHERE current_section != '4'
  3. consent_timestamp tracks when users opt-in for compliance (GDPR, etc.)
  4. All multi-select fields stored as JSONB arrays for flexibility
  5. phone_number uses E.164 international format
*/

-- Create the roamer_submissions table
CREATE TABLE IF NOT EXISTS roamer_submissions (
  -- Metadata & Tracking
  submission_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  current_section text DEFAULT '1',
  source text DEFAULT 'homepage',
  consent_timestamp timestamptz,
  
  -- Page 1: Name and Email
  first_name text,
  last_name text,
  phone_number text,
  phone_country_code text,
  opt_in_updates text,
  
  -- Page 2: Dream
  dream_pull text,
  dream_days_feel text,
  dream_life_too_small text,
  dream_frequency text,
  dream_community text,
  dream_excites text,
  
  -- Page 3: Plan
  current_location text,
  regions_interested jsonb,
  work_situation text,
  work_field text,
  income_range text,
  income_urgency text,
  moving_with jsonb,
  timeline text,
  blockers jsonb,
  blockers_other_text text,
  move_intention text,
  
  -- Page 4: Arrive
  languages jsonb,
  feeling_at_home text,
  safety_considerations jsonb,
  safety_considerations_other_text text,
  home_preferences text,
  anything_else text,
  opt_in_path_alert text
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_roamer_submissions_email ON roamer_submissions(email);
CREATE INDEX IF NOT EXISTS idx_roamer_submissions_source ON roamer_submissions(source);
CREATE INDEX IF NOT EXISTS idx_roamer_submissions_created_at ON roamer_submissions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE roamer_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new submissions
CREATE POLICY "Allow anonymous inserts"
  ON roamer_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update their own submissions
CREATE POLICY "Allow anonymous updates"
  ON roamer_submissions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to select submissions for resume functionality
CREATE POLICY "Allow anonymous selects"
  ON roamer_submissions
  FOR SELECT
  TO anon
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_roamer_submissions_updated_at
  BEFORE UPDATE ON roamer_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
