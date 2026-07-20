import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET() {
  try {
    const templates = await prisma.projectTemplate.findMany({
      orderBy: { isFeatured: 'desc' }
    });
    
    return NextResponse.json({ success: true, templates });
  } catch (error: any) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
