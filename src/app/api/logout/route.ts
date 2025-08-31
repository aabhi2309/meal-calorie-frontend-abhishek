import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ success: true })

  // Clear the token cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expire immediately
  })

  return res
}
