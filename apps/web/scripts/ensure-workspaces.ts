import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';

const prisma = new PrismaClient();
const baseDir = path.resolve(process.cwd(), '.repos');

async function ensureWorkspaces() {
  console.log('Ensuring all projects have workspaces...');

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const projects = await prisma.project.findMany();

  for (const project of projects) {
    const repoPath = path.join(baseDir, project.id);
    
    if (!fs.existsSync(repoPath)) {
      console.log(`Re-creating missing workspace for project ${project.name} (${project.id})`);
      fs.mkdirSync(repoPath, { recursive: true });
      
      const git = simpleGit(repoPath);
      await git.init();
      
      const defaultReadme = `# ${project.name}\n\nProject automatically provisioned.\n`;
      fs.writeFileSync(path.join(repoPath, 'README.md'), defaultReadme);
      
      const defaultGitignore = `node_modules\n.env\n.env.local\n.next\nbuild\ndist\n`;
      fs.writeFileSync(path.join(repoPath, '.gitignore'), defaultGitignore);

      await git.add(['README.md', '.gitignore']);
      await git.commit('Initial commit');
    }
  }

  console.log('Finished workspace verification.');
}

ensureWorkspaces()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
