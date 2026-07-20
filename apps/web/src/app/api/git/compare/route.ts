import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const base = searchParams.get('base') || 'main';
    const head = searchParams.get('head');
    
    if (!projectId || !head) return NextResponse.json({ error: 'projectId and head are required' }, { status: 400 });

    const git = await getGitClient(projectId);
    
    // git diff base..head
    const diff = await git.diff([`${base}..${head}`]);

    return NextResponse.json({ success: true, diff });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
