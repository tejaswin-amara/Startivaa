import { NextResponse, NextRequest } from 'next/server';

/**
 * Middleware to protect admin routes.
 * Checks for presence of 'sv_session' authentication cookie.
 * If missing or invalid, redirects to the home page.
 */
export function middleware(request: NextRequest) {
  const svSession = request.cookies.get('sv_session');
  // Simple presence check; replace with real verification logic as needed.
  if (!svSession?.value) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
