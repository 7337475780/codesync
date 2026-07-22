import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';

export async function GET(req: Request) {
  try {
    const orgs = await prisma.organization.findMany();
    
    const githubOrgs = orgs.map(org => ({
      id: org.id,
      login: org.slug,
      avatarUrl: org.logoUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Org',
      role: 'member'
    }));

    return NextResponse.json(githubOrgs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 500 });
  }
}
