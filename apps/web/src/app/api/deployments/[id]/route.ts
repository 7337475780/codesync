import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action } = await request.json();

    if (action === 'cancel') {
      const deployment = await prisma.deployment.update({
        where: { id },
        data: { status: 'CANCELED' }
      });
      return NextResponse.json({ success: true, deployment });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error updating deployment:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action } = await request.json();

    if (action === 'redeploy') {
      const existing = await prisma.deployment.findUnique({
        where: { id }
      });

      if (!existing) {
        return NextResponse.json({ success: false, error: 'Deployment not found' }, { status: 404 });
      }

      // Create a new deployment with same info but QUEUED status
      const newDeployment = await prisma.deployment.create({
        data: {
          projectId: existing.projectId,
          status: 'QUEUED',
          environment: existing.environment,
        }
      });

      return NextResponse.json({ success: true, deployment: newDeployment });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error triggering redeploy:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
