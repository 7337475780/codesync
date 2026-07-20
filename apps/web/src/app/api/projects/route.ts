import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';
import { createClient } from '@/lib/supabase/server';
import fs from 'fs';
import path from 'path';
import { getRepoPath } from '@/lib/git/git-path-utils';
import simpleGit from 'simple-git';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: user.id
          }
        }
      }
    });

    return NextResponse.json({ projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, workspaceId } = await request.json();

    // Check if the organization/workspace exists
    const orgWorkspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });
    
    if (!orgWorkspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        workspace: { connect: { id: workspaceId } },
        members: {
          create: {
            userId: user.id,
            role: 'OWNER'
          }
        }
      }
    });

    // Automatically Create Workspace folder and provision
    const repoPath = getRepoPath(project.id);
    if (!fs.existsSync(repoPath)) {
      fs.mkdirSync(repoPath, { recursive: true });
    }

    const git = simpleGit(repoPath);
    await git.init();

    const defaultReadme = `# ${name}\n\nProject automatically provisioned.\n`;
    fs.writeFileSync(path.join(repoPath, 'README.md'), defaultReadme);
    
    const defaultGitignore = `node_modules\n.env\n.env.local\n.next\nbuild\ndist\n`;
    fs.writeFileSync(path.join(repoPath, '.gitignore'), defaultGitignore);

    await git.add(['README.md', '.gitignore']);
    await git.commit('Initial commit');

    // Create WorkspaceInstance to link project with backend
    await prisma.workspaceInstance.create({
      data: {
        projectId: project.id,
        status: 'RUNNING'
      }
    });

    return NextResponse.json({ project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
