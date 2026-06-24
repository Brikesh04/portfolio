import { createClient } from '@supabase/supabase-js';
import { Settings, Project } from './types';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getSettings(): Promise<Settings> {
  try {
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
    const newIds = new Set(projects.map(p => p.id));
    const { data: existingData, error: fetchError } = await supabase
      .from('projects')
      .select('id');
    
    if (fetchError) {
      console.error('Error fetching existing project IDs:', fetchError.message);
      return false;
    }
    
    const existingIds = existingData.map((d: any) => d.id);
    const idsToDelete = existingIds.filter(id => !newIds.has(id));
    
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
