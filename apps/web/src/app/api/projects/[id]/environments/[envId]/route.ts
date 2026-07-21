import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; envId: string }> }
) {
  try {
    const { envId } = await params;
    await prisma.environmentVariable.delete({
      where: { id: envId }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete environment variable:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
