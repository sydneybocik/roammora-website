/*
  # Fix Security Issues

  ## Overview
  This migration addresses security concerns identified in the roamer_submissions table:
  1. Removes unused indexes that don't provide value but add maintenance overhead
  2. Secures the update_updated_at_column function by setting an immutable search_path

  ## Changes

  ### Removed Indexes
  - `idx_roamer_submissions_source` - Not currently used for queries
  - `idx_roamer_submissions_created_at` - Not currently used for queries

  Note: The email index is retained as it's actively used for resume functionality
  when users return to complete their questionnaire.

  ### Function Security
  - Recreates `update_updated_at_column` function with `SECURITY DEFINER` removed
  - Sets explicit `search_path` to prevent search path manipulation attacks
  - Uses qualified schema references for security

  ## Security Notes
  1. Unused indexes increase database size and slow down write operations
  2. Mutable search_path in functions can lead to privilege escalation vulnerabilities
  3. The updated function now uses an explicit, secure configuration
*/

-- Drop unused indexes to reduce maintenance overhead and improve write performance
DROP INDEX IF EXISTS idx_roamer_submissions_source;
DROP INDEX IF EXISTS idx_roamer_submissions_created_at;

-- Drop existing function and trigger
DROP TRIGGER IF EXISTS update_roamer_submissions_updated_at ON roamer_submissions;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Recreate function with secure search_path configuration
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_roamer_submissions_updated_at
  BEFORE UPDATE ON roamer_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
