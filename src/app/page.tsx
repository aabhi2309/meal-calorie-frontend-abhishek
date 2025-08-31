"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"
import Header from "@/components/Header"

export default function HomePage() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors"
      style={{ background: "var(--hero-gradient)", color: "var(--foreground)" }}
    >
      <Header />

      <main className="flex flex-1 items-center justify-center px-6 sm:px-16 md:px-24 lg:px-40">
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-extrabold mb-6">
            Smarter Nutrition Tracking with{" "}
            <span className="bg-gradient-to-r from-green-300 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              NutriTrack
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Track your meals, understand your nutrition, and make healthier choices with confidence.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="px-8 py-3 bg-primary text-primary-foreground hover:opacity-90 transition font-semibold rounded-lg text-lg"
          >
            Start Tracking
          </Button>
        </div>
      </main>
    </div>
  )
}
