import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) return NextResponse.json({ error: 'projectId is required' }, { status: 400 });

    const git = await getGitClient(projectId);
    
    const branches = await git.branch();
    const remotes = await git.getRemotes(true);

    return NextResponse.json({ 
      success: true, 
      repository: {
        currentBranch: branches.current,
        allBranches: branches.all,
        remotes: remotes
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
