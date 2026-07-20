import { prisma } from '@codesync/database';

export async function recordGitActivity(
  projectId: string, 
  action: string, 
  metadata: any = {}, 
  userId?: string
) {
  try {
    await prisma.projectActivity.create({
      data: {
        projectId,
        userId,
        type: `GIT_${action.toUpperCase()}`,
        metadata
      }
    });
  } catch (error) {
    console.error('Failed to record git activity:', error);
    // Non-fatal error, do not throw
  }
}
