import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deployments = await prisma.deployment.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: 'desc' },
      include: {
        logs: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    return NextResponse.json({ success: true, deployments });
  } catch (error: any) {
    console.error('Failed to fetch deployments:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
