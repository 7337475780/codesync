import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(request: Request) {
  try {
    const environments = await prisma.environmentVariable.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, environments });
  } catch (error: any) {
    console.error("Error fetching environments:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
