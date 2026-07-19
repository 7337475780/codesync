import { Project, Prisma } from '@prisma/client';
import { projectRepository } from '../repositories/project.repository';

export class ProjectService {
  async getProject(id: string): Promise<Project | null> {
    return projectRepository.findById(id);
  }

  async getProjectBySlug(workspaceId: string, slug: string): Promise<Project | null> {
    return projectRepository.findBySlug(workspaceId, slug);
  }

  async getWorkspaceProjects(workspaceId: string): Promise<Project[]> {
    return projectRepository.findByWorkspaceId(workspaceId);
  }

  async createProject(data: Prisma.ProjectUncheckedCreateInput): Promise<Project> {
    // Business logic like slug generation, checking limits, etc. could go here
    return projectRepository.create(data);
  }
}

export const projectService = new ProjectService();
