import { NextResponse } from 'next/server';
import { terminalManager } from '@/lib/terminal/server-terminal-manager';
import { randomUUID } from 'crypto';
import { getRepoPath } from '@/lib/git/server-utils';

export async function POST(request: Request) {
  try {
    const { cwd, cols, rows, projectId } = await request.json();
    
    const terminalId = randomUUID();
    
    // Resolve workspace directory if projectId is provided
    let workingDir = cwd || process.cwd();
    if (projectId) {
      try {
        workingDir = getRepoPath(projectId);
      } catch (e) {
        console.warn(`Could not resolve repo path for project ${projectId}:`, e);
      }
    }
    
    terminalManager.createTerminal(terminalId, workingDir, cols, rows);

    return NextResponse.json({ success: true, terminalId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
