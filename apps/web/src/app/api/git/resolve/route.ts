import { NextResponse } from 'next/server';
import { getGitClient, recordGitActivity } from '@/lib/git/server-utils';

export async function POST(request: Request) {
  try {
    const { projectId, file, resolution } = await request.json();
    if (!projectId || !file || !resolution) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    const git = getGitClient(projectId);
    
    if (resolution === 'current') {
      await git.checkout(['--ours', file]);
      await git.add(file);
    } else if (resolution === 'incoming') {
      await git.checkout(['--theirs', file]);
      await git.add(file);
    } else {
      return NextResponse.json({ error: 'Unsupported resolution type' }, { status: 400 });
    }

    await recordGitActivity(projectId, 'resolve_conflict', { file, resolution });
    return NextResponse.json({ success: true, message: `Conflict in ${file} resolved` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
