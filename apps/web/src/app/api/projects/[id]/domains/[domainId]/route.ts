import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; domainId: string }> }
) {
  try {
    const { domainId } = await params;
    await prisma.projectDomain.delete({
      where: { id: domainId }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete domain:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
