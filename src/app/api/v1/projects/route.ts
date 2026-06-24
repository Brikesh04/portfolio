import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/db';

export async function GET() {
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
