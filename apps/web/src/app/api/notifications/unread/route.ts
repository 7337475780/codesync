import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    // In a real app, extract userId from session
    const url = new URL(req.url);
    let userId = url.searchParams.get('userId');
    if (!userId || userId === 'mock-user-id') {
      const user = await prisma.user.findFirst();
      if (!user) return NextResponse.json({ unreadCount: 0 });
      userId = user.id;
    }

    const count = await prisma.notification.count({
      where: {
        userId,
        status: 'UNREAD'
      }
    });

    return NextResponse.json({ unreadCount: count });
  } catch (error) {
    console.error('Failed to fetch unread count:', error);
    return NextResponse.json({ unreadCount: 0 });
  }
}
