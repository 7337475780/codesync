import { BaseRepository } from './base.repository';
import type { Team, Prisma } from '@prisma/client';

export class TeamRepository extends BaseRepository<Team> {
  async findById(id: string) {
    return this.db.team.findUnique({
      where: { id },
      include: {
        members: {
          include: { user: true }
        }
      }
    });
  }

  async findByOrganization(organizationId: string) {
    return this.db.team.findMany({
      where: { organizationId },
      include: {
        members: true
      }
    });
  }

  async create(data: Prisma.TeamCreateInput) {
    return this.db.team.create({
      data
    });
  }

  async update(id: string, data: Prisma.TeamUpdateInput) {
    return this.db.team.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return this.db.team.delete({
      where: { id }
    });
  }

  async addMember(teamId: string, userId: string, role: string = 'MEMBER') {
    return this.db.teamMember.create({
      data: {
        teamId,
        userId,
        role
      }
    });
  }

  async removeMember(teamId: string, userId: string) {
    return this.db.teamMember.delete({
      where: {
        teamId_userId: {
          teamId,
          userId
        }
      }
    });
  }
}

export const teamRepository = new TeamRepository();
