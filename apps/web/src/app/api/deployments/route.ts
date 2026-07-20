import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(request: Request) {
  try {
    // In a real app, we would get the user ID from the session
    // For now, let's just get all deployments since this is a local setup
    const deployments = await prisma.deployment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    return NextResponse.json({ success: true, deployments });
  } catch (error: any) {
    console.error("Error fetching deployments:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
