import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  // Tarik 1 data warta aja sekadar buat "ngetuk" pintu Supabase
  const { data, error } = await supabase.from('warta').select('id').limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Supabase is awake!", time: new Date().toISOString() });
}