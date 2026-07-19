import { BaseRepository } from './base.repository';
import type { ActivityEvent, Prisma } from '@prisma/client';

export class ActivityRepository extends BaseRepository<ActivityEvent> {
  async findById(id: string) {
    return this.db.activityEvent.findUnique({
      where: { id }
    });
  }

  async findByOrganization(organizationId: string, limit = 50) {
    return this.db.activityEvent.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  async findByProject(projectId: string, limit = 50) {
    return this.db.activityEvent.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  async create(data: Prisma.ActivityEventCreateInput) {
    return this.db.activityEvent.create({
      data
    });
  }
}

export const activityRepository = new ActivityRepository();
