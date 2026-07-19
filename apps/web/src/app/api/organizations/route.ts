import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';
import { z } from 'zod';

const createOrgSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany();
    return NextResponse.json(orgs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createOrgSchema.parse(body);

    const existing = await prisma.organization.findUnique({
      where: { slug: validated.slug }
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }

    const org = await prisma.organization.create({
      data: {
        name: validated.name,
        slug: validated.slug,
      },
    });

    return NextResponse.json(org, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
  }
}
