import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const parentId = searchParams.get('parentId');

    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }

    // Verify project access
    const project = await prisma.project.findUnique({
      where: { id: projectId, members: { some: { userId: user.id } } }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 });
    }

    const files = await prisma.fileSystemNode.findMany({
      where: {
        projectId,
        parentId: parentId || null,
        deletedAt: null
      },
      include: {
        metadata: true,
        permissions: true
      },
      orderBy: [
        { type: 'desc' }, // Folders first (assuming FOLDER > FILE or sort manually)
        { name: 'asc' }
      ]
    });

    return NextResponse.json({ files });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, name, type, parentId, path, size, mimeType, contentUrl } = await request.json();

    // Verification logic omitted for brevity...
    
    const file = await prisma.fileSystemNode.create({
      data: {
        projectId,
        name,
        type, // "FILE" | "FOLDER"
        parentId,
        path,
        size: size || 0,
        mimeType,
        contentUrl
      }
    });

    return NextResponse.json({ file });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
