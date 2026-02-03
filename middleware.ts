import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware is now disabled - authentication is handled in the admin layout
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};