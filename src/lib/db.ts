import { createClient } from '@supabase/supabase-js';
import { Settings, Project } from './types';

let supabaseClient: any = null;

function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('Supabase credentials (SUPABASE_URL and SUPABASE_ANON_KEY/SUPABASE_SERVICE_ROLE_KEY) are missing in environment variables.');
    }
    if (typeof global.WebSocket === 'undefined') {
      (global as any).WebSocket = class {};
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

export async function getSettings(): Promise<Settings> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error) {
      console.error('Error fetching settings from Supabase:', error.message);
      return {} as Settings;
    }
    return data as Settings;
  } catch (err) {
    console.error('Unexpected error reading settings:', err);
    return {} as Settings;
  }
}

export async function saveSettings(settings: Settings): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const payload = { ...settings, id: 1 };
    const { error } = await supabase
      .from('settings')
      .upsert(payload);
    
    if (error) {
      console.error('Error saving settings to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Unexpected error saving settings:', err);
    return false;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    
    if (error) {
      console.error('Error fetching projects from Supabase:', error.message);
      return [];
    }
    return (data || []) as Project[];
  } catch (err) {
    console.error('Unexpected error reading projects:', err);
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const newIds = new Set(projects.map(p => p.id));
    const { data: existingData, error: fetchError } = await supabase
      .from('projects')
      .select('id');
    
    if (fetchError) {
      console.error('Error fetching existing project IDs:', fetchError.message);
      return false;
    }
    
    const existingIds: string[] = (existingData || []).map((d: any) => d.id);
    const idsToDelete = existingIds.filter((id: string) => !newIds.has(id));
    
    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .in('id', idsToDelete);
      
      if (deleteError) {
        console.error('Error deleting removed projects:', deleteError.message);
        return false;
      }
    }

    if (projects.length > 0) {
      const { error: upsertError } = await supabase
        .from('projects')
        .upsert(projects);
      
      if (upsertError) {
        console.error('Error upserting projects:', upsertError.message);
        return false;
      }
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error saving projects:', err);
    return false;
  }
}
