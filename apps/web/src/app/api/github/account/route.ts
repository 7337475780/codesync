import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json({
      id: user.id,
      username: user.name || 'codesync-dev',
      avatarUrl: user.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=CodeSync',
      email: user.email,
      isConnected: true,
      connectedAt: user.createdAt.toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch github account' }, { status: 500 });
  }
}
