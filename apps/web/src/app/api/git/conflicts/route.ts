import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) return NextResponse.json({ error: 'projectId is required' }, { status: 400 });

    const git = await getGitClient(projectId);
    const status = await git.status();
    
    const conflicts = status.conflicted;

    return NextResponse.json({ success: true, conflicts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
