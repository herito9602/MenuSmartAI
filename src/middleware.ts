import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/admin'];
const LOGIN_PATH = '/login';
const COOKIE_NAME = 'menusmart_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is protected
  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Allow the login page itself to pass through without a session
  if (pathname === '/admin/login') return NextResponse.next();

  // Check for session cookie
  const session = request.cookies.get(COOKIE_NAME);

  if (!session) {
    // Redirect to login, preserving the original destination
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
