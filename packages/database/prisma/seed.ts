import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres:codesync%401234@db.tzdqjbmjtakwwuylzkhp.supabase.co:5432/postgres';
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['query', 'error', 'warn'] });

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Core Entities (User, Org, Workspace, Project)
  const user = await prisma.user.upsert({
    where: { email: 'demo@codesync.dev' },
    update: {},
    create: {
      email: 'demo@codesync.dev',
      name: 'Demo User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  });

  const org = await prisma.organization.upsert({
    where: { slug: 'codesync-demo' },
    update: {},
    create: {
      name: 'CodeSync Demo Org',
      slug: 'codesync-demo',
      members: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: 'Demo Workspace',
      slug: 'demo-workspace',
      organizationId: org.id,
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  const project = await prisma.project.upsert({
    where: { workspaceId_slug: { workspaceId: workspace.id, slug: 'demo-project' } },
    update: {},
    create: {
      name: 'Demo Project',
      slug: 'demo-project',
      workspaceId: workspace.id,
      description: 'A comprehensive demo project showcasing all features',
      framework: 'Next.js',
      runtime: 'Node.js',
      isAiEnabled: true,
      members: {
        create: {
          userId: user.id,
          role: 'ADMIN',
        },
      },
    },
  });

  // 2. Project Templates
  const templates = [
    {
      name: 'Next.js SaaS Starter',
      slug: 'nextjs-saas-starter',
      description: 'A complete SaaS boilerplate with Next.js App Router, Tailwind CSS, and Prisma.',
      framework: 'Next.js',
      runtime: 'Node.js',
      packageManager: 'pnpm',
      category: 'Full-stack',
      tags: ['React', 'TypeScript', 'Prisma', 'Tailwind'],
      isFeatured: true,
      difficulty: 'INTERMEDIATE',
    },
    {
      name: 'Vite React TypeScript',
      slug: 'vite-react-ts',
      description: 'Lightning fast React boilerplate with Vite and TypeScript.',
      framework: 'React',
      runtime: 'Node.js',
      packageManager: 'npm',
      category: 'Frontend',
      tags: ['React', 'Vite', 'TypeScript'],
      isFeatured: false,
      difficulty: 'BEGINNER',
    },
    {
      name: 'Express API Server',
      slug: 'express-api-server',
      description: 'Robust backend REST API setup with Express and TypeScript.',
      framework: 'Express',
      runtime: 'Node.js',
      packageManager: 'yarn',
      category: 'Backend',
      tags: ['Node.js', 'Express', 'API'],
      isFeatured: true,
      difficulty: 'BEGINNER',
    },
  ];

  for (const t of templates) {
    await prisma.projectTemplate.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }

  // 3. Environment Variables
  const envVars = [
    { name: 'DATABASE_URL', value: 'postgresql://postgres:postgres@localhost:5432/demo', environment: 'production' },
    { name: 'NEXT_PUBLIC_API_URL', value: 'https://api.demo.com', environment: 'production' },
    { name: 'SECRET_KEY', value: 'sk_test_123456789', environment: 'development' },
  ];

  for (const env of envVars) {
    // findFirst is used because there's no unique constraint on projectId+name alone?
    // Wait, let's check schema: @@unique([projectId, name]) ? Wait, schema has NO unique on EnvironmentVariable.
    const existing = await prisma.environmentVariable.findFirst({
      where: { projectId: project.id, name: env.name },
    });
    if (!existing) {
      await prisma.environmentVariable.create({
        data: { ...env, projectId: project.id },
      });
    }
  }

  // 4. Deployments & Logs
  const deployment = await prisma.deployment.findFirst({
    where: { projectId: project.id },
  });

  if (!deployment) {
    const newDeployment = await prisma.deployment.create({
      data: {
        projectId: project.id,
        status: 'SUCCESS',
        url: 'https://demo-project.codesync.app',
        environment: 'production',
        logs: {
          create: [
            { message: 'Starting deployment process...', level: 'INFO' },
            { message: 'Cloning repository from codesync/demo-project...', level: 'INFO' },
            { message: 'Installing dependencies via pnpm install...', level: 'INFO' },
            { message: 'Running build script...', level: 'INFO' },
            { message: 'Compiled successfully in 12s', level: 'SUCCESS' },
            { message: 'Deploying static assets to CDN...', level: 'INFO' },
            { message: 'Deployment live at https://demo-project.codesync.app', level: 'SUCCESS' },
          ],
        },
      },
    });
  }

  // 5. Notifications
  const notificationCount = await prisma.notification.count({ where: { userId: user.id } });
  if (notificationCount === 0) {
    await prisma.notification.createMany({
      data: [
        {
          userId: user.id,
          title: 'Deployment Successful',
          message: 'Demo Project has been successfully deployed to production.',
          category: 'DEPLOYMENT',
          status: 'UNREAD',
        },
        {
          userId: user.id,
          title: 'Welcome to CodeSync',
          message: 'Your account has been set up. Start by exploring templates!',
          category: 'GENERAL',
          status: 'READ',
        },
      ],
    });
  }

  // 6. AI Sessions
  const aiSessionCount = await prisma.aiSession.count({ where: { projectId: project.id } });
  if (aiSessionCount === 0) {
    await prisma.aiSession.create({
      data: {
        projectId: project.id,
        userId: user.id,
        prompt: 'How do I optimize the Next.js build time for this project?',
        response: 'To optimize Next.js build times, you can:\n\n1. Use Turbopack for local development\n2. Configure `modularizeImports` in next.config.js\n3. Ensure your SWC compiler is enabled (don\'t use .babelrc)\n4. Implement incremental static regeneration (ISR)',
        tokensUsed: 154,
      },
    });
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
