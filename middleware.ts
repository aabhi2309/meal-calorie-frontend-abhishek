import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED = ["/dashboard", "/calories"]

export function middleware(req: NextRequest) {
  
  const { pathname } = req.nextUrl
  console.log("-------000000000000000000000000-----",pathname);

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  const token = req.cookies.get("token")?.value

  if (isProtected && !token) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    const url = req.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/calories/:path*"],
}




