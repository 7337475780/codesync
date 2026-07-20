import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const branch = searchParams.get('branch');
    const remote = searchParams.get('remote') || 'origin';
    
    if (!projectId || !branch) return NextResponse.json({ error: 'projectId and branch are required' }, { status: 400 });

    const git = await getGitClient(projectId);
    
    const ahead = await git.raw(['rev-list', '--count', `${remote}/${branch}..${branch}`]);
    const behind = await git.raw(['rev-list', '--count', `${branch}..${remote}/${branch}`]);

    return NextResponse.json({ 
      success: true, 
      ahead: parseInt(ahead.trim()) || 0,
      behind: parseInt(behind.trim()) || 0
    });
  } catch (error: any) {
    // If the remote branch doesn't exist, ahead/behind count will fail. Return 0 for both safely.
    return NextResponse.json({ success: true, ahead: 0, behind: 0, warning: error.message });
  }
}
