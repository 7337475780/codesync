import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const domains = await prisma.projectDomain.findMany({
      where: { projectId: id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, domains });
  } catch (error: any) {
    console.error('Failed to fetch domains:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const domain = await prisma.projectDomain.create({
      data: {
        projectId: id,
        name: data.name,
        type: data.type || 'Primary',
        target: data.target || null,
        status: 'Pending',
        ssl: 'Pending'
      }
    });

    return NextResponse.json({ success: true, domain });
  } catch (error: any) {
    console.error('Failed to create domain:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
