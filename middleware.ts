// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_FILE = /\.(.*)$/;
const AUTH_PAGES = ["/login", "/register"];
const PROTECTED_ADMIN_ROUTE = "/dashboard";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Allow public files
  if (PUBLIC_FILE.test(pathname)) return NextResponse.next();

  // Parse JWT
  let user: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      user = payload;
    } catch (err) {
      user = null;
    }
  }

  // Block /login and /register if already logged in
  if (user && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // /dashboard access control
  if (pathname === PROTECTED_ADMIN_ROUTE) {
    if (!user) {
      return NextResponse.rewrite(
        new URL("/unauthorized?reason=Please+login+or+register+to+access+this+page", req.url)
      );
    }

    if (user.role !== "admin") {
      return NextResponse.rewrite(
        new URL("/unauthorized?reason=You+are+not+authorized+to+access+this+page", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};
