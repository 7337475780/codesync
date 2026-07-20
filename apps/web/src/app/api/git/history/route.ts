import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/server-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const maxCount = parseInt(searchParams.get('maxCount') || '50', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    
    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }

    const git = getGitClient(projectId);
    
    const logResult = await git.log({
      maxCount,
      skip
    });

    return NextResponse.json({ success: true, history: logResult.all, total: logResult.total });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
