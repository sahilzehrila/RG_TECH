import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const project = await request.json();
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    const projects = JSON.parse(data);
    
    projects.push({
      id: Date.now().toString(),
      ...project
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
