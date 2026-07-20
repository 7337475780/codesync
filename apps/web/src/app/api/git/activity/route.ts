import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) return NextResponse.json({ error: 'projectId is required' }, { status: 400 });

    const activities = await prisma.projectActivity.findMany({
      where: { 
        projectId,
        type: { startsWith: 'GIT_' }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    return NextResponse.json({ success: true, activities });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
