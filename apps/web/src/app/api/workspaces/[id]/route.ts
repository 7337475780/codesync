import { NextResponse } from 'next/server';
import { prisma } from '@codesync/database';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: params.id,
        organization: {
          members: {
            some: {
              userId: user.id
            }
          }
        }
      },
      include: {
        projects: true
      }
    });

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    return NextResponse.json({ workspace });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: params.id,
        organization: {
          members: {
            some: {
              userId: user.id,
              role: { name: 'OWNER' } // Note: Role relation is simplified here
            }
          }
        }
      }
    });

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found or unauthorized' }, { status: 404 });
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: { id: params.id },
      data: updates
    });

    return NextResponse.json({ workspace: updatedWorkspace });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
