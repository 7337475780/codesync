import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    // In a real app, extract userId from session
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId') || 'mock-user-id'; 

    const count = await prisma.notification.count({
      where: {
        userId,
        status: 'UNREAD'
      }
    });

    return NextResponse.json({ unreadCount: count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch unread count' }, { status: 500 });
  }
}
