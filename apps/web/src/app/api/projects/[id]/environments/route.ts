import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const environments = await prisma.environmentVariable.findMany({
      where: { projectId: id },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({ success: true, environments });
  } catch (error: any) {
    console.error('Failed to fetch environment variables:', error);
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
    const envVar = await prisma.environmentVariable.create({
      data: {
        projectId: id,
        name: data.key,
        value: data.value,
        environment: data.environments?.[0] || 'development',
      }
    });

    return NextResponse.json({ success: true, envVar });
  } catch (error: any) {
    console.error('Failed to create environment variable:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
