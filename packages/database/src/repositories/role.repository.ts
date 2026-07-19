import { BaseRepository } from './base.repository';
import type { Role, Prisma } from '@prisma/client';

export class RoleRepository extends BaseRepository<Role> {
  async findById(id: string) {
    return this.db.role.findUnique({
      where: { id },
      include: {
        permissions: true
      }
    });
  }

  async findByOrganization(organizationId: string) {
    return this.db.role.findMany({
      where: { 
        OR: [
          { organizationId },
          { isSystem: true } // Return system roles as well
        ]
      },
      include: {
        permissions: true
      }
    });
  }

  async create(data: Prisma.RoleCreateInput) {
    return this.db.role.create({
      data
    });
  }

  async update(id: string, data: Prisma.RoleUpdateInput) {
    return this.db.role.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return this.db.role.delete({
      where: { id }
    });
  }
}

export const roleRepository = new RoleRepository();
