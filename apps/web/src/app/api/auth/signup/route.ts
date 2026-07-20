import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@codesync/database';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Sync to our local database if the user was created
    if (data.user) {
      // Basic implementation - ideally handled via Supabase webhooks in a production environment
      await prisma.user.upsert({
        where: { email },
        update: { name },
        create: {
          id: data.user.id,
          email,
          name
        }
      });
    }

    return NextResponse.json({ user: data.user, session: data.session });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
