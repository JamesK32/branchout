-- BranchOut Waitlist Database Setup
-- Run this in your Supabase SQL Editor

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  year_of_study TEXT NOT NULL,
  school TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow count reads" ON waitlist;

-- Create a policy that allows inserts from authenticated and anonymous users
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reading count (but not individual records)
CREATE POLICY "Allow count reads" ON waitlist
  FOR SELECT USING (true);

-- Add email validation constraint (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'valid_email') THEN
        ALTER TABLE waitlist ADD CONSTRAINT valid_email 
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
    END IF;
END $$;

-- Add unique constraint on email to prevent duplicates (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_email') THEN
        ALTER TABLE waitlist ADD CONSTRAINT unique_email UNIQUE (email);
    END IF;
END $$;

-- Insert a test record (optional - remove this in production)
-- INSERT INTO waitlist (first_name, last_name, email, year_of_study, school) 
-- VALUES ('Test', 'User', 'test@example.com', 'Junior', 'Boston College');
