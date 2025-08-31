export async function postJson<T>(url: string, data: unknown, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    body: JSON.stringify(data),
    credentials: "include", // 👈 allow cookies to be sent/received
  })
  if (!res.ok) {
    let msg = "Request failed"
    try {
      const j = await res.json()
      msg = j?.error || j?.message || msg
    } catch {}
    throw new Error(msg)
  }
  return res.json()
}
