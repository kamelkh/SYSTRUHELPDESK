import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);

const ADMIN_PREFIXES = ["/admin", "/en/admin"];

function isAdminPath(pathname: string) {
  return ADMIN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAdminPath(pathname)) {
    const session = await auth();
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  // Match everything except Next internals, API routes, and static assets
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
