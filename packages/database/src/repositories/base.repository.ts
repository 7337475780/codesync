import { prisma } from '../client/prisma';

export abstract class BaseRepository<T> {
  protected get db() {
    return prisma;
  }
}
