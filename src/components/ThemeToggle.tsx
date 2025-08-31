"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const next = theme === "dark" ? "light" : "dark"
  return (
    <Button variant="ghost" onClick={() => setTheme(next)} aria-label="Toggle theme">
      <Sun className="h-5 w-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}