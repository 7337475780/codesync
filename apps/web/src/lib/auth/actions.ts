'use server';

import { createClient } from '@/lib/auth/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { LoginInput, SignupInput } from '@codesync/validators';

export async function loginWithEmail(data: LoginInput) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signupWithEmail(data: SignupInput) {
  const supabase = await createClient();

  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        username: data.username,
        newsletter: data.newsletter,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is required, Supabase returns a user but no session
  if (authData.user && authData.session === null) {
    return { redirect: '/check-email' };
  }

  revalidatePath('/', 'layout');
  redirect('/onboarding');
}

export async function oauthSignIn(provider: 'github' | 'google') {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}
