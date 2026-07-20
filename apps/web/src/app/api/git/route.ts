import { NextResponse } from 'next/server';
import { getGitClient, recordGitActivity } from '@/lib/git/server-utils';

export async function POST(request: Request) {
  try {
    const { projectId, action, payload } = await request.json();

    if (!projectId || !action) {
      return NextResponse.json({ error: 'projectId and action are required' }, { status: 400 });
    }

    const git = getGitClient(projectId);
    let result: any = { success: true };

    switch (action) {
      case 'branches':
        result.data = await git.branch();
        break;
      case 'merge':
        if (!payload?.branch) throw new Error('branch is required for merge');
        result.data = await git.merge([payload.branch]);
        await recordGitActivity(projectId, 'merge', { branch: payload.branch });
        break;
      case 'tags':
        result.data = await git.tags();
        break;
      case 'diff':
        result.data = await git.diff();
        break;
      case 'cherry-pick':
        if (!payload?.commitHash) throw new Error('commitHash is required for cherry-pick');
        result.data = await git.raw(['cherry-pick', payload.commitHash]);
        await recordGitActivity(projectId, 'cherry-pick', { commitHash: payload.commitHash });
        break;
      case 'stash':
        result.data = await git.stash();
        await recordGitActivity(projectId, 'stash', {});
        break;
      case 'rebase':
        if (!payload?.branch) throw new Error('branch is required for rebase');
        result.data = await git.rebase([payload.branch]);
        await recordGitActivity(projectId, 'rebase', { branch: payload.branch });
        break;
      case 'status':
        result.data = await git.status();
        break;
      case 'checkout':
        if (!payload?.branch) throw new Error('branch is required for checkout');
        result.data = await git.checkout(payload.branch);
        await recordGitActivity(projectId, 'checkout', { branch: payload.branch });
        break;
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
