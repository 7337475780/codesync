import { NextResponse } from 'next/server';
import { getGitClient, getRepoPath, recordGitActivity } from '@/lib/git/server-utils';
import simpleGit from 'simple-git';

export async function POST(request: Request) {
  try {
    const { projectId, url, shallow = false } = await request.json();

    if (!projectId || !url) {
      return NextResponse.json({ error: 'projectId and url are required' }, { status: 400 });
    }

    const repoPath = getRepoPath(projectId);
    const git = simpleGit();
    
    const options = shallow ? ['--depth', '1'] : [];
    await git.clone(url, repoPath, options);
    
    await recordGitActivity(projectId, 'clone', { url, shallow });

    return NextResponse.json({ success: true, message: 'Repository cloned successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
