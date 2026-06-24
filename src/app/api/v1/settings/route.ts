import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/db';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  try {
    const settings = await request.json();
    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Invalid settings body' }, { status: 400 });
    }
    const success = await saveSettings(settings);
    if (success) {
      return NextResponse.json({ message: 'Settings saved successfully', settings });
    }
    return NextResponse.json({ error: 'Failed to write settings to disk' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
