import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

export const supabase = env.supabase.url && env.supabase.serviceRoleKey
  ? createClient(env.supabase.url, env.supabase.serviceRoleKey)
  : null;

export async function uploadPng(buffer, path) {
  if (!supabase) throw new Error('Supabase not configured');
  const bucket = env.supabase.bucket;
  const { data, error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: 'image/png',
    upsert: true
  });
  if (error) throw error;
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
  return pub.publicUrl;
}