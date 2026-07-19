import { Prisma, Project } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class ProjectRepository extends BaseRepository<Project> {
  async findById(id: string): Promise<Project | null> {
    return this.db.project.findUnique({ where: { id } });
  }

  async findBySlug(workspaceId: string, slug: string): Promise<Project | null> {
    return this.db.project.findUnique({
      where: {
        workspaceId_slug: {
          workspaceId,
          slug,
        },
      },
    });
  }

  async findByWorkspaceId(workspaceId: string): Promise<Project[]> {
    return this.db.project.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });
  }

  async create(data: Prisma.ProjectUncheckedCreateInput): Promise<Project> {
    return this.db.project.create({ data });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.db.project.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Project> {
    return this.db.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const projectRepository = new ProjectRepository();
