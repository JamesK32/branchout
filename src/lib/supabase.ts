import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Note: For server-side admin operations, use the admin client from './supabase-admin'

// Types for our database
export interface WaitlistEntry {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  year_of_study: string;
  school: string;
  created_at?: string;
}

// Function to add a new waitlist entry
export async function addWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'created_at'>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized - check environment variables');
  }

  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select();

  if (error) {
    console.error('Error adding waitlist entry:', error);
    throw error;
  }

  return data;
}

// Function to get waitlist count
export async function getWaitlistCount() {
  if (!supabase) {
    throw new Error('Supabase client not initialized - check environment variables');
  }

  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error getting waitlist count:', error);
    throw error;
  }

  return count || 0;
}
