import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_KEY_NAME, protectedRoutes, publicRoutes } from "./consts";
import { cookies } from 'next/headers'

export default async function middleware(req: NextRequest) {
  const cookiesApp = await cookies();
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const session = cookiesApp.get(AUTH_TOKEN_KEY_NAME)?.value 

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
