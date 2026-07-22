import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const org = url.searchParams.get('org');
    const fullName = url.searchParams.get('fullName');

    const where: any = {};
    if (fullName) {
      const [orgSlug, repoName] = fullName.split('/');
      where.project = {
        name: repoName,
        workspace: {
          organization: {
            slug: orgSlug
          }
        }
      };
    } else if (org) {
      where.project = {
        workspace: {
          organization: {
            slug: org
          }
        }
      };
    }

    const dbRepositories = await prisma.repository.findMany({
      where,
      include: {
        project: {
          include: {
            workspace: {
              include: {
                organization: true
              }
            }
          }
        },
        commits: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    const repositories = dbRepositories.map(r => ({
      id: r.id,
      name: r.project?.name || 'unknown-repo',
      fullName: `${r.project?.workspace?.organization?.slug || 'codesync-dev'}/${r.project?.name || 'unknown-repo'}`,
      owner: {
        login: r.project?.workspace?.organization?.slug || 'codesync-dev',
        avatarUrl: r.project?.workspace?.organization?.logoUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Org',
        type: r.project?.workspace?.organization ? 'Organization' : 'User'
      },
      private: r.project?.visibility === 'PRIVATE',
      description: r.project?.description || null,
      language: r.project?.framework || null,
      framework: r.project?.framework || null,
      stargazersCount: 0,
      forksCount: 0,
      watchersCount: 0,
      openIssuesCount: 0,
      defaultBranch: r.defaultBranch,
      pushedAt: r.commits[0]?.createdAt.toISOString() || r.updatedAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      url: r.url || `https://github.com/codesync-dev/${r.project?.name}`,
      deploymentStatus: 'success',
      syncStatus: 'synced',
    }));

    return NextResponse.json(repositories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
