"use client"

import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"

export default function Header({ showLogout = true }: { showLogout?: boolean }) {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" })
    } catch (e) {
      console.error("Logout API failed", e)
    }
    logout()
    router.replace("/login")
  }

  return (
    <div className="flex items-center justify-between px-6 py-2 sm:px-12 md:px-16 lg:px-24 border-b border-border">
      {/* Logo + App name */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-green-400 via-teal-400 to-sky-500 flex items-center justify-center">
          <span className="text-white text-lg">🍏</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-300 via-teal-300 to-sky-400 bg-clip-text text-transparent">
          NutriTrack
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        {showLogout && (
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}
