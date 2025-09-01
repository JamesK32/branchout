import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error getting waitlist count:', error);
    throw error;
  }

  return count || 0;
}
