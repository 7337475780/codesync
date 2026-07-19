import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token and getting user
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password')
  const isOnboardingRoute = pathname.startsWith('/onboarding')
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/workspace') // add others as needed

  if (!user && (isOnboardingRoute || isProtectedRoute)) {
    // Not logged in, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user) {
    // Fetch onboarding progress
    const { data: progress } = await supabase
      .from('onboarding_progress')
      .select('finished')
      .eq('user_id', user.id)
      .single()
      
    const hasFinishedOnboarding = progress?.finished === true

    if (isAuthRoute) {
      // Logged in user on auth route -> redirect depending on onboarding status
      const redirectUrl = hasFinishedOnboarding ? '/dashboard' : '/onboarding'
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }

    if (isProtectedRoute && !hasFinishedOnboarding) {
      // Trying to access dashboard without finishing onboarding
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    if (isOnboardingRoute && hasFinishedOnboarding) {
      // Trying to access onboarding but already finished
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return supabaseResponse
}
