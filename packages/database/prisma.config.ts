import { defineConfig } from '@prisma/config';

export default defineConfig({
  earlyAccess: false,
  migrations: {
    url: process.env.DATABASE_URL,
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
