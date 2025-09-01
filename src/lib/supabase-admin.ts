import { createClient } from '@supabase/supabase-js';

// Environment validation functions
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Supabase Admin Client (server-side only)
export const sbAdmin = createClient(
  requireEnv('SUPABASE_URL'),
  requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Twilio configuration (validated on use)
export function getTwilioConfig() {
  return {
    accountSid: requireEnv('TWILIO_ACCOUNT_SID'),
    authToken: requireEnv('TWILIO_AUTH_TOKEN'),
    messagingServiceSid: requireEnv('TWILIO_MESSAGING_SERVICE_SID')
  };
}

// Admin secret validation
export function validateAdminSecret(secret: string): boolean {
  const expectedSecret = requireEnv('ADMIN_SECRET');
  return secret === expectedSecret;
}

// Database types for TypeScript
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  campus: string;
  status: 'pending' | 'active' | 'paused' | 'opted_out';
  slot?: number;
  created_at: string;
}

export interface Pod {
  id: string;
  campus: string;
  slot: number;
  label?: string;
  location?: string;
  meets_at?: string;
  notes?: string;
  created_at: string;
}

export interface PodMember {
  pod_id: string;
  user_id: string;
  role: string;
  confirmed: boolean;
}

export interface Message {
  id: number;
  user_id?: string;
  direction: 'in' | 'out';
  body: string;
  status?: string;
  created_at: string;
}

export interface Feedback {
  id: number;
  user_id?: string;
  pod_id?: string;
  rating?: number;
  comment?: string;
  created_at: string;
}
