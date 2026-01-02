import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value
  const { pathname } = request.nextUrl

  const isPublicPath = request.nextUrl.pathname === "/login"

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/product-list", request.url))
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/product-list", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|logo.webp).*)",
  ],
}
