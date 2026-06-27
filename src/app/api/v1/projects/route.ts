import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/db';

import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Sync assets on host machine
  try {
    const src1 = '/Users/brikesh/.gemini/antigravity-ide/brain/6719ad0f-cd73-4553-82c3-59d8d7296443/media__1782404364560.png';
    const src2 = '/Users/brikesh/.gemini/antigravity-ide/brain/6719ad0f-cd73-4553-82c3-59d8d7296443/media__1782404394437.png';
    const dest1 = path.join(process.cwd(), 'public/tus_cricket_1.png');
    const dest2 = path.join(process.cwd(), 'public/tus_cricket_2.png');
    
    if (fs.existsSync(src1)) {
      fs.copyFileSync(src1, dest1);
      console.log('✅ NextJS API: Copied screenshot 1 to public/tus_cricket_1.png');
    }
    if (fs.existsSync(src2)) {
      fs.copyFileSync(src2, dest2);
      console.log('✅ NextJS API: Copied screenshot 2 to public/tus_cricket_2.png');
    }
  } catch (err: any) {
    console.error('❌ NextJS API: Failed to copy screenshots:', err.message);
  }

  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const projects = await request.json();
    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: 'Projects must be an array' }, { status: 400 });
    }
    const success = await saveProjects(projects);
    if (success) {
      return NextResponse.json({ message: 'Projects saved successfully', projects });
    }
    return NextResponse.json({ error: 'Failed to write projects to disk' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
