import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  try {
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/codesync?schema=public';
    }
    return new PrismaClient({ log: ['query', 'error', 'warn'] });
  } catch (error) {
    console.error("PrismaClient initialization failed:", error);
    // Return a proxy that throws on any method call
    return new Proxy({}, {
      get: (target, prop) => {
        throw new Error(`PrismaClient failed to initialize: ${error instanceof Error ? error.message : String(error)}`);
      }
    }) as PrismaClient;
  }
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
