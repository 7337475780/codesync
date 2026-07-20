import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';
import { recordGitActivity } from '@/lib/git/git-activity';

export async function POST(request: Request) {
  try {
    const { projectId, message, files } = await request.json();

    if (!projectId || !message) {
      return NextResponse.json({ error: 'projectId and message are required' }, { status: 400 });
    }

    const git = await getGitClient(projectId);
    
    // Default to staging all changes if files array is not provided
    if (files && Array.isArray(files) && files.length > 0) {
      await git.add(files);
    } else {
      await git.add('.');
    }
    
    const commitResult = await git.commit(message);
    await recordGitActivity(projectId, 'commit', { message, files: commitResult.summary });

    return NextResponse.json({ success: true, commit: commitResult.commit });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
