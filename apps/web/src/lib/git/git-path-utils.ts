import simpleGit, { SimpleGit } from 'simple-git';
import path from 'path';
import fs from 'fs';

export function getRepoPath(projectId: string): string {
  // Strict validation: projectId should be a valid UUID or alphanumeric string, no path traversals
  if (!/^[a-zA-Z0-9-]+$/.test(projectId)) {
    throw new Error('Invalid project ID format');
  }

  const baseDir = path.resolve(process.cwd(), '.repos');
  const targetPath = path.resolve(baseDir, projectId);

  // Security: prevent path traversal out of the base directory
  if (!targetPath.startsWith(baseDir)) {
    throw new Error('Path traversal detected');
  }

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  return targetPath;
}

export async function getGitClient(projectId: string): Promise<SimpleGit> {
  const repoPath = getRepoPath(projectId);
  if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath, { recursive: true });
  }
  const git = simpleGit(repoPath);
  
  if (!fs.existsSync(path.join(repoPath, '.git'))) {
    await git.init();
  }
  
  return git;
}
