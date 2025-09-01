-- BranchOut Database Schema
-- Migration: 001_init.sql
-- Description: Initial schema setup for BranchOut pilot

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    campus TEXT DEFAULT 'Boston College',
    status TEXT CHECK (status IN ('pending', 'active', 'paused', 'opted_out')) DEFAULT 'pending',
    slot INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pods table
CREATE TABLE pods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus TEXT NOT NULL,
    slot INT NOT NULL,
    label TEXT,
    location TEXT,
    meets_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pod members junction table
CREATE TABLE pod_members (
    pod_id UUID REFERENCES pods(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member',
    confirmed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (pod_id, user_id)
);

-- Messages table
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    direction TEXT CHECK (direction IN ('in', 'out')) NOT NULL,
    body TEXT NOT NULL,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback table
CREATE TABLE feedback (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    pod_id UUID REFERENCES pods(id) ON DELETE SET NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_slot ON users(slot);
CREATE INDEX idx_pods_slot_campus ON pods(slot, campus);
CREATE INDEX idx_pod_members_pod_id ON pod_members(pod_id);

-- Add comments for documentation
COMMENT ON TABLE users IS 'BranchOut user accounts and preferences';
COMMENT ON TABLE pods IS 'Dinner groups/sessions';
COMMENT ON TABLE pod_members IS 'Many-to-many relationship between users and pods';
COMMENT ON TABLE messages IS 'SMS message history for Twilio integration';
COMMENT ON TABLE feedback IS 'Post-dinner feedback and ratings';
