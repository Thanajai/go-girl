import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && supabaseUrl !== 'https://placeholder.supabase.co');

// Only create the client if we have valid credentials
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

/*
  -- Table: profiles
  CREATE TABLE profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    nickname TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Table: evidence_logs
  CREATE TABLE evidence_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    platform TEXT,
    description TEXT NOT NULL,
    severity TEXT,
    gemini_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Table: stories (seeded, read-only for users)
  CREATE TABLE stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    city TEXT,
    quote TEXT,
    full_story TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- RLS Policies:
  -- profiles: user can only read/write their own row
  -- evidence_logs: user can only CRUD their own rows
  -- stories: anyone can read (public)
*/
