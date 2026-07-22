import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fullName = url.searchParams.get('fullName');
    
    let repositoryId: string | undefined;
    if (fullName) {
      const [orgSlug, repoName] = fullName.split('/');
      const repo = await prisma.repository.findFirst({
        where: {
          project: {
            name: repoName,
            workspace: {
              organization: {
                slug: orgSlug
              }
            }
          }
        }
      });
      if (repo) repositoryId = repo.id;
    }

    const where = repositoryId ? { repositoryId } : {};
    
    const dbBranches = await prisma.branch.findMany({
      where,
      include: {
        commits: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    const branches = dbBranches.map(b => ({
      name: b.name,
      commit: {
        sha: b.commits[0]?.sha || 'unknown',
        url: ''
      },
      protected: b.name === 'main' || b.name === 'master',
      isDefault: b.name === 'main' || b.name === 'master'
    }));

    return NextResponse.json(branches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch branches' }, { status: 500 });
  }
}
