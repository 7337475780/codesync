import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const org = await prisma.organization.findUnique({
      where: { id: params.id },
      include: {
        teams: true,
        members: {
          include: { user: true, role: true }
        }
      }
    });

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json(org);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch organization' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const org = await prisma.organization.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(org);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update organization' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.organization.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete organization' }, { status: 500 });
  }
}
