import { NextResponse } from 'next/server';

import { auth } from '@/auth';

import { apiAuthPrefix, authRoutes, DEFAULT_SIGNIN_REDIRECT, publicRoutes } from './routes';

export default auth((req) => {
  const nextUrl = req.nextUrl;
  const { pathname } = nextUrl;

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // Allow API auth endpoints
  if (isApiAuthRoute) return NextResponse.next();

  // If logged in, redirect away from login/signup pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
  }

  // If not logged in and trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = pathname + (nextUrl.search || '');
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
