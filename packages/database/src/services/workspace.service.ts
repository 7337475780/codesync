import { Workspace, Prisma } from '@prisma/client';
import { workspaceRepository } from '../repositories/workspace.repository';

export class WorkspaceService {
  async getWorkspace(id: string): Promise<Workspace | null> {
    return workspaceRepository.findById(id);
  }

  async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
    return workspaceRepository.findBySlug(slug);
  }

  async createWorkspace(data: Prisma.WorkspaceUncheckedCreateInput): Promise<Workspace> {
    return workspaceRepository.create(data);
  }
}

export const workspaceService = new WorkspaceService();
