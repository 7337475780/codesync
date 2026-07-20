import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';
import { recordGitActivity } from '@/lib/git/git-activity';

export async function POST(request: Request) {
  try {
    const { projectId, remote = 'origin', branch } = await request.json();

    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }

    const git = await getGitClient(projectId);
    
    const currentBranch = branch || (await git.branch()).current;
    
    if (!currentBranch) {
      return NextResponse.json({ error: 'No current branch found' }, { status: 400 });
    }

    await git.push(remote, currentBranch);
    await recordGitActivity(projectId, 'push', { remote, branch: currentBranch });

    return NextResponse.json({ success: true, message: 'Push successful' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
