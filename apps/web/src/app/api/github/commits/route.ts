import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fullName = url.searchParams.get('fullName');
    const branchName = url.searchParams.get('branch');
    
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

    const where: any = {};
    if (repositoryId) where.repositoryId = repositoryId;
    if (branchName) where.branch = { name: branchName };
    
    const dbCommits = await prisma.commit.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const commits = dbCommits.map(c => ({
      sha: c.sha.slice(0, 8),
      message: c.message,
      author: {
        name: c.authorName,
        email: c.authorEmail,
        date: c.createdAt.toISOString(),
      },
      stats: { total: 1, additions: 1, deletions: 0 },
      files: [],
      verified: true,
    }));

    return NextResponse.json(commits);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch commits' }, { status: 500 });
  }
}
