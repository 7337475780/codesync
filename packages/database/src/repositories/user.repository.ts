import { Prisma, User } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  async findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data });
  }
}

export const userRepository = new UserRepository();
