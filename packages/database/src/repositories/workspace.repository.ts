import { Prisma, Workspace } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class WorkspaceRepository extends BaseRepository<Workspace> {
  async findById(id: string): Promise<Workspace | null> {
    return this.db.workspace.findUnique({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Workspace | null> {
    return this.db.workspace.findUnique({ where: { slug } });
  }

  async create(data: Prisma.WorkspaceUncheckedCreateInput): Promise<Workspace> {
    return this.db.workspace.create({ data });
  }
}

export const workspaceRepository = new WorkspaceRepository();
