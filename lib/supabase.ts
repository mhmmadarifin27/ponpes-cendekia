// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdwoezounqobcovdyqw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZHdvZXpvdW5xb2Jjb3ZkeXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MjE5OTQsImV4cCI6MjA5MDE5Nzk5NH0.hug9BR1dnQ-ljoM35etGJ-IBbsmN48MwrVSkWjdqtIA';

// Inilah jembatan utama kita ke database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);