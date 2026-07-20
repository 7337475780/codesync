import { NextResponse } from 'next/server';
import { getGitClient } from '@/lib/git/git-path-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const path = searchParams.get('path');
    
    if (!projectId || !path) return NextResponse.json({ error: 'projectId and path are required' }, { status: 400 });

    const git = await getGitClient(projectId);
    const blameStr = await git.raw(['blame', '--line-porcelain', path]);

    // Very basic parsing for git blame --line-porcelain
    const lines = blameStr.split('\n');
    const blame = [];
    let currentLine: any = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      if (line.match(/^[0-9a-f]{40} \d+ \d+ \d+$/)) {
        currentLine = { commit: line.split(' ')[0] };
      } else if (line.startsWith('author ')) {
        currentLine.author = line.substring(7);
      } else if (line.startsWith('author-time ')) {
        currentLine.date = new Date(parseInt(line.substring(12)) * 1000).toISOString();
      } else if (line.startsWith('\t')) {
        currentLine.content = line.substring(1);
        blame.push(currentLine);
      }
    }

    return NextResponse.json({ success: true, blame });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
