"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/authStore"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isAuthed = useAuthStore((s) => s.isAuthed)

  useEffect(() => {
    if (!isAuthed) {
      router.replace("/login")
    }
  }, [isAuthed, router])

  if (!isAuthed) return null 

  return <>{children}</>
}
