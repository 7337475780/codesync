import { NextResponse } from 'next/server';
import { terminalManager } from '@/lib/terminal/server-terminal-manager';
import { randomUUID } from 'crypto';
import { getRepoPath } from '@/lib/git/git-path-utils';
import fs from 'fs';
import path from 'path';
import { prisma } from '@codesync/database';

export async function POST(request: Request) {
  try {
    const { cwd, cols, rows, projectId } = await request.json();
    
    const terminalId = randomUUID();
    
    // Resolve workspace directory if projectId is provided
    let workingDir = cwd || process.cwd();
    if (projectId) {
      const project = await prisma.project.findUnique({ 
        where: { id: projectId }, 
        include: { workspace: true } 
      });
      if (!project) throw new Error(`Project ${projectId} not found in database.`);
      if (!project.workspace) throw new Error(`Project ${projectId} has no associated workspace in database.`);

      try {
        workingDir = getRepoPath(projectId);
      } catch (e: any) {
        throw new Error(`Could not resolve repo path for project ${projectId}: ${e.message}`);
      }
      
      if (!fs.existsSync(workingDir)) {
         throw new Error(`Workspace directory does not exist for project ${projectId}`);
      }
      
      try {
        fs.accessSync(workingDir, fs.constants.W_OK);
      } catch {
        throw new Error(`Workspace directory is not writable: ${workingDir}`);
      }
      
      if (!fs.existsSync(path.join(workingDir, '.git'))) {
         throw new Error(`Git repository is not initialized in ${workingDir}`);
      }
    } else {
      if (!fs.existsSync(workingDir)) throw new Error(`Terminal cwd does not exist: ${workingDir}`);
    }
    
    console.log({
      projectId,
      workingDir,
    });
    
    terminalManager.createTerminal(terminalId, workingDir, cols, rows);

    return NextResponse.json({ success: true, terminalId });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
