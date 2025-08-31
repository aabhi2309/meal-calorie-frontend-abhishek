import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const r = await fetch(`${process.env.BACKEND_URL}/auth/login`,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await r.json()
  if (!r.ok) return NextResponse.json({ error: data?.message ?? "Login failed" }, { status: r.status })

  const token = data?.token as string | undefined

  const res = NextResponse.json(data);
  
  if (token) {
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    })
  }
  return res
}
