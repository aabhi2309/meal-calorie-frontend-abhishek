import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const body = await req.json()
  const token = (await cookies()).get("token")?.value 


  const response = await fetch(`${process.env.BACKEND_URL}/get-calories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Lookup failed" }, { status: response.status })
  }
  return NextResponse.json(data)
}
