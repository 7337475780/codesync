import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  try {
    const invite = await prisma.organizationInvitation.findUnique({
      where: { token: token },
      include: {
        organization: true,
        role: true
      }
    });

    if (!invite) {
      return NextResponse.json({ error: 'Invalid or expired invitation' }, { status: 404 });
    }

    if (new Date() > invite.expiresAt || invite.status !== 'PENDING') {
      return NextResponse.json({ error: 'Invitation has expired or already been used' }, { status: 400 });
    }

    return NextResponse.json(invite);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invitation' }, { status: 500 });
  }
}

export async function POST(req: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  try {
    const body = await req.json();
    const { userId } = body;

    const invite = await prisma.organizationInvitation.findUnique({
      where: { token: token },
    });

    if (!invite || new Date() > invite.expiresAt || invite.status !== 'PENDING') {
      return NextResponse.json({ error: 'Invalid or expired invitation' }, { status: 400 });
    }

    // Process acceptance
    await prisma.$transaction([
      prisma.organizationMember.create({
        data: {
          organizationId: invite.organizationId,
          userId,
          roleId: invite.roleId
        }
      }),
      prisma.organizationInvitation.update({
        where: { id: invite.id },
        data: { status: 'ACCEPTED' }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to accept invitation' }, { status: 500 });
  }
}
