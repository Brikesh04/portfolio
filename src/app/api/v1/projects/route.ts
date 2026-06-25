import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/db';

import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Sync assets on host machine
  try {
    const srcPhoto = '/Users/brikesh/anti gravity/TuS_website/public/pfarrkirchen-skyline.png';
    const destPhoto = path.join(process.cwd(), 'public/sports_club.png');
    if (fs.existsSync(srcPhoto)) {
      fs.copyFileSync(srcPhoto, destPhoto);
      console.log('✅ NextJS API: Copied hero-bg.jpg to public/sports_club.png');
    }
  } catch (err: any) {
    console.error('❌ NextJS API: Failed to copy sports photo:', err.message);
  }

  const projects = await getProjects();

  try {
    let changed = false;
    projects.forEach(proj => {
      // Ensure sports-club project is generalized
      if (proj.id === 'sports-club' && proj.title !== 'Sports Club Website') {
        proj.title = 'Sports Club Website';
        proj.desc_en = 'Built and maintained responsive frontend web interfaces and authentication systems for a local sports club using React, HTML5, CSS3, and Tailwind CSS. REST API integration and Netlify deployment.';
        changed = true;
      }
      
      // Sync French columns to English to make them English-only
      if (proj.desc_fr !== proj.desc_en) {
        proj.desc_fr = proj.desc_en;
        changed = true;
      }
      if (proj.category_fr !== proj.category_en) {
        proj.category_fr = proj.category_en;
        changed = true;
      }
    });

    if (changed) {
      await saveProjects(projects);
      console.log('✅ NextJS API: Successfully synced project database columns to English-only!');
    }
  } catch (err: any) {
    console.error('❌ NextJS API: Failed to sync database projects:', err.message);
  }

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
