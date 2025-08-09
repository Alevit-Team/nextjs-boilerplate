import { NextResponse, type NextRequest } from 'next/server';
import { updateUserSessionExpiration } from './auth/core/session';

// Keep middleware minimal: only roll/refresh session expiration via cookies.
// Route protection and role-based redirects are handled in Server Component layouts.
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });

  return response;
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|.well-known|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
