import { NextResponse } from 'next/server';
import { getGitClient, recordGitActivity } from '@/lib/git/server-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) return NextResponse.json({ error: 'projectId is required' }, { status: 400 });

    const git = getGitClient(projectId);
    const remotes = await git.getRemotes(true);

    return NextResponse.json({ success: true, remotes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { projectId, name, url } = await request.json();
    if (!projectId || !name || !url) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    const git = getGitClient(projectId);
    await git.addRemote(name, url);
    await recordGitActivity(projectId, 'add_remote', { name, url });

    return NextResponse.json({ success: true, message: 'Remote added' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { projectId, name } = await request.json();
    if (!projectId || !name) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    const git = getGitClient(projectId);
    await git.removeRemote(name);
    await recordGitActivity(projectId, 'remove_remote', { name });

    return NextResponse.json({ success: true, message: 'Remote removed' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
