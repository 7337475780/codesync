import { BaseRepository } from './base.repository';
import type { Organization, Prisma } from '@prisma/client';

export class OrganizationRepository extends BaseRepository<Organization> {
  async findById(id: string) {
    return this.db.organization.findUnique({
      where: { id },
      include: {
        members: {
          include: { user: true, role: true }
        },
        teams: true,
      }
    });
  }

  async findBySlug(slug: string) {
    return this.db.organization.findUnique({
      where: { slug }
    });
  }

  async create(data: Prisma.OrganizationCreateInput) {
    return this.db.organization.create({
      data
    });
  }

  async update(id: string, data: Prisma.OrganizationUpdateInput) {
    return this.db.organization.update({
      where: { id },
      data
    });
  }

  async addMember(organizationId: string, userId: string, roleId?: string) {
    return this.db.organizationMember.create({
      data: {
        organizationId,
        userId,
        roleId
      }
    });
  }

  async removeMember(organizationId: string, userId: string) {
    return this.db.organizationMember.delete({
      where: {
        organizationId_userId: {
          organizationId,
          userId
        }
      }
    });
  }
}

export const organizationRepository = new OrganizationRepository();
